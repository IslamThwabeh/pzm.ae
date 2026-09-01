# PZM Repository Architecture

These instructions apply to the entire repository.

## Hosting boundaries

- `pzm.ae` is a static site published exclusively from this repository through
  GitHub Pages using `.github/workflows/static.yml`.
- Do not describe or treat `pzm.ae` as a Cloudflare Pages or Workers deployment.
- `shop.pzm.ae` is a separate application published through Cloudflare
  Pages/Workers. Its application source is not part of this repository unless
  the user explicitly provides or identifies it.
- Cloudflare is authoritative DNS for the domain, but that does not mean the
  apex website is hosted by Cloudflare.
- Do not proxy the `pzm.ae` apex through Cloudflare, migrate hosting, or create
  Cloudflare Workers/Pages resources for it without explicit user approval.

## Redirect boundaries

- GitHub Pages cannot emit arbitrary per-path server-side 301 redirects from
  repository HTML.
- For approved legacy `pzm.ae` routes, use a static fallback containing
  `noindex,follow`, a zero-second meta refresh, a canonical link to the final
  live page, and a JavaScript/location link fallback. Exclude it from the
  sitemap.
- Historical fallback filenames may contain a retired or otherwise forbidden
  term only when required to catch an already-known inbound legacy URL. Never
  use such a filename for new indexable content or internal links.
- Handle `shop.pzm.ae` redirects in its separate Cloudflare Pages/Workers
  environment, not by adding storefront routes to this repository.
- The remediation register and runbook are in `ops/seo-404-remediation/`.

## Project guardrails

Read and follow `copilot-instructions.md` before changing site content,
metadata, URLs, schema, sitemap entries, or deployment behavior.
