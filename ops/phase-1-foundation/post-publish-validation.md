# Post-Publish Validation

Page path:
Commit hash:
Validated by:
Validation date:

## Live Checks

- [ ] Live URL loads successfully.
- [ ] Primary CTA links work (WhatsApp and call).
- [ ] Key internal links work.
- [ ] Contact section renders correctly.

## SEO Checks

- [ ] Canonical matches intended URL.
- [ ] Robots meta is correct.
- [ ] JSON-LD is present and valid.
- [ ] Page included in `sitemap.xml` when required.
- [ ] Page excluded from `sitemap.xml` if it is `noindex`, retired, duplicate, or a meta-refresh fallback.
- [ ] Edited title tag is within the intended bucket: compact for service/core pages, descriptive but not bloated for blog pages.
- [ ] `sitemap.xml` parses and no listed local URL points to `noindex` or `<meta http-equiv="refresh">`.
- [ ] GitHub Pages redirect limitation was considered; no assumed `.htaccess`/Nginx 301 exists unless handled outside GitHub Pages.

## Analytics Checks

- [ ] GA4 page view is visible.
- [ ] `pzm_whatsapp_click` event fires on click.
- [ ] `pzm_call_click` event fires on click.

## Search Console Readiness

- [ ] URL Inspection requested for critical pages.
- [ ] Updated sitemap submitted in Google Search Console and Bing Webmaster Tools after sitemap changes.
- [ ] No immediate rich result validation errors.

## Status

- [ ] PASS
- [ ] ISSUE FOUND (include notes below)

Notes:
