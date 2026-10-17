# Implementation Sequence and Gates

**Goal: one cohesive outcome, safely implemented in phases.** Do not start a completely new app. Avoid introducing new dependencies unless existing stack cannot meet requirements.

## Phase 0 — preserve baseline

Checkpoint and discovery. Gate: restore instructions and existing test results saved. No edits before this.

## Phase 1 — content and hierarchy (C01, C02, C04, C06, C07, C13, C15–C17, C20, C22, C24)

Reorder/rewrite homepage first, simplify secondary page language, strengthen 3-step and six-layer explanations using placeholders. Avoid content deletion without preserving source. Gate: desktop/mobile homepage passes visual review, copy diff, SEO and accessibility.

## Phase 2 — commerce UX (C03, C10–C12, C18, C19)

Audit real Stripe/cart/variants first, then implement direct SKU selection and homepage Add to Cart, show validated dynamic price, sticky mobile purchase action, Amazon tertiary hierarchy, and safely hide unready bundles sitewide. Gate: safe cart/Stripe test scenario, no false `Paid` states, no invalid SKU path, no regression.

## Phase 3 — proof, trust and founder (C08, C09, C21, C23)

Validate facts and permissions. Use sourced testimonials and authenticated UGC only. Build approved founder story using old page as context, add Tiana link, demote patent hype, align FAQ/returns. Gate: content provenance / client signoff register; unresolved items remain honest placeholders or invisible.

## Phase 4 — media slots and motion (C05, C13, C21)

Prepare realistic layout media components and approved poster fallbacks. Integrate final assets only if delivered separately. Preserve good microanimation, Framer Motion and light-mode responsive behavior. Gate: performance, mobile, reduced-motion, no placeholder accidentally claimed real.

## Phase 5 — complete verification and handoff

Audit all routes from original seed, mobile/tablet/desktop, checkout and support forms, broken links, static/dynamic SEO, duplicate heading/copy, CTA hierarchy, no dark mode, real data assertions and visual polish. Generate comparison screenshots, automated results and client actions log. Only deploy to production with normal review/authorization rules.

**After each phase**: commit changes and link the checkpoint in the action log. Resolve blocking business facts through the owner rather than hallucinating details.
