# Sibani Publishers Website

Single-page flagship site for Sibani Publishers, built as Phase 1 of the full platform described in the master brief. Static HTML/CSS/JS, no build step, no dependencies beyond CDN-hosted Three.js and Google Fonts.

## What is actually built (Phase 1)

- `index.html` — full flagship home page: hero, About, Catalogue, Five Pocket Wealth System, Money & Mindset Movement, Contact.
- `css/style.css` — complete design system: colour tokens, type scale (Cormorant Garamond / Inter / Manrope), components, responsive breakpoints, reduced-motion handling.
- `js/scene.js` — cinematic Three.js hero: gradient sunrise sky, procedural skyline silhouette, receding road, drifting dust particles, animated birds, mouse/scroll parallax. Falls back to a static CSS gradient if WebGL is unavailable or `prefers-reduced-motion` is set.
- `js/main.js` — sticky nav, mobile menu, scroll-reveal (IntersectionObserver), magnetic buttons, animated stat counters, contact form category hints.
- SEO: meta description, canonical, Open Graph, Twitter Card, `Organization` and `Book` JSON-LD, `robots.txt`, `sitemap.xml`.
- Accessibility: skip link, visible focus states, `prefers-reduced-motion` support throughout (3D scene, scroll reveals, smooth scroll all degrade to instant/static), semantic headings, alt text on the emblem placeholder.
- Netlify-ready contact form with honeypot spam field, `thanks.html` success page, enquiry categorised as General / Publishing / Media / Partnerships / Speaking / Rights / Support, all routed to Melokuhle until departmental contacts exist.

## What is deliberately NOT built yet, and why

The master brief asks for a full multi-page CMS platform (Authors, individual Book Detail pages, News, Blog, Events, Resources, Media gallery, future store/learning platform/donor portal) plus a photorealistic rigged 3D human character in the hero. Building that honestly requires:

1. **A real logo and cover art file.** Neither exists in this repo. The hero emblem and the Think Rich, Grow Wise cover are typographic placeholders (`S.` mark, navy/gold card) built to swap out the moment real assets are supplied — not a redesign of a logo that doesn't yet exist here.
2. **A modelled/rigged 3D character or a 2D illustration asset for the boy in uniform.** Hand-authored Three.js cannot conjure a photorealistic animated human without a source model. The hero instead renders the *environment* of the story — road, sunrise, skyline, dust, birds — cinematically, per the "symbolic scene" direction agreed before build.
3. **A backend/CMS.** A static single page cannot support "unlimited books, unlimited authors, future store" without a database and a framework (Next.js + a headless CMS, most likely). That is a separate, larger engagement, not a single-session addition to a static site.

## Extending to Phase 2

The design system in `style.css` (colour tokens, type scale, component classes) is written to extend cleanly into new pages — a Book Detail template, an Authors page, a News/Blog index — once there is real content to put in them. Recommend scoping that as its own project once cover art, additional titles, and a hosting/CMS decision exist.

## Verified facts only

Every statistic and claim on this page comes from CLAUDE.md's verified proof points: 283 pages / 57,148 words / 21 chapters / 6 Parts (Second Edition), BMW and Audi Park as corporate buyers, TVET Amajuba engagement, Northern Natal News and The Citizen coverage, Draft2Digital international distribution. Nothing is invented. Future titles are marked "In Development" / "Coming Soon" with no fabricated release dates.

## Deploying

Same pattern as `matrix-webworks/`: drag-and-drop the folder to Netlify, or connect this repo and set the publish directory to `sibani-publishers`. Forms work automatically once Netlify detects the `data-netlify="true"` form on deploy.

## Open item carried from CLAUDE.md

"Five Pocket Wealth System" is used throughout per CLAUDE.md's primary naming, but the file flags this as unconfirmed against "Five Pocket Money System" — resolve before this copy is considered final.
