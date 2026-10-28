# Shared handoff - 2026-10-28

**Stopped at:** approved hero implemented, revised artwork/minimal right CSS fade
and synchronized mockup pushed to origin/main at 5bc27a6. Remote hash verified.
Hostinger automatically deploys pushes; deployment outcome has not been checked.

**In flight:** no implementation work. Only main exists. Three untracked owner
image alternatives are preserved under public/assets/sections:
Hero_option_01.png, Hero_option_02.png, Hero_option_02-wider.png.
Checkout documentation committed locally after the last push.
No helpers, timers or monitors. Port-3000 website server stopped with approval;
port-3011 mockup server already stopped. No processes intentionally left running.

**Next session:** owner chose review deployed hero, then plan the next section.
Read CURRENT_STATE.md, WORKING_CONTRACT.md and MEMORY.md. Check current GitHub/
deployment state before design work; do not reuse stale studies 01/02.
Latest mockup/spec: docs/product/mockups/hero-options.html, built from current
production-rendered page/CSS; its generator is src/build-hero-review.cjs.
Hero source: components/sections/HeroSplit.tsx and HeroSplit.module.css.

**Owner to-do:** review Hostinger result; provide next-section assets/direction
as needed. Vercel test URL and Amazon MCF/API readiness remain pending.

**Open:** CURRENT_STATE.md records unfinished payments, fulfillment, admin,
email and demo support/tracking flows. No live payment or fulfillment submitted.
Latest production build passed (27/27); responsive/cart/reduced-motion checks pass.

**How we work:** dark teal, no orange accents. Hero uses replaced wider image,
minimal far-right fade, wave covering bottom edge, product near CTA without
covering the worn wristband. One clean Add to Cart $19.95 action. Desktop mockups
are full width; phone previews may have a frame. Preserve current copy/section
order outside explicit changes. Save shared context; no private-only memories.
Push only with authorization: it triggers Hostinger deployment.

Restart website: npm run dev. Mockup: python -m http.server 3011 --bind 127.0.0.1
--directory docs/product/mockups. Routine cache cleanup is due but not performed.
