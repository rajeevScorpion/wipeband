# Shared handoff - 2026-11-02

**Current task:** Owner approved implementation of the footer brand-finish
mockup. The homepage now replaces its closing sales CTA with the sinking
wordmark, faded pattern, subtle scroll lift, footer shadow and insignia. Other
pages retain their existing CTA and footer treatment. Source assets remain in
`image-inbox/`; WebP copies are used by the site. TypeScript, targeted lint,
image guard, local HTTP checks and an isolated 27-page production build passed;
browser visual QA remains pending. The build copy was moved to system temp after
automatic review blocked deleting its directory. The approved mockup remains at
`docs/product/mockups/footer-review.html`; its local server is PID 8408 on port
3011. The owner's website server on port 3000 was left alone.

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
