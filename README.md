# ROP Screening Window Calculator

A web version of the RCPCH *ROP Screening Window Calculator* (v3.2, October 2024), implementing the revised 2024 UK
[Screening of Retinopathy of Prematurity (ROP) clinical guideline](https://www.rcpch.ac.uk/resources/screening-retinopathy-prematurity-rop-clinical-guideline).

Static site: no build step, no dependencies, nothing leaves the browser. Open `index.html`.

- `rop.js` – the calculation (port of the spreadsheet formulas)
- `index.html` – the UI
- `tests/` – `node tests/test_rop.js` checks 1,029 cases against the original spreadsheet formulas recalculated in LibreOffice

**Disclaimer:** results are indicative only and must not replace guidance from qualified medical professionals. Not an official RCPCH product.
