# Sibani Publishers Website

Single-page flagship site for Sibani Publishers, built as Phase 1 of the full platform described in the master brief. Static HTML/CSS/JS, no build step, no dependencies beyond CDN-hosted Google Fonts.

## Real brand assets in use

The official Sibani brand board, the print-ready wraparound cover PDF for Think Rich, Grow Wise, and four real photographs of Melokuhle were supplied mid-build and are now the source of truth for the site. Nothing below is a placeholder.

- **Palette**: warm brown `#8B6F47`, sand beige `#C2A77C`, creme white `#F5F1EA`, dark brown `#2E2E2E`, taken directly from the brand board.
- **Typography**: Cinzel (headings) and Montserrat (body), per the brand board's typography spec.
- **Logo**: `assets/images/sibani-emblem.png` (transparent, cropped from the brand board for the nav/footer) and `assets/images/sibani-logo-lockup.png` (full mark + wordmark + tagline, used in About).
- **Book cover**: `assets/images/book-cover-front.jpg`, cropped from the actual print-ready wraparound PDF (`Book_cover.pdf`) supplied for this build. `assets/images/book-cover-wraparound.jpg` holds the full back/spine/front for future use (e.g. a Book Detail page). ISBN 978-1-83492-603-2 is now in the JSON-LD and displayed on the catalogue card, both read directly off the real cover.
- **Hero**: `assets/images/hero-briefcase-bmw.jpg`, the real photo of Melokuhle in uniform, briefcase in hand, holding Think Rich, Grow Wise at a BMW dealership. This replaced an earlier abstract Three.js scene once the real signature photo was supplied — an authentic photo of the actual brand statement beats a symbolic 3D stand-in.
- **Field gallery** (Money & Mindset Movement section): three more real photos — the BMW dealership shot, a corporate hand-off photo, and a city-skyline shot — presented as proof-in-the-field photography.
- **Contact email**: sibani.publishers@gmail.com, shown in the Contact section, footer, and `Organization` JSON-LD. Netlify Forms submissions still need a notification rule pointed at this address — set it under the Netlify dashboard's Forms → Notifications (code alone can't configure that).
- **Social links**: TikTok, YouTube, X, and Pinterest chips in the Movement section link to `@trgwcollectives` on each platform. Worth a quick click-through once live to confirm each one resolves.

## What is actually built (Phase 1)

- `index.html` — full flagship home page: hero, About, Catalogue, Five Pocket Wealth System (with an embedded 45s explainer video), Money & Mindset Movement (with field photo gallery), Contact.
- `css/style.css` — complete design system on the real brand tokens, components, responsive breakpoints, reduced-motion handling.
- `js/main.js` — sticky nav, mobile menu, scroll-reveal (IntersectionObserver), magnetic buttons, animated stat counters, contact form category hints. CSS-only drifting dust particles over the hero photo for cinematic texture (`prefers-reduced-motion` disables them).
- SEO: meta description, canonical, Open Graph, Twitter Card, `Organization` and `Book` JSON-LD (now including the real ISBN and cover image URL), `robots.txt`, `sitemap.xml`.
- Accessibility: skip link, visible focus states, `prefers-reduced-motion` support throughout, semantic headings, descriptive alt text on every photo.
- Netlify-ready contact form with honeypot spam field, `thanks.html` success page, enquiry categorised as General / Publishing / Media / Partnerships / Speaking / Rights / Support, all routed to Melokuhle until departmental contacts exist.

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
