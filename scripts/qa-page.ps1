param(
    [Parameter(Mandatory = $true)]
    [string]$FilePath
)

if (-not (Test-Path -LiteralPath $FilePath)) {
    Write-Error "File not found: $FilePath"
    exit 1
}

$content = Get-Content -LiteralPath $FilePath -Raw
$script:results = @()

function Add-Result {
    param(
        [string]$Check,
        [bool]$Pass,
        [string]$Details
    )

    $script:results += [PSCustomObject]@{
        Check   = $Check
        Pass    = $Pass
        Details = $Details
    }
}

$isHtml = $FilePath.ToLower().EndsWith('.html')
if (-not $isHtml) {
    Write-Error "This script expects an .html file."
    exit 1
}

Add-Result -Check "Canonical tag" -Pass ($content -match '<link\s+rel="canonical"') -Details "Expected canonical link tag"
Add-Result -Check "Robots meta" -Pass ($content -match '<meta\s+name="robots"') -Details "Expected robots meta"
Add-Result -Check "H1 present" -Pass ($content -match '<h1[\s>]') -Details "Expected one or more H1 tags"
Add-Result -Check "JSON-LD present" -Pass ($content -match 'application/ld\+json') -Details "Expected at least one JSON-LD block"
$hasWaLink = $content -match 'wa\.me/971588366841'
$hasViaSuffix = ($content -match '\(via pzm\.ae\)') -or ($content -match '\(via%20pzm\.ae\)')
Add-Result -Check "WhatsApp via suffix" -Pass ($hasWaLink -and $hasViaSuffix) -Details "WhatsApp links should include (via pzm.ae)"
Add-Result -Check "Phone link present" -Pass ($content -match 'tel:\+971528026677') -Details "Expected call link"

$hasNavbarScript = $content -match '/js/navbar\.js|js/navbar\.js'
$hasContactScript = $content -match '/js/contact-loader\.js|js/contact-loader\.js'
Add-Result -Check "Navbar script reference" -Pass $hasNavbarScript -Details "Expected navbar script include"
Add-Result -Check "Contact loader script reference" -Pass $hasContactScript -Details "Expected contact loader script include"

$internalLinks = [regex]::Matches($content, 'href="(/[^"]+)"')
$badLinks = @()
foreach ($m in $internalLinks) {
    $href = $m.Groups[1].Value
    if ($href.StartsWith('/blog/') -or $href.StartsWith('/ar/blog/')) {
        continue
    }
    if ($href -match '^/(services|areas|ar/services|ar/areas)(/|$)' -and $href -notmatch '\.html$' -and $href -notmatch '/$') {
        $badLinks += $href
    }
}

Add-Result -Check "Internal link style" -Pass ($badLinks.Count -eq 0) -Details ($(if ($badLinks.Count -eq 0) { "OK" } else { "Non-html style links found: " + ($badLinks -join ', ') }))

Write-Host "QA Report for $FilePath"
Write-Host "----------------------------------------"

$failCount = 0
foreach ($r in $results) {
    $status = if ($r.Pass) { "PASS" } else { "FAIL" }
    if (-not $r.Pass) { $failCount++ }
    Write-Host ("[{0}] {1} - {2}" -f $status, $r.Check, $r.Details)
}

Write-Host "----------------------------------------"
Write-Host ("Total checks: {0}" -f $script:results.Count)
Write-Host ("Failed checks: {0}" -f $failCount)

if ($failCount -gt 0) {
    exit 2
}

exit 0
