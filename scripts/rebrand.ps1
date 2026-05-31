# Global rebrand script for pzm.ae
# Replaces old brand strings with the new brand name across all HTML files.
# Run from repo root: pwsh -File scripts/rebrand.ps1
# Idempotent: running twice produces the same result.

$ErrorActionPreference = 'Stop'

$LongBrand  = 'P Z M Mobile & Computers -Sell New Used PC Build'
$ShortBrand = 'P Z M Mobile & Computers'
$NewTagline = 'Sell&#8226;Fix&#8226;New&#8226;Used&#8226;PC&#8226;Build'

# JSON-LD escapes & as \u0026; OG meta uses & directly; some pages use &amp;
$LongBrandJsonEsc = 'P Z M Mobile \u0026 Computers Sell New Used PC Build'
$ShortBrandJsonEsc = 'P Z M Mobile \u0026 Computers'

# Find HTML files (root + all subfolders), exclude node_modules, .venv, .git
$files = Get-ChildItem -Path . -Recurse -Filter *.html -File |
  Where-Object { $_.FullName -notmatch '\\(node_modules|\.venv|\.git)\\' }

Write-Host "Processing $($files.Count) HTML files..." -ForegroundColor Cyan

$changed = 0
$totalReplacements = @{}

foreach ($file in $files) {
  $original = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8
  $content = $original

  # --- PASS 1: Logo block in nav header (handles both tagline variants & both & forms) ---
  # Old: <span class="logo-pzm">PZM <span class="logo-store">Computers (&|&amp;) Phones Store</span></span>
  $content = $content -replace '<span class="logo-pzm">PZM <span class="logo-store">Computers (?:&amp;|&) Phones Store</span></span>', '<span class="logo-pzm">P Z M <span class="logo-store">Mobile & Computers</span></span>'

  # Old taglines (any of: Phone/Repair, Trade-In/Trade&#8209;In/Build) → new tagline
  $content = $content -replace '<span class="logo-tagline">New&#8226;Used&#8226;(?:Phone|Repair)&#8226;PC&#8226;(?:Trade(?:-|&#8209;)In|Build)</span>', "<span class=`"logo-tagline`">$NewTagline</span>"

  # Also handle plain text taglines (without span wrapper) appearing in body text
  $content = $content -replace 'New&#8226;Used&#8226;(?:Phone|Repair)&#8226;PC&#8226;(?:Trade(?:-|&#8209;)In|Build)', $NewTagline
  $content = $content -replace 'New\u2022Used\u2022(?:Phone|Repair)\u2022PC\u2022(?:Trade-In|Build)', 'Sell\u2022Fix\u2022New\u2022Used\u2022PC\u2022Build'

  # --- PASS 2: <title> tags — use SHORT brand suffix to keep under 60 chars ---
  # Match the whole title line; replace any occurrence of full or short PZM brand within it
  $content = [regex]::Replace($content, '(?m)^(?<pre>\s*<title>)(?<inner>.*?)(?<post></title>)\s*$', {
    param($m)
    $inner = $m.Groups['inner'].Value
    # Replace long form with short
    $inner = $inner -replace 'PZM Computers (?:&amp;|&) Phones Store', $ShortBrand
    # Trim trailing legacy tagline if it follows the brand (avoids title >70 chars)
    $inner = $inner -replace ('\s*' + [regex]::Escape($ShortBrand) + '\s+New(?:&#8226;|\u2022)Used(?:&#8226;|\u2022)(?:Phone|Repair)(?:&#8226;|\u2022)PC(?:&#8226;|\u2022)(?:Trade(?:-|&#8209;)In|Build)'), " | $ShortBrand"
    # Bare " | PZM" or " - PZM" → short brand
    $inner = $inner -replace '\s\|\s*PZM\s*$', " | $ShortBrand"
    $inner = $inner -replace '\s-\s*PZM\s*$', " | $ShortBrand"
    return $m.Groups['pre'].Value + $inner + $m.Groups['post'].Value
  })

  # --- PASS 3: meta / OG / Twitter / schema / body — use LONG brand ---
  # Standard text form (HTML or attribute)
  $content = $content -replace 'PZM Computers & Phones Store', $LongBrand
  $content = $content -replace 'PZM Computers &amp; Phones Store', "P Z M Mobile &amp; Computers Sell New Used PC Build"

  # JSON-LD escaped form (\u0026 for &)
  $content = $content -replace 'PZM Computers \\u0026 Phones Store', $LongBrandJsonEsc

  # alternateName in JSON-LD — replace Arabic transliteration with long Latin brand
  $content = $content -replace '"alternateName":\s*"\u0628\u064a \u0632\u062f \u0627\u0645 \u0644\u0644\u0643\u0645\u0628\u064a\u0648\u062a\u0631 \u0648\u0627\u0644\u0647\u0648\u0627\u062a\u0641[^"]*"', '"alternateName": "P Z M Mobile & Computers -Sell New Used PC Build"'

  # --- PASS 4: trailing legacy tagline in titles that have NO brand suffix ---
  # (e.g. index.html: <title>PZM Computers & Phones Store New&#8226;Used&#8226;Phone&#8226;PC&#8226;Trade&#8209;In</title>
  # already covered by Pass 2 trim above, but also catch raw left-over tagline runs that pollute meta descriptions)

  if ($content -ne $original) {
    Set-Content -LiteralPath $file.FullName -Value $content -Encoding UTF8 -NoNewline
    $changed++
  }
}

Write-Host ""
Write-Host "Done. $changed of $($files.Count) files changed." -ForegroundColor Green
