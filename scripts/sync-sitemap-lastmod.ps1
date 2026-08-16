param(
    [string]$SitemapPath = (Join-Path (Split-Path -Parent $PSScriptRoot) 'sitemap.xml')
)

$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $PSScriptRoot
$resolvedSitemap = Resolve-Path -LiteralPath $SitemapPath
$sitemap = [System.IO.File]::ReadAllText($resolvedSitemap)
$updated = 0

$htmlFiles = Get-ChildItem -LiteralPath $siteRoot -Recurse -File -Filter '*.html' |
    Where-Object { $_.FullName -notmatch '[\\/]assets[\\/]' }

foreach ($file in $htmlFiles) {
    $html = [System.IO.File]::ReadAllText($file.FullName)
    if ($html -match '<meta\s+name="robots"\s+content="[^"]*noindex') {
        continue
    }

    $canonicalMatch = [regex]::Match($html, '<link\s+rel="canonical"\s+href="([^"]+)"')
    $modifiedMatch = [regex]::Match($html, '"dateModified":"(\d{4}-\d{2}-\d{2})"')
    if (-not $canonicalMatch.Success -or -not $modifiedMatch.Success) {
        continue
    }

    $canonical = $canonicalMatch.Groups[1].Value
    $modified = $modifiedMatch.Groups[1].Value
    $pattern = '(?s)(<url>\s*<loc>' + [regex]::Escape($canonical) + '</loc>\s*<lastmod>)(\d{4}-\d{2}-\d{2})(</lastmod>)'
    $match = [regex]::Match($sitemap, $pattern)
    if ($match.Success -and $match.Groups[2].Value -ne $modified) {
        $sitemap = [regex]::Replace($sitemap, $pattern, '${1}' + $modified + '$3', 1)
        $updated++
    }
}

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($resolvedSitemap, $sitemap, $utf8NoBom)
Write-Output "Updated $updated sitemap lastmod values from Article structured data."
