# Shared handoff - 2026-11-02

**Current task:** Footer brand-finish mockup only, awaiting owner review and
explicit approval before any product code changes. The revised proposal hides
more of the wordmark, subtly lifts it on scroll, halves the faded repeat pattern
and removes the FAQ divider. The SVG W's valleys remain above the clipping edge
in geometry checks across phone and desktop widths; the logo remains partly
hidden at maximum lift. The supplied insignia sits in the footer. Compare Current and
Proposed, Desktop and Phone, and Pattern on/off in
`docs/product/mockups/footer-review.html` or
http://127.0.0.1:3011/footer-review.html. Local preview server PID 8408; owner's
website server on port 3000 was left alone. Capture uses the current local page,
including unpushed work. Script/content/link checks passed; browser visual QA
was unavailable. No app code changed for this mockup.

**Stopped at:** Created `docs/product/mockups/testimonial-review.html` from the
current local homepage for the owner's requested square testimonials and profile
icons. Existing reviews are preserved; two extra cards are explicitly sample
future slots. Desktop/phone and two/four-card controls are included. Generator:
`docs/product/mockups/src/build-testimonial-review.cjs`. Browser preview was
unavailable; syntax and key content checks passed, visual checks remain pending.

**Latest change:** Removed the outer top and bottom lines from the homepage FAQ
accordion, preserving the dividers between questions. Targeted lint and local
HTML checks passed. Check Git status for push state.

**Latest copy edit:** Replaced website-facing em dashes with hyphens throughout
the app, including metadata and buttons. Developer comments and historical
mockup artifacts were left intact. TypeScript, lint and local homepage checks
passed; check Git status for push state.

**Latest layout:** Footer support links now sit below the left-aligned brand
copy, with tighter spacing and a two-row mobile grid. TypeScript, lint and local
HTML checks passed; desktop and phone browser visual review remains pending.

**Images:** Owner originals, including the earlier alternatives, are in local,
Git-ignored `image-inbox/` and are not backed up to GitHub. The site uses WebP
copies. Optimizer tests and guarded production build passed; local HTTP checks
confirmed all three card images are present and served as WebP. Converted images
were visually inspected individually. Browser preview was unavailable, so
desktop and phone rendering still need visual review.

**Implementation:** The assistant implemented the square testimonial cards and
parent avatars prematurely, before mockup approval. The owner said to keep this
implementation but corrected the workflow: a requested or proposed mockup must
remain separate until the owner explicitly approves it. All four avatars have
WebP copies. TypeScript, targeted lint and local HTTP checks passed; browser
visual QA remains outstanding. Check Git status for push state.

**Next step:** Let the owner review the mockup and local page, then continue adding
images as supplied. The owner's port-3000 server was already running and was left
running. A GitHub push triggers Hostinger deployment.

**Open:** CURRENT_STATE.md records unfinished checkout, payment, fulfillment,
email and support flows. Vercel preview and Amazon MCF readiness remain pending.
