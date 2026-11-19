# Search Console review — 19 November 2026

Reviewed the owner's open Chrome session for the `pzm.ae` domain property.
Indexing report data was last updated 16 November 2026. The domain property
includes historical apex and subdomain URLs; report totals are not a count of
current canonical site pages.

## Findings

| Report | Pages | Observed status / interpretation |
| --- | ---: | --- |
| Indexed | 83 | Current domain-property total |
| Not indexed | 184 | Six active exclusion reasons; not 184 broken current pages |
| Not found (404) | 68 | First ten examples include retired product, location and service URLs; full 68-row set was not exported |
| Excluded by noindex | 34 | Count reviewed; full example set was not audited |
| Page with redirect | 13 | Count reviewed; exclusion alone is not a redirect failure |
| Alternate with proper canonical | 9 | Count reviewed; exclusion alone is not an error |
| Crawled, currently not indexed | 12 | All twelve examples read and independently checked live |
| Redirect error | 0 | Validation passed |
| Discovered, currently not indexed | 48 | First ten examples are Arabic blog pages, all with last crawl N/A; full set was not exported |

The discovered report's validation passed on 1 July 2026 after starting
26 March. This historical label does not mean its current 48 URLs are indexed.

Sitemaps: `https://pzm.ae/sitemap.xml` shows **Success**, last read
19 November 2026, with 131 discovered pages. No resubmission is needed simply
to repair sitemap processing. Product snippets show zero invalid and zero
valid items, with no issues detected in the last 90 days. Zero valid items
does not establish product rich-result eligibility or merchant-feed approval.

## Independent technical checks

- All 131 live sitemap URLs return HTTP 200 at their exact URL, declare a
  matching canonical and have neither a noindex meta tag nor meta refresh.
- All 131 corresponding local targets exist and pass the same canonical and
  indexability checks.
- No missing local destinations were found among static internal anchors in
  sitemap pages. This check does not execute JavaScript-generated links or
  verify external links.
- `robots.txt` returns 200 and explicitly allows Googlebot and the approved AI
  crawlers.
- Three sampled Arabic discovery URLs already have 2, 6 and 2 static incoming
  link occurrences respectively. They are not completely orphaned. The return
  policy has eight static incoming link occurrences.

Evidence: `live-sitemap-audit-2026-11-19.json`,
`crawled-url-audit-2026-11-19.json` and
`internal-link-audit-2026-11-19.json` in this directory.

## The twelve crawled-but-unindexed examples

Live checks show five now return 404, three carry noindex (including an expired
World Cup article), two old `blog.html?post=` URLs canonicalize to the blog
listing, one is `llms.txt`, and one is the current return-policy page.
The report's crawl dates range from May through July 2026. Therefore this
category is substantially historical and is not evidence that twelve current
commercial landing pages are blocked.

Keep intentional retired routes out of the sitemap. Do not make legacy
locations indexable, redirect unidentified retired products to the homepage,
or remove noindex from intentional fallbacks just to reduce the report count.
The current return-policy page is a useful candidate for URL Inspection and a
live test, followed by a recrawl request if Google still reports exclusion.

## Correction prepared locally

The public search result for `faq.html` exposed an incorrect Thursday-closed
answer. The same error was present in its visible HTML and FAQPage JSON-LD.
Both now use the approved schedule: Monday through Thursday 11 AM–11 PM;
Friday 10:30 AM–11 PM; Saturday and Sunday 10:30 AM–11:30 PM. The owner
subsequently supplied a Google Maps screenshot confirming the 10:30 AM weekend
opening and authorized publication of all pending changes. The sitemap date
is updated to 19 November. This correction must be published before asking
Google to refresh the result.

## Priorities after publication

1. Run URL Inspection live tests for the corrected FAQ, current return policy
   and a small set of useful Arabic buying guides. Request a recrawl once per
   selected URL after confirming live availability and indexability.
2. Export all 48 discovered URLs and classify current evergreen content versus
   expired/event content. Prioritize useful buying guides; inspect rendered
   content, page distinctness and contextual internal links before making
   broad content changes. The current checks do not establish Google's reason
   for withholding indexing.
3. Export all 68 current 404 URLs and compare exact URLs with the existing
   64-row register. A higher count alone does not identify four new URLs.
   Retain deliberate retirements; investigate any new current-page failures
   or useful inbound legacy URLs individually.
4. Recheck the chosen URLs and report counts after Google recrawls. Do not
   validate entire intentional 404/noindex categories as though all entries
   should become indexable.

The Search Console review was read-only. No indexing requests, validation
submissions, removals, DNS changes or hosting changes were made. The apex
remains hosted by GitHub Pages.

## References

- [Google: technical requirements](https://developers.google.com/search/docs/essentials/technical)
- [Google: request a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google: noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- [Google: HTTP status handling](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes)
