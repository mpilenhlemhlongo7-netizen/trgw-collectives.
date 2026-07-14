# Matrix WebWorks Website

Single-file static website for Matrix WebWorks, the design and digital services venture in the Njomane Empires ecosystem.

## What is inside

- `index.html` is the full site: markup, styles, SEO metadata (Open Graph, JSON-LD ProfessionalService schema), the value estimator script and a Netlify lead-capture form. No build step, no dependencies.
- `thanks.html` is the form success page.
- `robots.txt` and `sitemap.xml` cover search engine crawling.

## Hosting

The site is set up for Netlify project **matrix-webworks** (site id `7013d655-fcdd-4e95-a1f2-172e80bf1621`), live URL `https://matrix-webworks.netlify.app/`. Forms are enabled on the project; submissions appear under Forms in the Netlify dashboard and can be forwarded to email via a form notification (Netlify dashboard, Forms, Notifications).

To deploy manually: drag and drop this folder at https://app.netlify.com/projects/matrix-webworks under Deploys.

## Key sections to maintain

| Section | Where | Notes |
|---|---|---|
| Package pricing | `#packages` cards | Launch pricing; update the `R` amounts in the cards and keep them in sync with the estimator |
| Estimator pricing | `data-mww` and `data-mkt` attributes in `#estimator` | `data-mww` is the Matrix WebWorks price in rand; `data-mkt` is the comparable agency value in USD |
| Exchange rate | `ZAR_PER_USD` in the script | Update periodically so the rand conversion stays honest |
| Market value cap | `MARKET_CAP_USD` in the script | Currently 30000 |
| Contact details | `#contact` section, footer, estimator script | Email Mtrix.webs@gmail.com, WhatsApp 067 304 1992 (wa.me/27673041992) |

## Free hosting options

1. **GitHub Pages:** enable Pages on this repository and point it at the `matrix-webworks` folder (or copy the folder to a dedicated repo).
2. **Netlify:** drag-and-drop the folder or connect the repo; free tier is sufficient.

## Brand note

Matrix WebWorks palette: deep ink-purple base with electric violet and magenta gradient accents (`#0c0714`, `#a56bff`, `#ff5ec4`). Deliberately distinct from Sibani Publishers (navy, cream, gold), the TRGW series (navy, lime, orange) and Little Thinkers (sky blue, yellow, coral). Add to the brand architecture table in CLAUDE.md once formally adopted.
