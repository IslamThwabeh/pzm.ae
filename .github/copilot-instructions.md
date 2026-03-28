# PZM.ae – Project Guidelines

## Overview
Static HTML website for PZM Computers & Phones Store in Al Barsha, Dubai.
Hosted on GitHub Pages at **pzm.ae**. No server-side rendering or build step for the HTML pages.

## Site Structure (21 HTML pages)

```
index.html                  # Homepage
blog.html / blog-post.html  # Blog listing & post
services/
  index.html                # "Our Services" hub
  buy-iphone.html           # New iPhone models (iPhone 17 line)
  buy-used.html             # Used device inventory (phones, laptops, tablets, PCs, monitors)
  brand-new.html            # Brand new devices inventory
  repair.html               # Repair services
  gaming-pc.html            # Custom gaming PC builds
  sell-gadgets.html         # Sell/trade-in your gadgets
  accessories.html          # Accessories
  secondhand.html           # Redirect → buy-used.html (noindex)
areas/
  index.html                # "Areas We Serve" hub
  al-barsha.html            # + 8 neighborhood landing pages
  al-quoz.html
  dubai-marina.html
  emirates-hills.html
  jbr.html
  jumeirah.html
  jumeirah-village.html
  tecom.html
```

## Key Conventions

- **Links**: Always use `.html` extension for internal links (GitHub Pages static hosting).
- **Header**: Uses `<p>` for the tagline (not `<h1>`). Each page has a unique `<h1>` in content. CSS selector: `.header-text p`.
- **Contact section**: Loaded dynamically via `js/contact-loader.js` from `components/contact.html`. Area pages must use `id="contact-section"` (not `id="contact"`).
- **Store hours**: Rendered by `js/store-status.js`.
- **FAQ widget**: Elfsight (id `elfsight-app-f5d197a3-7325-43ff-a3fa-787de403682f`) — configured externally, not in repo.
- **WhatsApp**: All links use `wa.me/971528026677` with `?text=` prefilled messages ending in `(via pzm.ae)`.

## SEO

- All 20 pages have: title (<60 chars), meta description (<155 chars), meta keywords (bilingual AR+EN), canonical URL, Open Graph, Twitter Cards, meta robots.
- JSON-LD schema on: index, brand-new, buy-used, buy-iphone, all 8 area pages.
- Dual GA4: `G-NSJ08ST3JL` + `G-KYVRVKG3MZ`.
- Sitemap: `sitemap.xml` in root.

## Assets

- **CSS**: `css/` folder — `main.css` (global), plus page-specific files (`buy-used.css`, `buy-iphone.css`, etc.).
- **JS**: `js/` folder — `header.js`, `hero-slider.js`, `slider.js`, `contact-loader.js`, `store-status.js`, `blog.js`, `blog-post.js`, `newsletter.js`.
- **Images**: `images/` — organized by category (`Header/`, `Services/`, `Catigories/`, `buy_iphone/`, `buy_used/`, `blog/`).

## Limitations

- No server-side headers (HSTS, CSP, etc.) — GitHub Pages restriction.
- No cache-control headers — GitHub Pages restriction.
- `rg` (ripgrep) not available in terminal; use workspace search tools or PowerShell.

## Performance — Do NOT Attempt

The mobile PageSpeed score (~70) is limited by third-party scripts (Elfsight, dual GA4) and GitHub Pages caching constraints. These optimizations were **tested and proven ineffective** — do not retry:

- Removing or reducing the hero slider (13 slides) — score unchanged, hurt desktop UX.
- Deferring CSS files — no measurable FCP improvement.
- Converting images to WebP — negligible savings (images are already small).

**Why 70 is acceptable**: Google ranks using real user data (CrUX), not lab scores. PZM has no CrUX data = no penalty. CLS is 0 (perfect). Structured data, content quality, and mobile-friendliness matter far more than chasing PageSpeed points.

**What actually improves Google visibility**: Product schema (prices, reviews, ratings), proper JSON-LD, content relevance, and correct `.html` links.

## React / Vite App (src/)

A secondary React+TypeScript app exists under `src/` using Vite, TanStack Router, Tailwind, and Supabase. It is separate from the main static HTML site. `tsconfig.app.json` uses `"jsx": "react-jsx"` (no React import needed in components).
