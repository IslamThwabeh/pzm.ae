# Website security remediation plan

Prepared: 26 October 2026.
Baseline: `security_best_practices_report.md`, findings SEC-01 through SEC-06.
Status: Planned; no remediation or production changes performed.

## Objective and completion standard

Address every finding from the review, with mandatory closure of the high-priority exposure and both medium-priority code issues. The audit did not confirm a critical-severity vulnerability. If a critical issue is established during remediation, prioritize containment and verified resolution before considering this work complete.

Interpret the requested 90% as a substantial risk-reduction target, not a measured security percentage. Six findings do not provide a defensible numerical estimate of breach risk. Track each as planned, implemented, verified live, mitigated with residual risk, or awaiting account verification. A local change alone is not live remediation.

Keep `pzm.ae` on GitHub Pages and Cloudflare as its authoritative DNS provider. Follow `copilot-instructions.md` for site changes. The separate shop application and Worker implementation require their own source/access to audit; they are not certified by this plan.

## Workstream 1 — Contain public configuration exposure first

**Finding:** SEC-01. **Priority:** Immediate. **Owners:** Repository implementer and Google Cloud account administrator.

Repository work:

1. Inventory current public routes, assets, dynamic imports, crawler files, domain verification files, feeds, and approved legacy fallbacks. Use this inventory to build a reviewed public-file manifest.
2. Prepare a clean staging directory containing only approved public files, then upload that directory through the existing GitHub Pages workflow. Do not copy the whole repository and rely only on a blacklist. Reject symlinks/path escapes and unexpected files.
3. Exclude environment files, internal documentation, operations files, maintenance scripts, backups, local tooling, generated audit output, this plan, and the security report. Preserve the public site, approved fallbacks, CNAME, sitemap, product feed, robots.txt, llms.txt, and verification files.
4. Remove `.env` from version control while preserving the local copy if still needed; add environment-file ignore rules. Adding ignore rules alone does not remove already tracked or deployed data.
5. Add an artifact validation gate that blocks publication of prohibited files and checks that the reviewed public manifest is complete. Add a redacted secret scan with narrowly documented exceptions for intentionally public identifiers; never log actual credentials.

Google Cloud work, performed alongside repository preparation:

1. Identify the exposed key, its consumers, enabled APIs, restrictions, recent usage, errors, and billing. Treat it as exposed, but do not assume it is active or unrestricted.
2. Disable/delete an unused key after confirming it has no consumers. For active use, apply the appropriate application and API restrictions. Browser referrer restrictions belong on browser keys; server-side consumers need separate appropriately restricted credentials.
3. Replace an abused or otherwise compromised key with a restricted replacement, migrate legitimate consumers, validate them, and revoke the old key. Do not paste either value into chat, source, reports, or logs.
4. Check for unexpected usage and configure appropriate usage/billing alerts and supported quotas. Alerts alone are not spending limits.

**Closure evidence:** A clean artifact inventory; no prohibited files; real HTTP 404 responses for `/.env` and sampled internal paths after deployment; working public routes/assets; and redacted account evidence that the old key is disabled/revoked or its continued use is appropriately restricted and justified. Copies in Git history remain exposed; removing a file does not revoke its key. Any history rewrite is a separate coordinated decision.

**Release strategy:** Prepare this as a small first release. Do not wait for the CSP rollout to stop publishing private configuration. Reverting this release must not restore root-directory uploads or the exposed file.

## Workstream 2 — Remove unsafe rendering and analytics data collection

**Findings:** SEC-02 and SEC-03. **Priority:** Next required release. **Owner:** Repository implementer; analytics administrator for historical review.

Business hours:

1. Replace response-derived HTML interpolation with DOM elements and `textContent`.
2. Require the expected input types, exactly seven unique recognized weekdays, valid time ranges, and an exact supported closed indicator. Render normalized values rather than raw strings.
3. Preserve English/Arabic display, Asia/Dubai time calculations, the approved local schedule, and timeout/fallback behavior. Invalid data must retain the verified fallback.
4. Update the source and active versioned assets/references. Review retained historical asset copies so active or reachable old code is not mistakenly counted as remediated; remove unused assets only after checking references.
5. Add focused regression tests for markup-bearing entries, duplicate/missing weekdays, invalid times, malformed payloads, valid schedules, and fallback responses.

Enquiry analytics:

1. Replace the full WhatsApp URL event label with a constant identifier and a small allowlist of non-personal properties.
2. Review related event handlers for message text, query strings, or other free-text forwarding. Preserve the intended customer message in the WhatsApp handoff.
3. Test English and Arabic forms using synthetic unique marker text and a stubbed analytics destination. Verify the marker reaches the intended WhatsApp URL and never reaches analytics events. Do not submit a real customer message or transmit test personal data to production analytics.
4. Have the analytics administrator inspect historical event collection and decide whether existing records require deletion or retention/access adjustments. This account task remains open until verified.

**Closure evidence:** Passing focused regression checks; no HTML parsing of remote-hours text; no free-text enquiry data in captured analytics payloads; correct customer handoffs; and live pages loading the updated assets after deployment. Historical analytics cleanup is tracked separately from stopping future collection.

## Workstream 3 — Add browser and supply-chain protections

**Findings:** SEC-04, SEC-05, SEC-06. **Priority:** After urgent containment; prepare independent changes where practical.

Content Security Policy:

1. Inventory inline scripts, inline handlers, JavaScript URLs, CSS behavior, third-party scripts, frames, images, fonts, and network destinations across English/Arabic page types.
2. Prepare an early meta CSP suitable for GitHub Pages. Externalize inline executable code or hash it as appropriate; avoid broad script wildcards, `unsafe-eval`, and blanket `unsafe-inline` for scripts. Constrain other destinations where compatible.
3. Validate the policy locally across representative pages and automatically check coverage across all public HTML, including fallback pages. Meta policies cannot operate in report-only mode, so complete compatibility testing before production enforcement.
4. Preserve navigation, mobile menus, reviews, Maps, analytics, business hours, enquiries, blog modules, and approved redirects. Test edited titles, sitemap eligibility, and contact-number/business-identity guardrails as applicable.

Third-party integrations:

1. Document each vendor, purpose, script URL, account owner, and continuing business requirement. Remove confirmed unused integrations; retain required functionality while constraining its sources.
2. Use integrity hashes or self-hosting for suitable immutable resources with a supported update process. Do not freeze dynamically changing widget/analytics scripts with arbitrary hashes.
3. Record remaining trusted vendors and periodic review ownership. Necessary third-party code remains a trust dependency after these mitigations.

GitHub Actions:

1. Verify supported action releases at implementation time and pin reviewed versions to full commit SHAs. Inspect transitive action dependencies as well.
2. Grant the minimum permissions per job; keep artifact preparation read-only and grant Pages/OIDC permissions only where needed. Disable checkout credential persistence if unnecessary.
3. Add an update process for pinned actions and the artifact/security gates. Confirm workflow changes preserve the existing Pages deployment environment and hosting boundary.

**Closure evidence:** CSP is present and enforced on the intended public pages; required functionality works; prohibited script execution is blocked in a controlled local test; vendor inventory and residual trust are recorded; reviewed action pins and update configuration are present; the first approved workflow run succeeds.

**Residual limitation:** Framing controls such as `frame-ancestors` require an HTTP response header and do not work in a meta CSP. Repository HTML cannot supply that control on the current GitHub Pages setup. Record this as an unresolved low-priority limitation; do not claim it is closed or change hosting/DNS to address it without explicit approval.

## Workstream 4 — Verify service accounts and release closure

**Owners:** Relevant account administrators, with the implementer recording redacted evidence.

Review administrator access, MFA/passkeys, recovery options, deployment permissions, and relevant activity logs in GitHub, Google Cloud, Cloudflare, analytics, and required widget services. Inspect repository protection and deployment settings against the owner's existing direct-publishing workflow; do not impose a different publishing model without agreement. These are verification tasks, not newly confirmed vulnerabilities.

Before publishing, present the prepared diff and validation results. The repository requires explicit user authorization to push; this planning request does not authorize a deployment or account changes. Keep Google Cloud actions, historical data deletion, and any Git history rewrite separately identifiable. Do not request or store credentials in the repository.

After an authorized release, repeat the public-path exposure checks, verify all changed assets and representative English/Arabic flows, and update the finding register with dated evidence. Review subsequent key usage and error reports for regressions or unexplained activity. A rollback must preserve key revocation, the public-file allowlist, and the removal of customer text from analytics.

## Finding coverage and exit gates

| Finding | Required outcome | Completion depends on |
| --- | --- | --- |
| SEC-01: public configuration/artifact | Public exposure removed; key use secured or retired | Repository release plus Google Cloud verification |
| SEC-02: hours injection | Unsafe parsing/rendering path eliminated | Regression checks plus live asset verification |
| SEC-03: enquiry analytics | Future message collection stopped; historical handling reviewed | Code release plus analytics account review |
| SEC-04: browser policy | Feasible CSP enforced; framing limitation explicitly open | Compatibility checks plus live verification |
| SEC-05: vendor trust | Unused code removed where confirmed; required vendors constrained and tracked | Vendor inventory and account verification |
| SEC-06: action dependencies | Reviewed SHA pins, least privilege, and update process | Workflow review and successful approved run |

The target is verified closure of SEC-01/02/03 and feasible remediation or documented mitigation of SEC-04/05/06. Do not label the whole website 90% secure or mark the separate shop/Worker application as audited. Any newly confirmed critical/high issue must be resolved or clearly reported as preventing completion.

## Reference guidance

- [Google Maps Platform security guidance](https://developers.google.com/maps/api-security-best-practices)
- [GitHub Actions secure use reference](https://docs.github.com/en/actions/reference/security/secure-use)
- [MDN frame-ancestors limitations](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
