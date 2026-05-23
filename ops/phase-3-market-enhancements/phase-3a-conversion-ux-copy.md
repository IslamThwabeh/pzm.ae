# Phase 3A - Conversion UX And CTA Copy

## Objective

Reduce friction between page visit and first WhatsApp message by improving CTA wording, value clarity, and pre-visit action guidance.

## Standalone Mode

This phase can run without any other Phase 3 work.

## Inputs

1. Current EN + AR target pages
2. Existing GA4 click events: pzm_whatsapp_click and pzm_call_click
3. Current WhatsApp CTA links and button labels

## Deliverables

1. Updated primary CTA copy on all target pages
2. Secondary map or visit-intent CTA placed near main CTA
3. Improved WhatsApp prefilled messages (clear ask + stock/price intent)

## Execution Checklist

1. Replace generic CTA labels with stock-plus-price intent language.
2. Add one clear pre-visit instruction block above CTA section.
3. Ensure a map/visit button exists on each page near WhatsApp CTA.
4. Keep WhatsApp suffix in links: (via pzm.ae).
5. Run scripts/qa-page.ps1 on each changed page.

## Suggested CTA Pattern

1. Primary: Get today's stock and price options on WhatsApp
2. Secondary: Open store location

## Definition Of Done

1. All target pages have updated CTA language.
2. No QA failures for changed pages.
3. Click event tracking still fires (spot-check via browser).

## Owner And Effort

1. Owner: Content + Frontend
2. Time: 0.5 to 1 day

## Rollback

Revert only CTA text/URL parameter changes if quality of leads drops sharply after 7 days.
