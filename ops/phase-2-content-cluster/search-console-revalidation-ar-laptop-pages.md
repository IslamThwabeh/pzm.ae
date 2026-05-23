# Search Console Revalidation Checklist (Arabic Laptop Pages)

Date: 2026-05-23
Owner: SEO / Content Ops
Status: In progress (live pre-checks complete)

## Target URLs (Arabic)

1. https://pzm.ae/ar/services/used-macbook-air-dubai.html
2. https://pzm.ae/ar/services/used-macbook-pro-dubai.html
3. https://pzm.ae/ar/services/used-business-laptops-dubai.html
4. https://pzm.ae/ar/services/student-laptops-dubai.html
5. https://pzm.ae/ar/services/gaming-laptops-dubai.html

## Pre-Submission Checks (5-10 minutes)

1. Confirm each URL returns HTTP 200.
2. Confirm canonical is self-referencing (same URL).
3. Confirm robots meta is index, follow.
4. Confirm JSON-LD exists on each page.
5. Confirm each URL exists in sitemap.xml.

## Execution Log (2026-05-23)

Automated live checks were executed for all 5 target URLs before Search Console submission.

| URL | HTTP | Canonical Self | Robots Index/Follow | JSON-LD | In Live Sitemap |
|---|---|---|---|---|---|
| https://pzm.ae/ar/services/used-macbook-air-dubai.html | 200 | Yes | Yes | Yes | Yes |
| https://pzm.ae/ar/services/used-macbook-pro-dubai.html | 200 | Yes | Yes | Yes | Yes |
| https://pzm.ae/ar/services/used-business-laptops-dubai.html | 200 | Yes | Yes | Yes | Yes |
| https://pzm.ae/ar/services/student-laptops-dubai.html | 200 | Yes | Yes | Yes | Yes |
| https://pzm.ae/ar/services/gaming-laptops-dubai.html | 200 | Yes | Yes | Yes | Yes |

Result: No pre-submission blockers detected.

## Remaining Manual Steps (Search Console)

1. Re-submit sitemap: https://pzm.ae/sitemap.xml
2. URL Inspection + Request Indexing for each of the 5 URLs
3. Log date/time and owner for each requested URL

### Optional quick PowerShell check

Run from repo root:

```powershell
$urls = @(
  "https://pzm.ae/ar/services/used-macbook-air-dubai.html",
  "https://pzm.ae/ar/services/used-macbook-pro-dubai.html",
  "https://pzm.ae/ar/services/used-business-laptops-dubai.html",
  "https://pzm.ae/ar/services/student-laptops-dubai.html",
  "https://pzm.ae/ar/services/gaming-laptops-dubai.html"
)

foreach ($u in $urls) {
  try {
    $r = Invoke-WebRequest -Uri $u -Method GET -TimeoutSec 20
    $okCanonical = $r.Content -match '<link rel="canonical" href="' + [regex]::Escape($u) + '"'
    $okRobots = $r.Content -match '<meta name="robots" content="index, follow"'
    $okJsonLd = $r.Content -match 'application/ld\+json'
    "{0}`t{1}`tcanonical:{2}`trobots:{3}`tjsonld:{4}" -f $u, $r.StatusCode, $okCanonical, $okRobots, $okJsonLd
  } catch {
    "{0}`tERROR`t{1}" -f $u, $_.Exception.Message
  }
}
```

## Search Console Execution Order

1. Open the domain property for pzm.ae in Google Search Console.
2. Go to Sitemaps and re-submit:
   - https://pzm.ae/sitemap.xml
3. Use URL Inspection for each of the 5 target URLs:
   - Test live URL
   - If live test passes, click Request Indexing
4. Repeat for all 5 URLs in one session.

## Suggested Request-Indexing Notes (for internal tracking)

Use this in your sheet or task tracker:

- "Arabic Phase 2 laptop intent pages published and internally linked. Sitemap updated and resubmitted. Live tests pass; indexing requested."

## Verification Window and Expected Signals

### After 24-72 hours

1. Check URL Inspection status for each page:
   - Crawl allowed = Yes
   - Indexing allowed = Yes
   - Canonical = User-declared canonical
2. Confirm no new Enhancements issues tied to these URLs.

### After 7 days

1. Check Performance report with page filter for /ar/services/.
2. Compare impressions and first queries for these pages.
3. Confirm no unexpected exclusions in Page Indexing report.

## Rollback / Triage Triggers

If any URL is not indexed after 7-10 days:

1. Re-run live URL test.
2. Re-check canonical/robots/JSON-LD on live HTML.
3. Confirm URL is still present in sitemap.xml.
4. Confirm at least 2 internal links point to that URL from high-crawl pages.
5. Request indexing once again after fixes.

## Done Criteria

Mark this checklist complete when:

1. All 5 URLs were live-tested and indexing-requested.
2. Sitemap was re-submitted.
3. No critical indexing blockers remain in URL Inspection.
4. All actions are logged with date/time and owner.
