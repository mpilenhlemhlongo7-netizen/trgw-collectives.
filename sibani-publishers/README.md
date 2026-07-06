# Sibani Publishers Website

Single-page flagship site for Sibani Publishers, built as Phase 1 of the full platform described in the master brief. Static HTML/CSS/JS, no build step, no dependencies beyond CDN-hosted Google Fonts.

## Real brand assets in use

The official Sibani brand board, the print-ready wraparound cover PDF for Think Rich, Grow Wise, and four real photographs of Melokuhle were supplied mid-build and are now the source of truth for the site. Nothing below is a placeholder.

- **Palette**: warm brown `#8B6F47`, sand beige `#C2A77C`, creme white `#F5F1EA`, dark brown `#2E2E2E`, taken directly from the brand board.
- **Typography**: Cinzel (headings) and Montserrat (body), per the brand board's typography spec.
- **Logo**: `assets/images/sibani-emblem.png` (transparent, cropped from the brand board for the nav/footer) and `assets/images/sibani-logo-lockup.png` (full mark + wordmark + tagline, used in About).
- **Book cover**: `assets/images/book-cover-front.jpg`, cropped from the actual print-ready wraparound PDF (`Book_cover.pdf`) supplied for this build. `assets/images/book-cover-wraparound.jpg` holds the full back/spine/front for future use (e.g. a Book Detail page). ISBN 978-1-83492-603-2 is now in the JSON-LD and displayed on the catalogue card, both read directly off the real cover.
- **Hero**: `assets/video/hero-loop.mp4`, a cinematic 3D/motion hero loop generated with HyperFrames (sunburst glow, drifting particles, warm brand-toned gradient), replacing the earlier hero photo per Melokuhle's direction. `assets/video/hero-loop-poster.jpg` holds the frame while the video loads, and pauses to that frame under `prefers-reduced-motion`.
- **Field gallery** (Money & Mindset Movement section): four real photos — the BMW dealership shot, a corporate hand-off photo, a city-skyline shot, and Melokuhle at King Shaka International Airport — presented as proof-in-the-field photography.
- **Contact email**: sibani.publishers@gmail.com, shown in the Contact section, footer, and `Organization` JSON-LD. Netlify Forms submissions still need a notification rule pointed at this address — set it under the Netlify dashboard's Forms → Notifications (code alone can't configure that).
- **Social links**: only the accounts Melokuhle actually runs — TikTok, YouTube, Instagram, and LinkedIn, all `@trgwcollectives` — in the Movement section and the `Organization` JSON-LD `sameAs`. X and Pinterest were removed since those accounts don't exist.

## What is actually built (Phase 1)

- `index.html` — full flagship home page: hero, About, Catalogue, Five Pocket Wealth System (with an embedded 45s explainer video), Money & Mindset Movement (with field photo gallery), Contact.
- `css/style.css` — complete design system on the real brand tokens, components, responsive breakpoints, reduced-motion handling.
- `js/main.js` — sticky nav, mobile menu, scroll-reveal (IntersectionObserver), magnetic buttons, animated stat counters, contact form category hints. CSS-only drifting dust particles over the hero photo for cinematic texture (`prefers-reduced-motion` disables them).
- SEO: meta description, canonical, Open Graph, Twitter Card, `Organization` and `Book` JSON-LD (now including the real ISBN and cover image URL), `robots.txt`, `sitemap.xml`.
- Accessibility: skip link, visible focus states, `prefers-reduced-motion` support throughout, semantic headings, descriptive alt text on every photo.
- Netlify-ready contact form with honeypot spam field, `thanks.html` success page, enquiry categorised as General / Publishing / Media / Partnerships / Speaking / Rights / Support, all routed to Melokuhle until departmental contacts exist.

## Shop — Think Rich, Grow Wise + Publishing Services

`shop.html` and `checkout.html` add a real, working storefront on top of the static site — no backend, no third-party sign-up required to start selling today.

- **Products** (`js/store-config.js`): Second Edition R450, First Edition (A6 Print) R250 — the two prices Melokuhle confirmed. Add/remove services or change prices in one place; both `shop.html` and the homepage Catalogue card read from this file.
- **Publishing Services**: the six real enquiry categories (Publishing, Media, Partnerships, Speaking, Rights, Support) presented as service cards on the Shop page. Each is quote-based, not fixed-price — deliberately, since inventing service pricing would violate the "verified figures only" standard. "Get a Quote" deep-links to `index.html?enquiry=<category>#contact`, which pre-selects that category in the existing contact form (see the `?enquiry=` handling added to `js/main.js`).
- **Cart** (`js/cart.js`): a localStorage-backed cart shared across all three pages via a slide-in drawer, with a live badge on the nav cart icon everywhere.
- **Checkout** (`checkout.html` + `js/checkout.js`): buyer details + delivery address, an auto-generated order reference (`SIB-YYYYMMDD-####`), and a payment step.
- **Payment — live today**: direct-to-Capitec. Melokuhle's real account (Mr. Melokuhle M. Mhlongo, Capitec Savings, acc. 2368365415, branch 470010) is in `js/store-config.js` and shown on the order confirmation screen along with the reference to quote. No merchant sign-up, no KYC wait — this works the moment the site is live. An optional instant "Capitec Pay" cellphone-number field is stubbed in the same config for later.
- **Payment — upgrade path, not yet active**: a PayFast redirect integration is fully wired in `js/checkout.js` (`SibaniCheckout.submitToPayFast`) for automated card / Instant EFT, which settles to any SA bank account including Capitec. It stays off (`payfast.enabled: false` in `store-config.js`) until Melokuhle opens a free merchant account at payfast.co.za and pastes in `merchantId`/`merchantKey` — that sign-up needs his own ID and banking details, so it can't be completed on his behalf.
- **Order notification**: since this is a static site with no backend, there's no automatic order database. On "Place Order," an "Email Order to Sibani" button opens a pre-filled `mailto:` to sibani.publishers@gmail.com with the full order details — the buyer sends it in one click after seeing the payment instructions.
- **No fabricated shipping rates**: delivery/collection cost isn't charged at checkout since no real courier pricing was supplied; the order total is book price only, with a note that delivery is arranged directly with Sibani afterward.

## What is deliberately NOT built yet, and why

The master brief asks for a full multi-page CMS platform (Authors, individual Book Detail pages, News, Blog, Events, Resources, Media gallery, future store/learning platform/donor portal). That needs a backend and a framework (most likely Next.js + a headless CMS) — a static single page cannot support "unlimited books, unlimited authors, future store" without one. That is scoped as a separate, larger engagement, not a single-session addition to a static site. Per CLAUDE.md's Missing Assets Protocol, the architecture here (design tokens, component classes) is built to extend into that Phase 2 cleanly rather than blocking on it.

## Verified facts only

Every statistic and claim on this page comes from CLAUDE.md's verified proof points or the real cover/photos supplied: 283 pages / 57,148 words / 21 chapters / 6 Parts (Second Edition), ISBN 978-1-83492-603-2, BMW and Audi Park as corporate buyers, TVET Amajuba engagement, Northern Natal News and The Citizen coverage, Draft2Digital international distribution. Nothing is invented. Future titles are marked "In Development" / "Coming Soon" with no fabricated release dates. Field gallery captions describe only what is visibly true in each photo — no company names or claims beyond what's confirmable.

## Deploying

The Netlify project already exists: **sibani-publishers** (site id `669108d6-4c98-493b-a100-6297dd1d3077`), live at `https://sibani-publishers.netlify.app`. To push a new deploy:

1. Pull the latest `sibani-publishers/` folder from this repo (branch `claude/create-claud-md-0y5cec`) — either `git pull` a local clone, or download it as a ZIP from GitHub's **Code → Download ZIP** on that folder.
2. Go to `app.netlify.com/projects/sibani-publishers` → **Deploys**.
3. Drag the `sibani-publishers` folder (the one with `index.html` directly inside it) onto the drop area. Netlify uploads and publishes in about 10–20 seconds.
4. Confirm the deploy under **Forms** in the dashboard — Netlify should auto-detect the `data-netlify="true"` contact form on this deploy. If a submission doesn't show up under Forms after a real test, the form needs re-registering (redeploy usually fixes it).

Same drag-and-drop pattern as `matrix-webworks/`. A CLI/API deploy is also possible via the Netlify MCP connector, but it requires exposing a live auth token in a shell command — not done from an agent session for security reasons; run it yourself if preferred.

## Open item carried from CLAUDE.md

"Five Pocket Wealth System" is used throughout per CLAUDE.md's primary naming, but the file flags this as unconfirmed against "Five Pocket Money System" — resolve before this copy is considered final.

## Assets folder

```
assets/images/
  sibani-emblem.png            transparent mark, nav + footer
  sibani-logo-lockup.png       full lockup with tagline, About section
  book-cover-front.jpg         front cover only, catalogue card
  book-cover-wraparound.jpg    full back/spine/front, held for a future Book Detail page
  hero-briefcase-bmw.jpg       signature hero photo
  proof-corporate-handoff.jpg  field gallery
  proof-city-skyline.jpg       field gallery
  proof-event-banner.jpg       held for future media/press page, not currently placed

assets/video/
  five-pocket-wealth-system.mp4         45s TRGW explainer reel, embedded in the Five Pocket Wealth System section
  five-pocket-wealth-system-poster.jpg  static poster frame shown before playback
```
