# Shared handoff - 2026-11-03

**Current task:** Starter kit redesign mockup is ready for owner review at
http://127.0.0.1:3011/starter-kit-review.html. Owner chose package-first and requested the selected-design preview beside the
choice buttons, clear of the package. Latest revision enlarges the preview on
the left, places the pills on the right, removes redundant selected text, and
shows example sale pricing by default. Reassurance points now spread across
the card and wrap on mobile. The selected-design preview has a magnifying lens
for mouse, touch-and-hold and keyboard. The revised mockup awaits review. Both
options show eight supplied variants, representative packaging, contents as a
list and an optional example $30/$19.95 comparison. Desktop and phone layouts
were screenshot-checked; selection, price toggle and safe mock cart were
simulated. All new assets were converted to embedded WebP for this mockup;
originals remain in ignored image-inbox. New variants, availability, pricing
and checkout support remain unconfirmed. Wait for explicit design approval;
no website code was changed. Local website and mockup servers were left running.

**Previous task:** Owner approved the product video mockup and requested commit
and push. The homepage six-layer panel is replaced by the optimized 1.05 MiB
video, without outer box or controls, with a larger rounded frame and subtle
shadow. It loads near the viewport, loops muted, pauses off screen and respects
reduced motion. Original remains in ignored `image-inbox/Wipeband_Loading.mp4`.
TypeScript, targeted lint, image guard, local HTTP and an isolated 27-page
production build passed; browser visual QA remains unavailable. Check Git for
push state and Hostinger separately for deployment. The owner's port-3000 site
and port-3011 mockup servers were left running. Temporary build copies remain at
`D:/DEV/wipeband-video-build-d2c9a9024ee948e0a79f61f49db77361` and in system
temp, alongside temporary video conversion tools.

**Previous task:** Owner approved implementation of the footer brand-finish
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
