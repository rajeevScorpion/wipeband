# Wipeband current state

Updated: 2026-10-28 (Asia/Kolkata). Usage: unknown.
Last pushed: 5bc27a6 on main, verified against GitHub. Checkout notes committed locally afterward.

## Summary

Existing Next.js 14 / React 18 storefront for Wipeband wristbands and tissue
refills. GitHub main integrates the client-feedback/checkout implementation
(f682182, cb2e76d), shared Studio Method tooling, approved dark-teal corrections,
and the completed hero redesign. Earlier studies 01/02 used stale base f49359f;
they are historical and must not be reused as the current baseline.

## Completed and pushed

- Shared Claude/Codex instructions, 22 Studio Method skills and six Ponytail
  skills: canonical .agents/skills; Claude junctions point to the same files.
  Shared context is docs/project. Setup recovery: scripts/setup-shared-skills.ps1.
- All hardcoded orange site accents replaced with existing dark teal #0A4D57,
  hover #073B43. Catalog swatches and official logo retained.
- HeroSplit.tsx + HeroSplit.module.css implement approved hero study 03:
  replaced Hero_option_01-wider.png, natural fade plus minimal desktop CSS fade
  at final 14%, responsive mint wave, larger product near purchase action,
  levitation and soft ground shadow. Image starts flush under navigation.
- Single hero CTA: Add to Cart $19.95. Supporting kit line, Wear/Wipe/Tear
  labels and secondary scroll link removed by explicit owner request.
- Pattern selection and actual cart retained. Static image import produces
  content-hashed URLs to avoid reuse of replaced optimized image content.
- Mockup docs/product/mockups/hero-options.html matches current built website.
  Generator captures production DOM/CSS and embeds images/fonts; review actions
  pause commerce/navigation. Desktop full width; Phone has a device frame.
  Historic hero-treatment.css is no longer applied by the generator.
- Existing page content/section sequence outside the approved hero edits retained.

## Validation

- Dependencies installed with frozen bun.lock; no dependency or lock changes.
- Latest production build passed (27/27 pages), including lint and TypeScript.
- Hero checked at 375/700/768/1440/1920/2547px: images render, no horizontal
  overflow, expected CTA; desktop/mobile screenshots inspected.
- Unicorn and Wonder Wings selection reach cart at $19.95; cart persists on
  refresh. Reduced motion disables levitation. No browser script errors.
- Minimal fade computed/rendered after image replacement. Bottom wave coverage
  checked at desktop widths; bottom mask provides further edge protection.
- Synced mockup: exact current content/link fidelity, embedded images, option
  switching, safe demo CTA, phone reflow, no script errors checked.
- Earlier baseline checks: invalid empty cart, disabled Family Bundle and invalid
  pattern rejected with HTTP 400; Family Bundle page returns 404. No live payment.
- Push succeeded to origin/main at 5bc27a6; remote hash verified. This confirms
  GitHub receipt, not Hostinger build/deployment completion.

## Open / unverified

- Verify latest Hostinger deployment at
  https://darkslategrey-mouse-465156.hostingersite.com/ . Pushes auto-deploy.
  Wipeband.com is the original public site; Vercel test URL remains pending.
- Checkout has server-selected Stripe prices, but pattern is not forwarded and
  success UI does not verify payment. Webhook, order storage and MCF adapter are
  not implemented. No live payment, inventory or fulfillment verification.
- Tracking always reports an order found. School/feedback submissions are demo
  flows; contact can show success on failure. APIs do not deliver/store messages.
- Minimal operational storage approved for orders, fulfillment and retries;
  provider pending. Owner confirms US FBA inventory. Current original site routes
  purchases to Amazon; MCF availability, SKU mapping and API/connector access need
  assessment. Customer confirmation/tracking only; merchant checks future admin.
- Final assets beyond hero still pending. Commercial claims, review permissions,
  age/material/patent/policy evidence and Amazon destinations need owner confirmation.
- Accessibility and responsive behavior beyond this hero remain unverified.
  Admin needs deliberate order/exception workflows after storefront direction.
- Claude fresh-session shared-skill discovery has not been observed; Codex worked.

## Checkout and next session

Owner chose: review deployed hero, then plan the next section. Read HANDOFF.md,
this status, WORKING_CONTRACT.md and MEMORY.md first. Use current main and actual
rendered website; preserve approved text/products/prices/order in future mockups.

Only main exists locally; no branches to tidy. No helpers/timers/monitors active.
Local website server stopped with owner approval; mockup server already stopped.
Three owner-supplied alternatives remain untracked and intentionally preserved:
Hero_option_01.png, Hero_option_02.png, Hero_option_02-wider.png (assets/sections).
No cleanup performed. Optimize-repo reminder says routine cleanup is due;
offer only when useful. Restart website: npm run dev (port 3000).
Restart mockup: python -m http.server 3011 --bind 127.0.0.1 --directory docs/product/mockups.
Checkout docs are local commits; no additional push/deployment requested at checkout.
