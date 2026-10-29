# Homepage channel restoration — 29 October 2026

The user approved restoring the previous WhatsApp channel popup because channel growth is a priority for the business owner. The English and Arabic homepages now qualify for the existing popup again. Its appearance, wording, 2.5-second delay, close controls, session dismissal, destination and analytics events are unchanged. Other page eligibility rules are unchanged.

A permanent channel link is also available beneath the eight product/service cards in each language. It points to the offers channel, while the existing store-chat links continue to open the store conversation.

The homepages reference the new versioned navbar asset `navbar-773f41ee.js`; the source, existing deployed aliases and asset manifest are synchronized. Homepage sitemap dates are 2026-10-29.

The inventory itself is unchanged. The QA script's stale October 24 counts were updated to the current October 25 inventory: 17 brand-new and 87 pre-owned listings, with 95 priced merchant-feed entries.

## Validation

- English and Arabic, 1440px desktop and 390px mobile: popup opens and fits the viewport.
- Both popup and permanent links point to the approved channel URL.
- Keyboard focus stays in the dialog. Escape and Maybe Later dismiss it.
- Dismissal restores scrolling and suppresses the popup on reload for the current session.
- Page, asset, contact number, launch-page, inventory parity and sitemap checks pass.

Browser regression check: open a locally served homepage with Playwright CLI, then run `playwright-cli run-code --filename scripts/check-whatsapp-channel.js`. Run this in an isolated browser session because it sets and clears that session's popup-dismissal value.

## Image review

The local homepages use a mixed set combining the older iPhone finishes, MacBook product artwork and PC valuation image with selected current category images and two new workshop-style adaptations without people or hands. This implements the user's approval of the mixed approach and subsequent publication request.

The two adaptations were generated with the built-in image generation tool using the older iPhone service and custom-PC images as references. Their original outputs remain in the local generated-image library. Final responsive WebP files are in `images/home/2026-10-29/`; the complete selection and generation prompts are in `ops/homepage-images/2026-10-29-mixed-set.json`. Desktop/mobile review screenshots are in the ignored `output/playwright/home-mixed-review/` folder. The approved update is published through the existing GitHub Pages workflow.
