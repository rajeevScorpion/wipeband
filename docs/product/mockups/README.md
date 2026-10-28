# Mockup index

**Obsolete baseline notice:** Both studies below were built from local app base
f49359f, which was behind the deployed GitHub v2 implementation at cb2e76d.
Do not use either as the current storefront/spec. Local main is now updated;
future studies must capture that v2 version and compare it with the deployment.

## Templates

No frozen template yet. The second landing study uses the actual rendered
homepage as its content source, with a centered 1320px frame and true responsive
phone preview. Freeze only after approval. The first draft was rejected for
changing storefront content/order and for an underdeveloped admin workflow.

| Mockup | Local artifact | Status | Date | Decisions |
|---|---|---|---|---|
| Landing page visual study 02 | [Historical prototype](storefront-operations.html) | Obsolete — stale app baseline | 2026-10-28 | Content audit passed against f49359f, not the newer deployment. Rebuild from v2 before review. |
| Storefront + admin study 01 | [Archived first draft](archive/storefront-operations-v1.html) | Rejected | 2026-10-28 | Storefront content/order must not change. Admin requires a separate, considered operational design. |

The revised artifact embeds the existing page, fonts, logo and the installed
Motion library (MIT notice included). Source media placeholders are preserved;
new SVG artwork is decorative. No new customer-facing text, product, price,
testimonial or claim is introduced. Navigation and commerce requests are paused.

## Source and verification

`src/landing-content-manifest.json` records the captured section text and link
destinations. `src/landing-treatment.css` and `.js` hold only the proposed visual
layer. `src/landing-review.html` is the review frame. The build script captures
the running local homepage on port 3010; it never edits application source.

`src/check-landing-review.cjs` checks exact section/link fidelity in both modes,
visible text, centered layout, pointer motion, motion-off behavior, phone reflow,
reduced-motion preference, page errors and unwanted network requests. Headless
desktop, full-page and phone screenshots were inspected. Production application
build/payment/fulfillment behavior was not changed or retested for this artifact.

Run source scripts with WIPEBAND_PLAYWRIGHT set to an installed Playwright
package path, and optionally WIPEBAND_CHROMIUM to its Chromium executable. A
loopback static server on port 3011 serves this directory for review.
