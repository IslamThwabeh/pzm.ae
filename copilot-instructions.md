Project Memory & Guardrails for P Z M Computers & Mobile Phones
🔴 MANDATORY RULE 1: Exact Business Name

The official, legally‑verified business name is EXACTLY:
P Z M Computers & Mobile Phones - Sell New Used PC Build

    This MUST appear verbatim in: <title>, <h1>, footer, Open Graph, Twitter Cards, JSON‑LD name, meta description, and all visible text.

    NEVER shorten it to "PZM", "P Z M Mobile", "PZM Computers", or any other variant.

    The hyphen between Phones and Sell has a space on both sides: - Sell.

    If any existing page, schema, crawler file, script, or metadata contains "P Z M Computers & Mobile Phones -Sell New Used PC Build", normalize it to "P Z M Computers & Mobile Phones - Sell New Used PC Build".

🔴 MANDATORY RULE 2: Forbidden Terminology

The following words are BANNED from ALL content, image filenames, and URLs:

    repair → Use care instead (e.g., laptop-care)

    fix → Use restore or service instead

    technical support → Use in‑store assistance or help

    service center → Use store assistance or simply store

Exceptions: These words are NOT allowed anywhere, including:

    Page titles, headings, body text, alt text.

    Image file names (e.g., repair_services.jpg is forbidden).

    URLs (e.g., /services/iphone-repair.html is forbidden – use -care-).

    JSON‑LD description or image fields.

🔴 MANDATORY RULE 3: Geographic Focus – Al Barsha ONLY

The ONLY location mentioned on the entire site must be Al Barsha.

    NEVER mention: Al Quoz, Dubai Marina, Emirates Hills, JBR, Jumeirah, Jumeirah Village, Tecom, Marina, JLT, JVC, JVT.

    The physical address is: Union Coop Hypermarket, Hessa Street, Al Barsha, Dubai, UAE.

    All "area" references must point exclusively to /areas/al-barsha.html.

🔴 MANDATORY RULE 4: URL Conventions

    All service URLs must use -care- (e.g., /services/iphone-care-al-barsha.html).

    NEVER create new URLs containing -repair- or -fix-.

    Blog slugs must also avoid these terms (e.g., macbook-care-or-replace not macbook-repair).

🔴 MANDATORY RULE 5: Schema / JSON‑LD Standards

Every ComputerStore or LocalBusiness schema MUST contain:

    "addressLocality": "Al Barsha" (NEVER "Dubai" as the locality – Dubai is the region, but locality must be Al Barsha).

    "openingHoursSpecification" with Thursday closed:
    json

    { "dayOfWeek": "Thursday", "opens": "00:00", "closes": "00:00", "description": "Closed" }

    areaServed, alternateName, additionalName, brand, and legalName are FORBIDDEN – remove them if they appear.

🔴 MANDATORY RULE 6: Visible Plain‑Text Facts

The following facts MUST appear as visible HTML text (not just in schema) on the homepage, About page, and Contact page:

    6-month warranty

    10 AM – 11 PM

    Thursday closed

    Union Coop Hypermarket

    Hessa Street, Al Barsha

🔴 MANDATORY RULE 7: AI Crawler Compliance

    robots.txt must explicitly ALLOW: GPTBot, OAI-SearchBot, Googlebot, PerplexityBot.

    llms.txt must exist at the root and contain the exact business name, address, phone, WhatsApp, hours, and 6‑month warranty.

    sitemap.xml must be regenerated whenever new pages are added or old ones removed – it must NOT contain deleted district URLs or old -repair- routes.

🔴 MANDATORY RULE 8: Verification Guardrails

    Verification scripts MUST exclude copilot-instructions.md from banned-word, old-district, old-route, and old-brand scans because this file intentionally documents forbidden examples.

    Do not run blind global replacements for repair, fix, technical support, or service center. Inspect page text, URLs, JSON-LD, image filenames, scripts, sitemap entries, and internal links separately before editing.

    Thursday closed schema should be accepted in this exact form:
    json

    { "dayOfWeek": "Thursday", "opens": "00:00", "closes": "00:00", "description": "Closed" }

    Do NOT require "opens": "Closed" or "closes": "Closed" in JSON-LD checks.

    The Contact page working-hours display is controlled by /js/store-status.js. It fetches https://pzm-business-hours.islam-thwabeh.workers.dev/hours and falls back to local hardcoded hours. The website does not directly scrape Google Maps or Google Business Profile from the browser.

    Known cleanup risk to check before production: old image references such as macbook_repair_alternative.jpg must not appear in HTML, JSON-LD, scripts, sitemap, or image paths.

✅ When Creating New Content

    New blog post? Check the slug for repair/fix – rename to care/service.

    New service page? Use the exact naming pattern: [device]-care-al-barsha.html.

    New image? Name it with care or service, never repair or fix.

    New internal link? Verify it does NOT point to a deleted district or old -repair- URL.

🚫 NEVER DEVIATE FROM THESE RULES

If you are unsure about any wording, routing, or schema field, ask the user or reference this file. Do not invent new branding, locations, or service names that conflict with these rules.
