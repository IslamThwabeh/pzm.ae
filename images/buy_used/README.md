# Buy Used Service: Image Guide

Use this folder for all product photos used by `services/buy-used.html`.

## 1. Required image set

Add these files first (minimum set):

- `used_iphone_16_pro_max_main.webp`
- `used_iphone_15_pro_max_main.webp`
- `used_laptops_collection_main.webp`

Optional expansion set (recommended for better SEO coverage):

- `used_iphone_16_pro_max_grade_a.webp`
- `used_iphone_16_pro_max_grade_b.webp`
- `used_iphone_15_pro_max_grade_a.webp`
- `used_iphone_15_pro_max_grade_b.webp`
- `used_macbook_pro_m3_main.webp`
- `used_macbook_air_m2_main.webp`
- `used_dell_xps_15_main.webp`
- `used_hp_spectre_x360_main.webp`

## 2. Size and technical specs

- Preferred format: `WebP`
- Keep a JPG copy for social/legacy fallback when needed
- Target width: `1600px` for main product images
- Aspect ratio: `4:3` (product cards) or `16:9` (hero/banner)
- Target file size:
	- Main product image: `120KB-260KB`
	- Thumbnail image: `40KB-90KB`
- Color profile: `sRGB`

## 3. Photography standards

- Show real product condition (important for used-device trust)
- Use clean background, soft shadow, and front + angled shots
- Capture at least one close-up for ports/keyboard/body condition
- Avoid heavy filters; keep true-to-condition visuals
- Keep framing consistent across products

## 4. SEO-friendly naming convention

Pattern:

`used-[device]-[model]-[grade]-dubai-[view].webp`

Examples:

- `used-iphone-16-pro-max-grade-a-dubai-front.webp`
- `used-macbook-pro-m3-grade-a-dubai-angle.webp`

Rules:

- lowercase only
- use hyphens, not spaces or underscores
- include intent keywords naturally (`used`, `dubai`, model name)

## 5. Alt text pattern (critical)

Use this formula:

`Used [Device + Model] [Grade] in Dubai - [Condition detail]`

Examples:

- `Used iPhone 16 Pro Max Grade A in Dubai with 92 percent battery health`
- `Used MacBook Air M2 Grade A in Dubai with excellent keyboard and screen condition`

Keep alt text specific, natural, and under ~140 characters.

## 6. Best project integration steps

1. Put finalized images in this folder.
2. Update `services/buy-used.html` image paths from temporary placeholders to these files.
3. Add `width` and `height` attributes on `<img>` tags to reduce layout shift.
4. Keep first product image eager; set lower images to `loading="lazy"`.
5. Add `<image:image>` entries for the new page in `sitemap.xml`.
6. Add/refresh Open Graph image meta for better social preview.

## 7. Reachability checklist (SEO + performance)

- Every service image has descriptive filename + alt text
- No broken image URLs
- Mobile image payload for first screen stays light
- `sitemap.xml` includes buy-used page and image nodes
- Canonical URL remains `https://pzm.ae/services/buy-used.html`
- Google Search Console is re-submitted after deployment

## 8. Upload and verify workflow

1. Upload images.
2. Deploy to GitHub.
3. Open `https://pzm.ae/services/buy-used.html` and hard refresh.
4. Run Rich Results Test and PageSpeed Insights for this page.
5. Re-submit sitemap in Search Console.
