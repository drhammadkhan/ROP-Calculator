# ROP Screening Window Calculator

A web version of the RCPCH *ROP Screening Window Calculator* (v3.2, October 2024), implementing the revised 2024 UK
[Screening of Retinopathy of Prematurity (ROP) clinical guideline](https://www.rcpch.ac.uk/resources/screening-retinopathy-prematurity-rop-clinical-guideline).

A tool from the [Evelina Neonatal Data Group](https://drhammadkhan.github.io/evelina-neonatal-data-group/).

Static site: no build step, no dependencies, nothing leaves the browser. Open `index.html`. Fonts (Fraunces and DM Mono, SIL Open Font License) are self-hosted in `fonts/`.

- `rop.js` – the calculation (port of the spreadsheet formulas)
- `index.html` – the UI
- `tests/` – `node tests/test_rop.js` checks 1,029 cases against the original spreadsheet formulas recalculated in LibreOffice

**Intended purpose:** calculates the dates of the screening window from the dates and gestational age entered, following the RCPCH guideline, for reference. The clinician decides when to screen. Results are indicative only and must not replace guidance from qualified medical professionals. Not an official RCPCH product.
