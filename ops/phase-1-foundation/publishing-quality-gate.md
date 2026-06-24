# Publishing Quality Gate

Use this gate for every new commercial page and article.

## A) Intent And Value

1. Page has one primary user intent (buy, repair, compare, area, guide).
2. Page is not a duplicate of an existing page.
3. Content includes local relevance for Dubai and, where applicable, area context.
4. CTA is clear and action-focused (WhatsApp or call).

## B) Content Quality

1. Unique title and meta description.
2. One clear H1 in page content.
3. Practical details included (pricing context, process, checks, ETA, warranty notes).
4. Natural internal links to related service and area pages.
5. Title is bucketed by page type: service/core titles are compact, blog titles keep primary keyword early, and title tags avoid repeated long brand/tagline suffixes.

## C) Technical And SEO

1. Canonical URL is present and correct.
2. Meta robots is present and intentionally set.
3. Open Graph and Twitter card tags are present.
4. JSON-LD is valid and matches visible content.
5. Internal links use expected static URL style.
6. GitHub Pages constraint is respected: do not rely on `.htaccess`, Nginx, or repo HTML for true per-page 301 redirects.
7. Retired static pages are either restored as useful indexable content or kept as `noindex,follow` redirect fallbacks and excluded from `sitemap.xml`.
8. `sitemap.xml` contains only canonical, indexable pages; no noindex pages, meta-refresh redirect shells, duplicate aliases, or interstitial routes.

## D) Conversion And Tracking

1. WhatsApp links include prefilled message with `(via pzm.ae)`.
2. Phone links use `tel:+971528026677` where relevant.
3. Page includes shared scripts used for nav/contact/tracking where applicable.

## E) Trust And Authenticity

1. Claims are supportable and not exaggerated.
2. Review and rating schema fields reflect truthful, defensible data.
3. Images are relevant and preferably real photos for commercial pages.

## Gate Decision

- PASS: All required checks pass.
- BLOCKED: Any required check fails. Do not publish.
