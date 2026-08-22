param(
    [string]$SitemapPath = (Join-Path (Split-Path -Parent $PSScriptRoot) 'sitemap.xml')
)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $PSScriptRoot
$resolvedSitemap = Resolve-Path -LiteralPath $SitemapPath
$sitemap = [System.IO.File]::ReadAllText($resolvedSitemap)
$updated = 0
$today = (Get-Date).ToString('yyyy-MM-dd')
$dirtyPaths = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::OrdinalIgnoreCase)
$lastCommitDates = @{}

# Read working-tree and history data once so the sync remains fast even as the
# number of indexable pages grows.
$dirtyOutput = @(
    & git -C $siteRoot diff --name-only -- '*.html' 2>$null
    & git -C $siteRoot diff --cached --name-only -- '*.html' 2>$null
    & git -C $siteRoot ls-files --others --exclude-standard -- '*.html' 2>$null
)
foreach ($path in $dirtyOutput) {
    if ($path) {
        [void]$dirtyPaths.Add($path.Trim().Replace('\', '/'))
    }
}

$historyDate = $null
$historyOutput = & git -C $siteRoot log --format='@@DATE:%cs' --name-only -- '*.html' 2>$null
foreach ($line in $historyOutput) {
    if ($line -like '@@DATE:*') {
        $historyDate = $line.Substring(7).Trim()
        continue
    }
    if ($line -and $historyDate) {
        $historyPath = $line.Trim().Replace('\', '/')
        if (-not $lastCommitDates.ContainsKey($historyPath)) {
            $lastCommitDates[$historyPath] = $historyDate
        }
    }
}

$htmlFiles = Get-ChildItem -LiteralPath $siteRoot -Recurse -File -Filter '*.html' |
    Where-Object { $_.FullName -notmatch '[\\/]assets[\\/]' }

foreach ($file in $htmlFiles) {
    $html = [System.IO.File]::ReadAllText($file.FullName)
    if ($html -match '<meta\s+name="robots"\s+content="[^"]*noindex') {
        continue
    }

    $canonicalMatch = [regex]::Match($html, '<link\s+rel="canonical"\s+href="([^"]+)"')
    if (-not $canonicalMatch.Success) {
        continue
    }

    $canonical = $canonicalMatch.Groups[1].Value
    $relativePath = [System.IO.Path]::GetRelativePath($siteRoot, $file.FullName).Replace('\', '/')
    $modified = $null

    # Article structured data represents an editorial content update and takes
    # priority over repository-wide template or navigation changes.
    $modifiedMatch = [regex]::Match($html, '"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})"')
    if ($modifiedMatch.Success) {
        $modified = $modifiedMatch.Groups[1].Value
    }
    elseif ($dirtyPaths.Contains($relativePath)) {
        # For non-article pages, meaningful uncommitted changes use today's date.
        $modified = $today
    }
    elseif ($lastCommitDates.ContainsKey($relativePath)) {
        $modified = $lastCommitDates[$relativePath]
    }

    if (-not $modified) {
        continue
    }

    $pattern = '(?s)(<url>\s*<loc>' + [regex]::Escape($canonical) + '</loc>\s*<lastmod>)(\d{4}-\d{2}-\d{2})(</lastmod>)'
    $match = [regex]::Match($sitemap, $pattern)
    if ($match.Success -and $match.Groups[2].Value -ne $modified) {
        $sitemap = [regex]::Replace($sitemap, $pattern, '${1}' + $modified + '$3', 1)
        $updated++
    }
}

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($resolvedSitemap, $sitemap, $utf8NoBom)
Write-Output "Updated $updated sitemap lastmod values from page change history."
