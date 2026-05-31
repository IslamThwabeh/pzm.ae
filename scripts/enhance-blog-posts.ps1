# Adds BreadcrumbList JSON-LD and a Related Articles block to every
# blog post (EN + AR). Idempotent: skips files that already have both.

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path "$PSScriptRoot\..").Path
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

function Get-PostMeta {
    param([string]$path, [string]$lang, [string]$slug)
    $html = [System.IO.File]::ReadAllText($path)

    $title = $null
    if ($html -match '<title>([^<]+?)\s*\|\s*P Z M') { $title = $Matches[1].Trim() }
    elseif ($html -match '<title>([^<]+)</title>') { $title = $Matches[1].Trim() }

    $desc = $null
    if ($html -match '<meta name="description" content="([^"]+)"') { $desc = $Matches[1] }

    $img = $null
    if ($html -match 'class="blog-post-image"[^>]*src="([^"]+)"') { $img = $Matches[1] }
    elseif ($html -match '<img[^>]+src="([^"]+)"[^>]+class="blog-post-image"') { $img = $Matches[1] }
    elseif ($html -match '<meta property="og:image" content="([^"]+)"') {
        $img = ($Matches[1] -replace 'https://pzm\.ae','')
    }

    $category = $null
    if ($html -match '<span class="blog-category">([^<]+)</span>') { $category = $Matches[1].Trim() }

    [pscustomobject]@{
        slug=$slug; lang=$lang; path=$path
        title=$title; desc=$desc; img=$img; category=$category
    }
}

# ---- Build index of all posts ----
$posts = @{}
foreach ($lang in @('en','ar')) {
    $base = if ($lang -eq 'en') { Join-Path $root 'blog' } else { Join-Path $root 'ar\blog' }
    Get-ChildItem -LiteralPath $base -Directory | ForEach-Object {
        $idx = Join-Path $_.FullName 'index.html'
        if (Test-Path -LiteralPath $idx) {
            $meta = Get-PostMeta -path $idx -lang $lang -slug $_.Name
            if (-not $posts.ContainsKey($lang)) { $posts[$lang] = @{} }
            $posts[$lang][$_.Name] = $meta
        }
    }
}
Write-Host ("Indexed {0} EN posts, {1} AR posts." -f $posts['en'].Count, $posts['ar'].Count) -ForegroundColor Cyan

# ---- Choose related posts: same category first, then most recent fillers ----
function Pick-Related {
    param($all, $self, [int]$n = 3)
    $others = $all.Values | Where-Object { $_.slug -ne $self.slug }
    $sameCat = @($others | Where-Object { $_.category -and $self.category -and $_.category -eq $self.category })
    $rest    = @($others | Where-Object { -not ($_.category -and $self.category -and $_.category -eq $self.category) })
    $picked  = @()
    foreach ($p in $sameCat) { if ($picked.Count -lt $n) { $picked += $p } }
    foreach ($p in $rest)    { if ($picked.Count -lt $n) { $picked += $p } }
    $picked
}

function HtmlEscape([string]$s) {
    if ($null -eq $s) { return '' }
    ($s -replace '&','&amp;') -replace '<','&lt;' -replace '>','&gt;' -replace '"','&quot;'
}

function Build-Breadcrumb {
    param($post)
    $isAr = ($post.lang -eq 'ar')
    $baseUrl = 'https://pzm.ae'
    $homeName = if ($isAr) { 'الرئيسية' }   else { 'Home' }
    $blog   = if ($isAr) { 'المدونة' }    else { 'Blog' }
    $blogUrl = if ($isAr) { "$baseUrl/ar/blog/" } else { "$baseUrl/blog/" }
    $postUrl = if ($isAr) { "$baseUrl/ar/blog/$($post.slug)/" } else { "$baseUrl/blog/$($post.slug)/" }
    $title  = ($post.title -replace '"','\"')
    $homeUrl = if ($isAr) { "$baseUrl/ar/" } else { "$baseUrl/" }
    $json = '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[' +
        '{"@type":"ListItem","position":1,"name":"' + $homeName + '","item":"' + $homeUrl + '"},' +
        '{"@type":"ListItem","position":2,"name":"' + $blog + '","item":"' + $blogUrl + '"},' +
        '{"@type":"ListItem","position":3,"name":"' + $title + '","item":"' + $postUrl + '"}' +
        ']}'
    "`r`n    <script type=`"application/ld+json`">$json</script>"
}

function Build-RelatedHtml {
    param($post, $related)
    $isAr = ($post.lang -eq 'ar')
    $label = if ($isAr) { 'مقالات ذات صلة' } else { 'Related articles' }
    $readMore = if ($isAr) { 'اقرأ المقال' } else { 'Read article' }
    $linkPrefix = if ($isAr) { '/ar/blog/' } else { '/blog/' }

    $cards = ($related | ForEach-Object {
        $img = HtmlEscape $_.img
        $title = HtmlEscape $_.title
        $cat = HtmlEscape $_.category
        $url = "$linkPrefix$($_.slug)/"
        $imgTag = if ($_.img) { "                <img src=`"$img`" alt=`"$title`" loading=`"lazy`">`r`n" } else { '' }
        $catTag = if ($_.category) { "                <span class=`"blog-related-cat`">$cat</span>`r`n" } else { '' }
@"
            <a class="blog-related-card" href="$url">
$imgTag$catTag                <strong>$title</strong>
                <span class="blog-related-cta">$readMore &rarr;</span>
            </a>
"@
    }) -join "`r`n"

@"

        <section class="blog-related" aria-label="$label">
            <h2 class="blog-related-title">$label</h2>
            <div class="blog-related-grid">
$cards
            </div>
        </section>
"@
}

# ---- Inject into every post ----
$updated = 0
foreach ($lang in @('en','ar')) {
    foreach ($entry in $posts[$lang].Values) {
        $html = [System.IO.File]::ReadAllText($entry.path)
        $orig = $html
        $changed = $false

        # 1) BreadcrumbList: skip if already present
        if ($html -notmatch '"@type"\s*:\s*"BreadcrumbList"') {
            $bc = Build-Breadcrumb -post $entry
            # Insert before closing </head>
            if ($html -match '</head>') {
                $html = $html -replace '</head>', ($bc + "`r`n</head>")
                $changed = $true
            }
        }

        # 2) Related articles: skip if already present
        if ($html -notmatch 'class="blog-related"') {
            $related = Pick-Related -all $posts[$lang] -self $entry -n 3
            if ($related.Count -gt 0) {
                $block = Build-RelatedHtml -post $entry -related $related
                # Insert before <div id="contact-section">
                if ($html -match '(\s*)<div id="contact-section"></div>') {
                    $html = $html -replace '(<div id="contact-section"></div>)', ($block + "`r`n        " + '$1')
                    $changed = $true
                }
            }
        }

        if ($changed) {
            [System.IO.File]::WriteAllText($entry.path, $html, $utf8NoBom)
            $updated++
        }
    }
}
Write-Host "Updated $updated files." -ForegroundColor Green
