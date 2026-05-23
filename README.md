# pzm.ae

Static website for PZM Computers & Phones Store, hosted on GitHub Pages.

## Phase 1 Operations Pack

Implementation assets for "Foundation And Controls" are in:

- `ops/phase-1-foundation/README.md`
- `ops/phase-1-foundation/publishing-quality-gate.md`
- `ops/phase-1-foundation/pre-publish-checklist.md`
- `ops/phase-1-foundation/post-publish-validation.md`
- `ops/phase-1-foundation/roles-and-rituals.md`
- `ops/phase-1-foundation/baseline-metrics-template.md`
- `ops/phase-1-foundation/weekly-kpi-report-template.md`

## Phase 2 Content Cluster Pack

- `ops/phase-2-content-cluster/README.md`
- `ops/phase-2-content-cluster/cluster-backlog-20-pages.md`
- `ops/phase-2-content-cluster/page-brief-template.md`
- `ops/phase-2-content-cluster/first-5-page-briefs.md`
- `ops/phase-2-content-cluster/sprint-weekly-board.md`

## QA Helper Script

Use this before publishing a new or updated HTML page:

```powershell
.\scripts\qa-page.ps1 -FilePath .\services\buy-used.html
```

The script checks for core on-page SEO and conversion hygiene signals:

1. Canonical tag
2. Robots meta
3. H1
4. JSON-LD block presence
5. WhatsApp suffix `(via pzm.ae)`
6. Phone link
7. Navbar/contact-loader script references
8. Internal link style sanity check

