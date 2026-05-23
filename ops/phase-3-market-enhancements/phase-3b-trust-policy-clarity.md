# Phase 3B - Trust And Policy Clarity

## Objective

Increase buyer confidence by adding transparent, truthful condition and policy language that matches real store operations.

## Standalone Mode

This phase can run independently after baseline QA checks.

## Inputs

1. Actual return/warranty policy used in-store
2. Current condition and quality text on target pages
3. Existing contact and service scripts

## Deliverables

1. Standard trust block on all target pages
2. Clear condition grading explanation (simple and consistent)
3. Policy wording aligned with real operations only

## Execution Checklist

1. Add a trust block near top content section with 3 factual bullets.
2. Add condition guidance section (for example: cosmetic condition + battery clarity + test-before-buy option).
3. Add policy note with only verifiable claims.
4. Remove or avoid unsupported claims.
5. Run scripts/qa-page.ps1 on each changed page.

## Guardrails

1. Do not publish warranty duration unless confirmed by operations.
2. Do not claim original parts guarantee unless verifiable for relevant category.
3. Keep language specific but legally safe.

## Definition Of Done

1. Every target page has trust and policy clarity section.
2. Policy language is approved by owner.
3. QA passes on all changed pages.

## Owner And Effort

1. Owner: Operations + Content
2. Time: 1 day

## Rollback

If policy disputes increase, reduce claim scope to neutral factual wording and re-publish.
