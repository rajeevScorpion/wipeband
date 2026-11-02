# Wipeband current state

Updated: 2026-11-02 (Asia/Kolkata). Usage: unknown.
Last push verified before this image workflow: 5bc27a6 on main. Check Git for
the current tip and confirm Hostinger separately after any subsequent push.

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

- Owner corrected the mockup workflow: a requested or proposed mockup stays
  separate until reviewed and explicitly approved; general go-ahead language
  does not approve an unseen mockup. Existing testimonial implementation may
  remain this time. Shared instructions and contract record the rule.
- Testimonial mockup drafted at `docs/product/mockups/testimonial-review.html`:
  square cards, supplied parent avatars and two labeled future teacher-review
  slots. Desktop/phone and two/four-card controls included. Built from local
  rendered homepage HTML; JavaScript syntax and key content checked. Browser
  preview unavailable, so visual and interactive behavior still need owner review.
  At the owner's direction, square cards and parent avatars are also implemented
  locally; all four supplied avatars were converted to WebP for current/future use.
  TypeScript, targeted lint and local HTTP checks passed. Not yet pushed.
- At the owner's request, removed the four repeated real-life placeholder cards
  and combined their message with the School, Playdates and Travel heading. The
  three existing image cards remain. TypeScript, targeted lint and local HTML
  checks passed; browser visual review and deployment remain unverified.
- Investigated local hot reload: the existing `npm run dev` server detected a
  temporary source edit, served the new content and sent WebSocket refresh events.
  `PlaceholderMedia` now resets remembered image/video failures when its source
  changes, so a previous placeholder failure does not hide a newly selected
  image during refresh. TypeScript and targeted lint passed; actual browser-side
  refresh still needs owner verification. Fix was pushed at 288ffc2.
- Added the owner's classroom, playground and car images to the homepage School,
  Playdates and Travel cards locally. Optimized WebP copies are used; originals
  remain in `image-inbox/`. TypeScript, image guard and local image HTTP checks
  passed. No browser screenshot or production deployment verified for this change.
- WebP workflow and homepage Wear/Wipe/Tear images implemented locally: originals
  go in `image-inbox/`, optimizer creates WebP, and the build rejects common
  non-WebP raster files in website folders. Owner-supplied cards and hero images
  use WebP. Tests and guarded build passed; local HTTP confirms all three card
  URLs return WebP. Browser preview was unavailable; desktop/phone visual review
  is still needed. The owner requested the Git workflow and authorized completing
  the work while away; a push triggers Hostinger deployment.
- Original hero PNGs and the three earlier owner alternatives were moved to the
  Git-ignored local `image-inbox/` folder. They are not backed up to GitHub
  there; the previously tracked originals remain in Git history.
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
Three owner-supplied alternatives are preserved in local `image-inbox/`:
Hero_option_01.png, Hero_option_02.png, Hero_option_02-wider.png.
No cleanup performed. Optimize-repo reminder says routine cleanup is due;
offer only when useful. Restart website: npm run dev (port 3000).
Restart mockup: python -m http.server 3011 --bind 127.0.0.1 --directory docs/product/mockups.
Checkout docs are local commits; no additional push/deployment requested at checkout.
