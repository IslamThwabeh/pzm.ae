# Phase 3E - Measurement And Weekly Optimization Loop

## Objective

Move from one-time page edits to a weekly performance loop that improves conversions based on data.

## Standalone Mode

This phase can run even if no copy updates are made in the same week.

## Inputs

1. GA4 events (pzm_whatsapp_click, pzm_call_click)
2. Search Console page-level performance for /services/ and /ar/services/
3. Weekly page change log

## Deliverables

1. Weekly dashboard snapshot for target pages
2. One prioritized optimization action per week
3. Monthly summary of what changed and what moved

## Operational Assets

1. Tracker CSV: ops/phase-3-market-enhancements/measurement-loop/weekly-kpi-tracker.csv
2. Weekly runbook: ops/phase-3-market-enhancements/measurement-loop/weekly-ops-checklist.md
3. Monthly summary template: ops/phase-3-market-enhancements/measurement-loop/monthly-summary-template.md

## Data Mapping

1. GA4 event names:
2. pzm_whatsapp_click
3. pzm_call_click
4. GA4 breakdown dimension: page_path
5. Search Console dimensions: page, query (optional for deep dive)
6. Primary page filters: /services/ and /ar/services/

## KPI Set

1. Impressions per page
2. CTR per page
3. WhatsApp click rate per page
4. Call click rate per page
5. Indexed status for newly updated pages

## Weekly Rhythm

1. Monday: collect previous week metrics.
2. Tuesday: identify 1 to 3 highest-impact page changes.
3. Wednesday: implement and QA.
4. Friday: log KPI deltas and decide next iteration.

## Week 0 Baseline Setup

1. Duplicate the 10 template rows in weekly-kpi-tracker.csv for the current week range.
2. Fill impressions, clicks, ctr_pct, and avg_position from Search Console.
3. Fill whatsapp_clicks and call_clicks from GA4 events by page_path.
4. Compute whatsapp_rate_pct and call_rate_pct using page clicks as denominator.
5. Tag status as baseline for all rows before first optimization cycle.

## Definition Of Done

1. Weekly report completed for 4 consecutive weeks.
2. At least one measurable improvement trend appears in conversion KPIs.
3. Underperforming pages are queued with owner and ETA.

## Owner And Effort

1. Owner: Analytics + SEO
2. Time: 1 to 2 hours per week

## Rollback

If KPI movement is noisy, increase observation window to 2 weeks before major copy reversals.
