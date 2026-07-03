# Matrix WebWorks Website

Single-file static website for Matrix WebWorks, the design and digital services venture in the Njomane Empires ecosystem.

## What is inside

- `index.html` contains the full site: markup, styles and the value estimator script. No build step, no dependencies, no hosting cost requirements.

## Key sections to maintain

| Section | Where | Notes |
|---|---|---|
| Package pricing | `#packages` cards | Launch pricing; update the `R` amounts in the cards and keep them in sync with the estimator |
| Estimator pricing | `data-mww` and `data-mkt` attributes in `#estimator` | `data-mww` is the Matrix WebWorks price in rand; `data-mkt` is the comparable agency value in USD |
| Exchange rate | `ZAR_PER_USD` in the script | Update periodically so the rand conversion stays honest |
| Market value cap | `MARKET_CAP_USD` in the script | Currently 30000 |
| Contact email | `mailto:` links in `#contact` and the estimator script | Swap for a business address when one exists |

## Free hosting options

1. **GitHub Pages:** enable Pages on this repository and point it at the `matrix-webworks` folder (or copy the folder to a dedicated repo).
2. **Netlify:** drag-and-drop the folder or connect the repo; free tier is sufficient.

## Brand note

Matrix WebWorks does not yet have a locked palette in the brand architecture. This site uses a proposed deep navy and electric cyan scheme, deliberately distinct from Sibani Publishers (navy, cream, gold) and the TRGW series (navy, lime, orange). Confirm or replace before wide promotion.
