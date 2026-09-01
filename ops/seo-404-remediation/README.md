# Search Console 404 Remediation Plan

## Objective

Reduce avoidable legacy 404s without creating misleading redirects or soft-404
signals. Preserve valid 404 responses for content that was intentionally retired,
and add permanent one-hop redirects only where a clear replacement exists.

Source baseline: the September 1, 2026 Search Console export contains 64 URLs.
The export covers June 5 through August 21, 2026.

## Baseline

- 64 exported URLs currently end in HTTP 404.
- 55 URLs use `pzm.ae`; 9 use `shop.pzm.ae`.
- 26 are area/location URLs, 22 product URLs, 8 service URLs, 6 blog
  URLs, 1 cart URL, and 1 policy URL.
- 16 report rows are aliases within 10 normalized URL families.
- All 126 URLs currently listed in `sitemap.xml` return HTTP 200.
- The current repository does not link to the exported legacy product, old-area,
  or `shop.pzm.ae` URLs.
- `pzm.ae` is published by GitHub Pages and currently resolves directly to
  GitHub Pages IP addresses.
- `shop.pzm.ae` is a separate Cloudflare Pages/Workers deployment and currently
  resolves through Cloudflare.

The proposed decision for every exported URL is recorded in
`legacy-url-decisions.csv`.

## Decision rules

1. Use `301` only when the destination satisfies substantially the same user
   intent as the source.
2. Keep `404` (or use `410` at the edge) when content was intentionally retired
   and has no genuine replacement.
3. Never redirect retired products or unsupported locations to the homepage.
4. Redirect hostname and path aliases directly to the final live canonical URL
   in one hop.
5. Resolve every `review` row using Search Console performance and external-link
   evidence before deployment.

## Phase 1 - Inventory and local safeguards

Status: complete

Deliverables:

- A 64-row legacy URL decision register.
- A validation script that checks schema, duplicate sources, decision values,
  redirect targets, redirect chains, and current production outcomes.
- A documented baseline and implementation sequence.

Exit criteria:

- Exactly 64 unique source URLs are represented.
- Every row is classified as `redirect`, `keep_404`, or `review`.
- Every proposed redirect has one canonical HTTPS target.
- All proposed redirect targets return HTTP 200.

No production, DNS, Cloudflare, GitHub, or Search Console state changes occur in
this phase.

## Phase 2 - Decision review and hosting-path confirmation

Goal: approve the redirect list and choose the implementation separately for
each host.

Status: in progress

Codex actions:

1. Present all `review` rows with the closest current content candidates.
2. Recheck whether proposed targets are canonical, indexable, and in the sitemap.
3. Prepare GitHub Pages redirect fallbacks for approved `pzm.ae` URLs.
4. Verify Cloudflare authentication before preparing or deploying the separate
   `shop.pzm.ae` redirect configuration.

User actions:

1. Approve or revise the six `review` decisions.
2. Choose the `pzm.ae` redirect method described below.
3. Confirm access to the Cloudflare account/project serving `shop.pzm.ae`.
4. Confirm whether intentionally retired URLs should remain `404` or return
   `410 Gone` at the edge.

Current readiness note: Wrangler 4.83.0 is installed on the workstation but is
not authenticated. Run `wrangler login`, complete the browser authorization,
then run `wrangler whoami` before any preview or deployment work.

Exit criteria:

- All `review` rows have a final decision.
- The user approves the redirect configuration for each host.
- A rollback plan is documented before external changes.

### `pzm.ae` implementation choices

The publishing origin remains GitHub Pages in both choices.

1. GitHub Pages-only: add zero-second meta-refresh fallback pages with canonical
   destinations. This does not change DNS or introduce Cloudflare in front of
   the site. It is the least invasive option, but the legacy source responds
   with HTTP 200 rather than a true server-side 301 and some extensionless paths
   may require an extra slash normalization hop.
2. Optional Cloudflare proxy in front of GitHub Pages: keep GitHub Pages as the
   origin and publishing system, but proxy apex HTTP traffic through Cloudflare
   so Redirect Rules can emit true one-hop 301 responses. This is better for
   redirect semantics but changes the request path and requires TLS/origin
   preflight and a rollback procedure. It will not be used without explicit
   approval.

Default pending user choice: GitHub Pages-only.

### `shop.pzm.ae` implementation

Use the existing Cloudflare Pages/Workers environment to replace hostname-only
redirects that currently land on dead `pzm.ae` paths. Approved sources should
redirect directly to their final live canonical target in one hop.

## Phase 3 - Build and preview host-specific redirects

Status: complete. The nine GitHub Pages fallback files covering 11 approved
`pzm.ae` source variants and the four approved `shop.pzm.ae` Cloudflare Single
Redirect exceptions were deployed on 2026-09-01 and verified against the live
sites. The storefront runbook is in the separate project at
`C:\Users\islamt\shop-pzm.ae\ops\gsc-404-remediation-shop-alias-2026-09-01.md`.

Cloudflare rule order after deployment:

1. `Shop legacy gaming-PC alias`
2. `Shop legacy area aliases`
3. Existing `shop to pzm.ae` catch-all
4. Existing `Redirect www to root`

The exact legacy paths reach their intended canonical pages, query strings are
preserved by both new rules, and an unrelated storefront path still follows
the existing catch-all behavior. No DNS, SSL/TLS, Workers, Pages, or apex
hosting settings were changed.

Build two independent configurations:

- GitHub Pages redirect fallback files for approved `pzm.ae` sources, unless
  the user explicitly selects the optional proxy approach.
- Cloudflare redirect configuration for approved `shop.pzm.ae` sources.

Implementation requirements:

- Exact-match handling for approved legacy URLs.
- Direct canonical destinations; no redirect-to-redirect mappings. A GitHub
  Pages slash-normalization hop is documented if it cannot be avoided.
- Preserve query strings only where useful.
- Do not cache redirect responses during preview testing.
- Keep unmatched requests routed to the existing GitHub Pages origin.

Codex actions:

1. Generate host-specific redirect configuration from the approved CSV.
2. Validate configuration syntax locally.
3. Test the matching logic against all 64 sources.
4. Confirm that every unmatched representative site URL passes through
   unchanged.

User action:

- Approve the generated configuration before deployment.

Exit criteria:

- Every approved source maps to exactly one expected outcome.
- No rule catches unrelated paths.
- Production deployment command and rollback command are ready.

## Phase 4 - Deploy and production verification

Status: complete on 2026-09-01.

- GitHub commit: `aaba73874cc8c481dbb747918540b10e1c108adf`
- GitHub Pages workflow run: `33554641621` (successful)
- All 11 approved `pzm.ae` aliases serve the expected `noindex,follow` static
  fallback with a zero-second meta refresh and matching canonical target.
- All four approved `shop.pzm.ae` aliases return a one-hop 301 with the expected
  `Location`, preserve query strings, and end at HTTP 200 targets.
- The sitemap and representative unrelated storefront behavior remain
  unchanged.

Codex actions, after explicit approval:

1. Deploy approved GitHub Pages fallback files through the existing GitHub
   workflow.
2. Verify Cloudflare authentication and deploy only the approved
   `shop.pzm.ae` redirects.
3. Check each redirect source without following redirects.
4. Follow each redirect and confirm the final response is HTTP 200.
5. Recheck all sitemap URLs and representative unmatched URLs.

User actions:

1. Complete Cloudflare OAuth login if `wrangler` is not authenticated.
2. Approve the apex proxy change only if the optional proxy method was selected.
3. Confirm the storefront and GitHub Pages origin still work after deployment.

Rollback triggers:

- Homepage or sitemap becomes unavailable.
- TLS or GitHub Pages custom-domain behavior changes unexpectedly.
- A redirect affects an unrelated URL.
- A redirect loop or chain appears.

Exit criteria:

- Cloudflare-handled redirects return 301/308 in one hop. GitHub Pages-only
  fallbacks return an immediate meta refresh with the final canonical target.
- Final targets return 200.
- Intentional retired URLs return the approved 404/410 response.
- All sitemap URLs continue to return 200.

## Phase 5 - Search Console validation and monitoring

User actions in Search Console:

1. Inspect one URL from each redirect family.
2. Run live tests and confirm Google sees the permanent redirect.
3. Resubmit `https://pzm.ae/sitemap.xml`.
4. Start validation only for URLs that were supposed to be corrected.
5. Do not treat intentional 404/410 URLs as a failed remediation.

Monitoring cadence:

- Day 0: save production status results.
- Day 3: confirm Googlebot has begun recrawling representative sources.
- Day 7: export the issue report and compare counts by URL family.
- Day 14: repeat the export and inspect any newly discovered URLs.
- Day 28: close the phase if corrected URLs are declining and no new internal
  source is generating aliases.

## Phase 6 - Ongoing release safeguards

Add CI checks that fail a release when:

- A sitemap URL does not return or map to a local HTTP 200 page.
- A local internal link targets a missing page.
- Canonical or hreflang URLs disagree with the chosen URL style.
- A known legacy URL loses its approved redirect/retirement outcome.
- A `shop.pzm.ae` rule redirects to a dead `pzm.ae` path.

Maintain `legacy-url-decisions.csv` as a permanent retirement and redirect
register. Add new retired URLs before deleting or renaming pages.
