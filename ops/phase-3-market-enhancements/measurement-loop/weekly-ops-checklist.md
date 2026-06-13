# Weekly Optimization Checklist (Phase 3E)

## Scope

Track and optimize these 10 pages weekly:

1. /services/used-macbook-air-dubai.html
2. /services/used-macbook-pro-dubai.html
3. /services/used-business-laptops-dubai.html
4. /services/student-laptops-dubai.html
5. /services/gaming-laptops-dubai.html
6. /ar/services/used-macbook-air-dubai.html
7. /ar/services/used-macbook-pro-dubai.html
8. /ar/services/used-business-laptops-dubai.html
9. /ar/services/student-laptops-dubai.html
10. /ar/services/gaming-laptops-dubai.html

Secondary timely cluster to watch from June 13, 2026 through the World Cup final weekend:

1. /blog/world-cup-2026-dubai-home-watch-party-tech-setup/
2. /blog/world-cup-2026-phone-checklist-dubai-fans/
3. /blog/world-cup-2026-schedule-uae-time-dubai-tech-checklist/
4. /blog/best-tv-soundbar-projector-world-cup-2026-dubai/
5. /blog/stop-buffering-world-cup-2026-live-streams-dubai/
6. Arabic equivalents under /ar/blog/.

World Cup update triggers:

1. If a page gets impressions for a team + "UAE time" or "Dubai time", add a short fixture/result refresh block.
2. If a query includes "today", "next match", "expected match", "final", or "knockout", update the schedule page first.
3. If queries mention buffering, live stream, TV, soundbar, projector, charger, or power bank, update the matching support article and strengthen links to accessories or repair.
4. Do not publish score/result claims until verified from an official or clearly reliable source.

## Monday - Collect Baseline

1. Open Search Console Performance report.
2. Filter pages to /services/ and /ar/services/.
3. Export weekly data for impressions, clicks, CTR, and average position.
4. Open GA4 and pull event data for:
5. pzm_whatsapp_click
6. pzm_call_click
7. Break down by page_path.
8. Fill ops/phase-3-market-enhancements/measurement-loop/weekly-kpi-tracker.csv for all 10 pages.

## Tuesday - Prioritize Changes

1. Mark pages with one or more of these triggers:
2. Impressions >= 100 and CTR < site average for laptop pages.
3. CTR stable but whatsapp_rate_pct and call_rate_pct both low.
4. Ranking dropped by >= 2 positions week-over-week.
5. Pick 1 to 3 pages maximum for changes this week.
6. Define exactly one primary action per page (CTA wording, internal links, trust copy, or section clarity).

## Wednesday - Execute And QA

1. Apply selected copy or structure updates.
2. Run scripts/qa-page.ps1 on changed pages.
3. Log changes in the tracker under phase_change_this_week and next_action.
4. Commit and push with a phase/week label.

## Friday - Review Deltas

1. Compare new week vs previous week for each changed page.
2. Record directional movement:
3. CTR up/down/flat
4. whatsapp_rate_pct up/down/flat
5. call_rate_pct up/down/flat
6. Keep winners for another week.
7. Rework only pages with no movement after 2 cycles.

## Guardrails

1. Change small batches only (1 to 3 pages weekly) to preserve signal quality.
2. Do not change all EN and AR pages in the same week unless a critical fix is required.
3. Keep WhatsApp suffix format unchanged: (via pzm.ae).
4. Preserve canonical, JSON-LD, and internal .html link style.
