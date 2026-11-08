# Website security review

Date: 26 October 2026. Repository: `IslamThwabeh/pzm.ae`, checkout `a9e6970`.

## Executive summary

There is a confirmed public configuration exposure that should be addressed promptly: `https://pzm.ae/.env` returns HTTP 200 and contains the same Google Maps API key as the tracked repository file. The deployment uploads the repository root, also making sampled operations documents and maintenance scripts publicly downloadable. Whether the key permits unauthorized billable API use remains unknown until its restrictions and usage are inspected in Google Cloud. A browser Maps key being visible is not, by itself, proof of an exploitable credential; unrestricted or inappropriate use is the concern.

Additional findings include a conditional HTML injection path in business-hours rendering, enquiry text sent to analytics, and missing browser defense controls. No confirmed critical vulnerability or evidence of a breach was established by this review. This was a source review and a small set of non-destructive HTTP checks, not an incident investigation or comprehensive penetration test.

The apex site is static HTML and browser JavaScript hosted on GitHub Pages. No application backend, database, login, payment processor, or package dependency manifest was found in this repository. The separate `shop.pzm.ae` application and business-hours Worker source were unavailable for review. At review time the shop root redirected to the apex; this does not establish the security of its other routes or Cloudflare configuration.

## High priority

### SEC-01 — Public configuration file and overly broad deployment artifact

- **Severity:** High remediation priority; credential abuse impact is conditional on the key's validity, restrictions, enabled APIs, and billing configuration.
- **Rules:** Secret/configuration exposure; deployment artifact least privilege.
- **Location:** `.env:1`; `.gitignore:1–31`; `.github/workflows/static.yml:36–40`.
- **Evidence:** `.env` is tracked and contains `VITE_GOOGLE_MAPS_API_KEY=[REDACTED]`. Its value has the expected Google API key format and does not resemble a placeholder. The workflow supplies `path: '.'` to `actions/upload-pages-artifact@v3`. Its archiver excludes `.git` and `.github`, but does not exclude `.env` or `ops/`. The repository ignore file contains no environment-file rule.
- **Live confirmation:** GET `https://pzm.ae/.env` returned 200, 64 bytes, and matched the local file after newline normalization. GET `/ops/phase-1-foundation/roles-and-rituals.md` and `/scripts/hash-static-assets.py` also returned 200. Response bodies containing credentials were not printed or copied into this report.
- **Impact:** Anyone can retrieve the configuration file. If the Maps key is active and inadequately restricted, unauthorized API consumption could incur charges or exhaust quotas. Publishing the repository root also creates a route for future internal files or credentials to reach production. The sampled operations file and script do not independently prove a sensitive-data breach.
- **Resolution:** First inspect key usage, application restrictions, API restrictions, and enabled services in Google Cloud. Restrict active browser keys to the intended sites and APIs; disable an unused key, or carefully replace a compromised key after identifying its consumers. Remove `.env` from version control and the deployed artifact, add environment-file ignore rules, and publish an explicit allowlist of public assets through a staging directory. Exclude internal documentation, maintenance scripts, backups, local artifacts, and this report. Adding `.gitignore` alone does not untrack an existing file or remove its deployed copy.
- **Validation:** Before deployment, inspect the artifact for prohibited files and verify that all public pages and referenced assets remain present. After deployment, verify that `/.env` and excluded internal paths return actual 404 responses. Old Git history and copies may retain the old key, so file deletion alone does not revoke it. History rewriting would be a separate coordinated task, not a substitute for key controls.
- **Uncertainty:** No request using the exposed key was made, no billable API test was performed, and Google Cloud restrictions or usage logs were not accessible. Do not describe unauthorized key use as confirmed.

## Medium priority

### SEC-02 — Business-hours response can reach an HTML injection sink

- **Severity:** Medium, conditional on attacker control of the hours response.
- **Rules:** `JS-XSS-001` — untrusted data in `innerHTML`.
- **Location:** `js/store-status.js:127–157`, `:192–195`, `:238–247`; deployed copy `assets/v20260822/js/store-status-c6e905af.js` at the same lines. Loader: `js/contact-loader.js:237–242`.
- **Evidence:** `displayHours()` interpolates response-derived text into HTML and assigns `hoursElement.innerHTML = hoursHTML`. Although the normal opening-time parser is restrictive, `if (/closed/i.test(rangeText))` accepts any range string containing “closed”, including additional markup. `activeWeekdayText = nextHours` preserves the original response strings for rendering.
- **Validation:** A local Node VM test supplied seven weekday strings, with a harmless `<b data-security-audit='marker'>local marker</b>` appended to a Closed entry. The parser accepted the array, and the unchanged markup reached the HTML setter. This demonstrated the parsing-to-sink path without executing a script or modifying the live service. The live asset matched the checked-out asset.
- **Impact:** If the Worker or its upstream data becomes attacker-controlled and returns accepted non-fallback data, injected markup could alter the page and script-bearing markup could execute in the site's origin. This could substitute contact destinations or deceptive customer instructions. No public query-parameter exploit or current endpoint compromise was demonstrated.
- **Resolution:** Build the hours rows using DOM elements and `textContent`. Render normalized, validated values rather than original response strings. Validate weekday uniqueness, input types, time ranges, and the entire closed indicator. Update the versioned asset and every active reference as well as the source file.
- **Mitigation and uncertainty:** The endpoint currently returns `source: 'fallback'`, which this client ignores. A request carrying `Origin: https://pzm.ae` received a matching CORS response. The current fallback behavior reduces present exposure, but does not remove the unsafe rendering path when live data resumes. CORS is not HTML sanitization.

### SEC-03 — Free-text customer enquiries are included in analytics events

- **Severity:** Medium data-handling issue; sensitivity depends on customer input.
- **Rules:** Minimize customer information sent to third parties.
- **Location:** `js/owner-experience.js:6–15`.
- **Evidence:** The form reads `model` and `issue`, creates a WhatsApp URL containing their values, then sends `gtag('event', 'pzm_whatsapp_click', { ... event_label: href ... })`. The current live JavaScript contains this code. Forms using this handler exist on the English and Arabic iPhone/MacBook enquiry pages.
- **Impact:** When analytics is active and a customer submits the form, the site attempts to send the complete enquiry URL to Google Analytics, in addition to opening WhatsApp. Free text may contain names, phone numbers, serial numbers, or other personal details. URL encoding preserves that information; it does not anonymize it.
- **Resolution:** Replace the full URL event label with a constant such as `repair_enquiry`, plus a small allowlist of non-personal properties if needed. Keep message text out of analytics events. Review analytics retention and access, and investigate historical collection through the account if necessary.
- **Mitigation and uncertainty:** The event is guarded by the existence of `window.gtag`; blockers and analytics settings can prevent transmission. Historical collection was not inspected, and no customer form was submitted during this review.

## Lower priority hardening

### SEC-04 — No Content Security Policy or framing restriction observed

- **Severity:** Low defense-in-depth gap; not proof of an exploitable injection.
- **Rules:** `JS-CSP-001` and framing protection.
- **Location:** `index.html` and the other tracked HTML entry points; live responses for `/` and `/contact-us.html`.
- **Evidence:** Neither sampled live response contained `Content-Security-Policy`, `Content-Security-Policy-Report-Only`, or `X-Frame-Options`. No CSP meta element was found in the 199 tracked HTML files. The sampled responses also lacked `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` headers; these omissions are not being counted as separate vulnerabilities.
- **Impact:** There is no observed CSP layer to limit a successful injection, and no observed header preventing the sampled pages from being framed. Framing risk is lower for this public marketing site than for a transactional account application.
- **Resolution:** Within the existing GitHub Pages boundary, assess a carefully tested early meta CSP, using hashes or external files for inline scripts and narrowly allowed resource origins. Inventory Google Analytics, Elfsight, Trysoro, Maps, the hours endpoint, and inline behavior before enforcement. Do not weaken the script policy broadly just to preserve inline code.
- **Mitigation and uncertainty:** GitHub Pages does not provide repository-controlled arbitrary response headers. A meta CSP cannot enforce `frame-ancestors`; an `_headers` file or a meta X-Frame-Options tag would not solve that limitation here. Any hosting/proxy change needs separate owner approval. No such change is required or proposed as part of this report. No clickjacking attack was executed.

### SEC-05 — Third-party scripts execute with site privileges

- **Severity:** Low conditional supply-chain risk.
- **Rules:** `JS-SUPPLY-001`, `JS-SRI-001`.
- **Location:** `index.html:356` and `:816–826`; `blog.html:256`; `blog-post.html:100`.
- **Evidence:** Pages load Google Analytics, Elfsight, and a Trysoro embed. Elfsight is also inserted dynamically by the homepage. The examined third-party script loads do not carry integrity attributes, and no CSP limits their execution.
- **Impact:** A compromised vendor, vendor account, or delivered script can execute code with the page's privileges. No malicious vendor code or vendor compromise was established.
- **Resolution:** Confirm which integrations are still required and remove unused ones with product approval. Apply an appropriately narrow CSP and protect the vendor accounts. For immutable versioned third-party assets, consider self-hosting or Subresource Integrity. Dynamic analytics/widget scripts may change by design; do not attach a fixed integrity hash without a supported update plan.
- **Mitigation and uncertainty:** This is an architectural trust dependency, not a finding that these services are currently vulnerable. Vendor accounts, configuration, and dynamically fetched secondary scripts were not fully audited.

### SEC-06 — Deployment actions use mutable version tags

- **Severity:** Low supply-chain hardening opportunity.
- **Rules:** GitHub Actions dependency pinning.
- **Location:** `.github/workflows/static.yml:33`, `:35`, `:37`, `:43`.
- **Evidence:** Checkout, configure-pages, upload-pages-artifact, and deploy-pages are referenced by major-version tags rather than full commit hashes.
- **Impact:** A changed upstream action tag changes code that runs in the deployment job, which has Pages publishing permissions. This review found no evidence that any referenced official action was compromised.
- **Resolution:** Pin reviewed action versions to full commit SHAs and establish an update process. Check transitive action references as well; pinning only the outer composite action does not pin all of its dependencies. Reassess supported versions at implementation time.
- **Existing safeguards:** The workflow triggers on main pushes or manual dispatch, grants repository contents read rather than write, uses a deployment environment, and does not execute pull-request content through `pull_request_target`.

## Checks and limits

- HTTP requests to the apex redirect to HTTPS with HTTP 301. HTTPS requests succeeded with certificate verification enabled using Python's HTTP client. The initial Windows curl TLS client failed locally; it was not treated as a website defect.
- Reviewed tracked HTML/JavaScript and deployment configuration, traced browser input and rendering paths, and scanned likely text files for common credential patterns without printing candidate values. This was a heuristic scan, not an exhaustive secret scan of all Git history, images, or external systems.
- The 404 page places its URL text through `textContent`. The WhatsApp interstitial uses a fixed destination/number and encodes message input. Blog slug selection is primarily a lookup against repository data; no direct URL-to-HTML execution path was confirmed there. Constant HTML templates were not automatically reported as vulnerabilities.
- No package or lockfile was found for an application dependency audit. This does not certify external scripts as free of known vulnerabilities. Local authoring tools and Python environments were not audited.
- No authenticated admin review of GitHub protections, account MFA, Google Cloud restrictions/billing, Cloudflare settings, domain verification, vendor accounts, or access/incident logs was performed. Shop routes beyond the root redirect and Worker implementation are outside this source review. Availability and denial-of-service resilience were not load-tested.
- No production code, account settings, credentials, DNS, hosting, or deployment was changed. This report is the only repository addition. Because the current workflow publishes the repository root, exclude the report from the future deployment artifact before publishing repository changes.

## Recommended order

1. Inspect and secure the exposed Google Maps key; correct the deployment artifact boundary and remove the public configuration file.
2. Replace remote-hours HTML interpolation with safe DOM rendering, and remove enquiry text from analytics.
3. Test a compatible CSP, review third-party integrations, and pin deployment dependencies.
4. Review account protections and logs in the services that could not be inspected here; do not treat this source review as confirmation that no breach has occurred.

## Primary references

- [Google Maps Platform security guidance](https://developers.google.com/maps/api-security-best-practices): application/API restrictions, usage review, and safe key replacement.
- [GitHub upload-pages-artifact v3 implementation](https://raw.githubusercontent.com/actions/upload-pages-artifact/v3/action.yml): the archive includes the supplied directory and excludes `.git` and `.github`.
- [GitHub Actions secure use reference](https://docs.github.com/en/actions/reference/security/secure-use): dependency pinning and least-privilege workflow controls.
- [MDN Content Security Policy guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP): script restrictions and injection defenses.
- [MDN frame-ancestors reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors): framing restrictions and lack of meta-element support.
- [GitHub Pages HTTPS guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https): HTTPS enforcement on Pages.
