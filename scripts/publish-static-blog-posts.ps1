param(
    [Parameter(Mandatory = $true)]
    [string[]]$Slugs,

    [switch]$Overwrite
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$blogJsPath = Join-Path $repoRoot 'js\blog.js'

function Get-BlogPostMap {
    param(
        [Parameter(Mandatory = $true)]
        [string]$SourceText
    )

    $posts = @{}
    $pattern = '(?s)\{\s*title:\s*"(?<title>.*?)",\s*slug:\s*"(?<slug>.*?)",\s*content:\s*`(?<content>.*?)`,\s*excerpt:\s*"(?<excerpt>.*?)",\s*image_url:\s*"(?<image>.*?)",\s*category:\s*"(?<category>.*?)",\s*date:\s*"(?<date>.*?)"\s*\}'

    foreach ($match in [regex]::Matches($SourceText, $pattern)) {
        $slug = $match.Groups['slug'].Value
        $posts[$slug] = [ordered]@{
            title = $match.Groups['title'].Value
            slug = $slug
            content = $match.Groups['content'].Value.Trim()
            excerpt = $match.Groups['excerpt'].Value
            image = $match.Groups['image'].Value
            category = $match.Groups['category'].Value
            date = $match.Groups['date'].Value
        }
    }

    return $posts
}

function Get-PostJourneyMap {
    param(
        [Parameter(Mandatory = $true)]
        [string]$SourceText
    )

    $journeys = @{}
    $sectionMatch = [regex]::Match($SourceText, '(?s)const postJourneys = \{(?<section>.*?)\};\s*function formatBlogDate')
    if (-not $sectionMatch.Success) {
        throw 'Unable to locate postJourneys in js/blog.js.'
    }

    $section = $sectionMatch.Groups['section'].Value
    $pattern = '(?s)"(?<slug>[^"]+)":\s*\{\s*moneyPage:\s*\{\s*href:\s*"(?<moneyHref>.*?)",\s*label:\s*"(?<moneyLabel>.*?)",\s*shortLabel:\s*"(?<moneyShort>.*?)",\s*description:\s*"(?<moneyDesc>.*?)"\s*\},\s*areaPage:\s*\{\s*href:\s*"(?<areaHref>.*?)",\s*label:\s*"(?<areaLabel>.*?)",\s*shortLabel:\s*"(?<areaShort>.*?)",\s*description:\s*"(?<areaDesc>.*?)"\s*\}\s*\}'

    foreach ($match in [regex]::Matches($section, $pattern)) {
        $slug = $match.Groups['slug'].Value
        $journeys[$slug] = [ordered]@{
            moneyPage = [ordered]@{
                href = $match.Groups['moneyHref'].Value
                label = $match.Groups['moneyLabel'].Value
                shortLabel = $match.Groups['moneyShort'].Value
                description = $match.Groups['moneyDesc'].Value
            }
            areaPage = [ordered]@{
                href = $match.Groups['areaHref'].Value
                label = $match.Groups['areaLabel'].Value
                shortLabel = $match.Groups['areaShort'].Value
                description = $match.Groups['areaDesc'].Value
            }
        }
    }

    return $journeys
}

function Get-PublicPath {
    param(
        [Parameter(Mandatory = $true)]
        [string]$PathText
    )

    if ($PathText -match '^https?://') {
        return $PathText
    }

    if ($PathText.StartsWith('/')) {
        return $PathText
    }

    return '/' + $PathText.TrimStart('./')
}

function Get-AbsoluteUrl {
    param(
        [Parameter(Mandatory = $true)]
        [string]$PathText
    )

    if ($PathText -match '^https?://') {
        return $PathText
    }

    return 'https://pzm.ae' + (Get-PublicPath -PathText $PathText)
}

function Get-FormattedDateLabel {
    param(
        [Parameter(Mandatory = $true)]
        [string]$DateText
    )

    try {
        return ([datetime]::Parse($DateText)).ToString('MMMM d, yyyy', [System.Globalization.CultureInfo]::GetCultureInfo('en-US'))
    }
    catch {
        return $DateText
    }
}

function Get-SchemaJson {
    param(
        [Parameter(Mandatory = $true)]
        [hashtable]$Post,

        [Parameter(Mandatory = $true)]
        [string]$AbsoluteImageUrl,

        [Parameter(Mandatory = $true)]
        [string]$ArticleUrl
    )

    $schema = [ordered]@{
        '@context' = 'https://schema.org'
        '@type' = 'Article'
        headline = $Post.title
        description = $Post.excerpt
        image = $AbsoluteImageUrl
        mainEntityOfPage = $ArticleUrl
        url = $ArticleUrl
        datePublished = $Post.date
        dateModified = $Post.date
        inLanguage = 'en'
        author = [ordered]@{
            '@type' = 'Organization'
            name = 'P Z M Computers & Mobile Phones -Sell New Used PC Build'
            url = 'https://pzm.ae/'
        }
        publisher = [ordered]@{
            '@type' = 'Organization'
            name = 'P Z M Computers & Mobile Phones -Sell New Used PC Build'
            logo = [ordered]@{
                '@type' = 'ImageObject'
                url = 'https://pzm.ae/images/mini_logo.png'
            }
        }
    }

    return ($schema | ConvertTo-Json -Depth 6 -Compress)
}

function New-ArticleHtml {
    param(
        [Parameter(Mandatory = $true)]
        [hashtable]$Post,

        [Parameter(Mandatory = $true)]
        [hashtable]$Journey
    )

    $publicImagePath = Get-PublicPath -PathText $Post.image
    $absoluteImageUrl = Get-AbsoluteUrl -PathText $Post.image
    $articleUrl = "https://pzm.ae/blog/$($Post.slug)/"
    $pageTitle = "$($Post.title) | PZM Dubai"
    $dateLabel = Get-FormattedDateLabel -DateText $Post.date
    $schemaJson = Get-SchemaJson -Post $Post -AbsoluteImageUrl $absoluteImageUrl -ArticleUrl $articleUrl

    $template = @'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>__PAGE_TITLE__</title>
    <meta name="description" content="__DESCRIPTION__">
    <meta name="keywords" content="__KEYWORDS__">
    <meta name="robots" content="index, follow">
    <link rel="icon" href="/images/favico.ico" type="image/x-icon">
    <link rel="canonical" href="__ARTICLE_URL__">
    <link rel="alternate" hreflang="en" href="__ARTICLE_URL__">
    <link rel="alternate" hreflang="x-default" href="__ARTICLE_URL__">

    <meta property="og:type" content="article">
    <meta property="og:title" content="__PAGE_TITLE__">
    <meta property="og:description" content="__DESCRIPTION__">
    <meta property="og:url" content="__ARTICLE_URL__">
    <meta property="og:image" content="__OG_IMAGE__">
    <meta property="og:site_name" content="P Z M Computers & Mobile Phones -Sell New Used PC Build">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="__PAGE_TITLE__">
    <meta name="twitter:description" content="__DESCRIPTION__">
    <meta name="twitter:image" content="__OG_IMAGE__">

    <link rel="stylesheet" href="/css/theme.css">
    <link rel="stylesheet" href="/css/blog.css">
    <link rel="stylesheet" href="/css/contact.css">

    <script type="application/ld+json">__SCHEMA__</script>

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-NSJ08ST3JL"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-NSJ08ST3JL');
        gtag('config', 'G-KYVRVKG3MZ');
    </script>
</head>
<body>
    <nav class="navbar">
        <div class="navbar-inner">
            <a href="/" class="logo"><div class="logo-group"><span class="logo-pzm">PZM <span class="logo-store">Computers & Phones Store</span></span><span class="logo-tagline">New&#8226;Used&#8226;Care&#8226;PC&#8226;Build</span></div></a>
            <div class="nav-links" id="navLinks">
                <a href="/">Home</a>
                <div class="nav-dropdown">
                    <button class="nav-dropdown-trigger">Services</button>
                    <div class="nav-dropdown-content">
                        <a href="/services/buy-iphone.html">Buy iPhone</a>
                        <a href="/services/brand-new.html">New Devices</a>
                        <a href="/services/buy-used.html">Used Devices</a>
                        <a href="/services/device-care.html">Care Services</a>
                        <a href="/services/gaming-pc.html">Gaming PC</a>
                        <a href="/services/sell-gadgets.html">Sell Devices</a>
                        <a href="/services/accessories.html">Accessories</a>
                    </div>
                </div>
                <a href="/areas/al-barsha.html">Al Barsha</a>
                <a href="/blog.html">Blog</a>
                <a href="#contact">Contact</a>
            </div>
            <div class="nav-actions" id="navActions">
                <a href="tel:+971528026677" class="btn-login">Call Store</a>
                <a href="https://wa.me/971528026677?text=Hi%2C%20I%27m%20interested%20in%20your%20services.%20(via%20pzm.ae)" class="btn-signup" target="_blank" rel="noopener">WhatsApp</a>
            </div>
            <button class="hamburger" id="hamburger" onclick="toggleMenu()"><span></span><span></span><span></span></button>
        </div>
    </nav>

    <main>
        <article class="blog-post">
            <img src="__IMAGE_SRC__" alt="__IMAGE_ALT__" class="blog-post-image">
            <div class="blog-post-content">
                <span class="blog-category">__CATEGORY__</span>
                <p class="blog-post-meta">Published __DATE_LABEL__</p>
                <h1>__TITLE__</h1>
                <div class="blog-content">
__CONTENT__
                </div>

                <aside class="blog-next-steps">
                    <p class="blog-next-steps-label">Best next steps</p>
                    <div class="blog-next-steps-grid">
                        <a href="__MONEY_HREF__" class="blog-next-step-card">
                            <span class="blog-next-step-eyebrow">Service page</span>
                            <strong>__MONEY_LABEL__</strong>
                            <span>__MONEY_DESC__</span>
                        </a>
                        <a href="__AREA_HREF__" class="blog-next-step-card">
                            <span class="blog-next-step-eyebrow">Local page</span>
                            <strong>__AREA_LABEL__</strong>
                            <span>__AREA_DESC__</span>
                        </a>
                    </div>
                </aside>
            </div>
        </article>

        <div id="contact-section"></div>
    </main>

    <script src="/js/navbar.js"></script>
    <script src="/js/contact-loader.js"></script>
</body>
</html>
'@

    $keywords = @(
        ($Post.slug -replace '-', ' '),
        "$($Post.category) guide Dubai",
        'P Z M Computers & Mobile Phones -Sell New Used PC Build',
        'Dubai electronics blog'
    ) -join ', '

    $html = $template.Replace('__PAGE_TITLE__', [System.Net.WebUtility]::HtmlEncode($pageTitle))
    $html = $html.Replace('__DESCRIPTION__', [System.Net.WebUtility]::HtmlEncode($Post.excerpt))
    $html = $html.Replace('__KEYWORDS__', [System.Net.WebUtility]::HtmlEncode($keywords))
    $html = $html.Replace('__ARTICLE_URL__', $articleUrl)
    $html = $html.Replace('__OG_IMAGE__', $absoluteImageUrl)
    $html = $html.Replace('__SCHEMA__', $schemaJson)
    $html = $html.Replace('__IMAGE_SRC__', $publicImagePath)
    $html = $html.Replace('__IMAGE_ALT__', [System.Net.WebUtility]::HtmlEncode($Post.title))
    $html = $html.Replace('__CATEGORY__', [System.Net.WebUtility]::HtmlEncode($Post.category))
    $html = $html.Replace('__DATE_LABEL__', [System.Net.WebUtility]::HtmlEncode($dateLabel))
    $html = $html.Replace('__TITLE__', [System.Net.WebUtility]::HtmlEncode($Post.title))
    $html = $html.Replace('__CONTENT__', $Post.content)
    $html = $html.Replace('__MONEY_HREF__', $Journey.moneyPage.href)
    $html = $html.Replace('__MONEY_LABEL__', [System.Net.WebUtility]::HtmlEncode($Journey.moneyPage.label))
    $html = $html.Replace('__MONEY_DESC__', [System.Net.WebUtility]::HtmlEncode($Journey.moneyPage.description))
    $html = $html.Replace('__AREA_HREF__', $Journey.areaPage.href)
    $html = $html.Replace('__AREA_LABEL__', [System.Net.WebUtility]::HtmlEncode($Journey.areaPage.label))
    $html = $html.Replace('__AREA_DESC__', [System.Net.WebUtility]::HtmlEncode($Journey.areaPage.description))

    return $html
}

$sourceText = Get-Content -LiteralPath $blogJsPath -Raw
$posts = Get-BlogPostMap -SourceText $sourceText
$journeys = Get-PostJourneyMap -SourceText $sourceText

foreach ($slug in $Slugs) {
    if (-not $posts.ContainsKey($slug)) {
        throw "Unable to find blog post slug '$slug' in js/blog.js."
    }

    if (-not $journeys.ContainsKey($slug)) {
        throw "Unable to find postJourney for slug '$slug' in js/blog.js."
    }

    $outputDir = Join-Path $repoRoot (Join-Path 'blog' $slug)
    $outputFile = Join-Path $outputDir 'index.html'

    if ((Test-Path -LiteralPath $outputFile) -and -not $Overwrite) {
        Write-Warning "Skipping existing article '$slug'. Use -Overwrite to replace it."
        continue
    }

    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    $html = New-ArticleHtml -Post $posts[$slug] -Journey $journeys[$slug]
    Set-Content -LiteralPath $outputFile -Value $html -NoNewline
    Write-Host "Published static article: $slug"
}
