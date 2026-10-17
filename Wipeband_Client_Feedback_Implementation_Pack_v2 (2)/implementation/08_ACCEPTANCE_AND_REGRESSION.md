# Required Acceptance Tests / Regression Checks

## First-screen comprehension

- [ ] A first-time parent can identify Wipeband as a wrist-worn tissue for runny noses without scrolling.
- [ ] Hero contains one dominant direct purchase CTA and restrained Amazon text link.
- [ ] `Wear → Wipe → Tear` appears immediately after hero (and small cue in hero).
- [ ] The used tissue is explicitly removed and a clean layer is revealed.
- [ ] Hero has a 6–10s approved loop where supplied, otherwise a polished static poster placeholder.
- [ ] Early first screen is free from competing benefit clutter.

## Homepage structure

- [ ] Hero > 3-step > problem > benefits > 6-layer > use cases > verified UGC/reviews > starter kit > trust > FAQs > final CTA.
- [ ] Each section answers a distinct question; avoid excessive repeated claims.
- [ ] Six white layers visibly explained; no inaccurate CAD colors.
- [ ] Starter Kit visually dominates Refills; bundle not publicly promoted or purchasable before approval.
- [ ] Direct source-backed customer proof only; no invented quote, rating, customer name, image or source badge.

## Checkout + mobile

- [ ] On homepage select each pattern and add direct to cart in test environment.
- [ ] Pattern, price, quantity and SKU survive navigation and match Stripe session server-side.
- [ ] Mobile sticky CTA appears after hero, does not cover nav/other controls, respects safe area and hides appropriately around cart/checkout or visible main purchase CTA.
- [ ] Amazon link is visibly tertiary on homepage/shop/product/footer CTA and not a matching purchase button.
- [ ] Checkout unconfigured/failure state does not claim purchase success; no real charges during tests.
- [ ] Refills link remains available for repeat purchasers.

## Fact/policy trust

- [ ] Age wording has client-confirmed source and is consistent sitewide; no contradictory 2+, 2–6, 3–5, 3–7.
- [ ] Starter/Refill counts and prices reflect approved catalog/variant mapping.
- [ ] `skin-safe`, `hygienic`, `clinically...`, patent, shipping/return terms are confirmed or removed.
- [ ] Direct Stripe/MCF return explanation is distinguished from Amazon marketplace returns.
- [ ] Personal founder/co-inventor details and Tiana external link are approved and correct.
- [ ] Legal pages are separately marked reviewed (or blocked before public launch).

## Existing-site regressions

- [ ] All public routes from original route map render, link correctly, no broken footer links.
- [ ] Desktop/tablet/mobile (375, 768, 1024, 1440px) have no horizontal overflow and correct image cropping.
- [ ] Light theme only; no dark-mode CSS/OS toggle activated.
- [ ] Motion/page transitions and sticky behaviors are comfortable and disabled/reduced appropriately under prefers-reduced-motion.
- [ ] Forms and tracking have real working backend integration or clearly appropriate unconfigured state; no false submissions.
- [ ] No console errors, unresolved Next.js runtime warnings or hydration errors.
- [ ] Test, typecheck, lint and production build commands pass or failures documented (baseline vs new).
- [ ] Deployment/rollback/checkpoint link and client action report exist.

## Test report format

| Test | Environment | Before | After | Pass / Fail | Evidence URL / Screenshot / Command | Owner |
|---|---|---|---|---|---|---|
