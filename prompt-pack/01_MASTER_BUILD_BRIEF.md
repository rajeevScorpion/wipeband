# MASTER BUILD BRIEF — Wipeband Next.js Website

## Objective

Build the complete redesigned Wipeband website in one coherent implementation using the canonical Markdown copy bank and design system supplied in this pack.

The output should be a polished, responsive, production-oriented Next.js site with every defined page linked correctly.

This build must use placeholders for final visual assets. Do not generate or invent final artwork.

## Source-of-truth hierarchy

When instructions conflict, use this order:

1. `canonical-copy-bank/20_FACT_CHECKLIST.md` for unresolved factual boundaries
2. `canonical-copy-bank/21_DESIGN_SYSTEM.md` for visual/UI rules
3. page-specific canonical Markdown files for copy and section order
4. `canonical-copy-bank/19_COPY_STYLE_GUIDE.md` for tone
5. seed-data files for routes, navigation, products and placeholders
6. this build brief

Do not silently rewrite the approved copy.


## Finished-site expectation

The site must look **complete and presentation-ready even before the final image assets are supplied**.

That means:
- every section is fully designed, spaced and responsive
- all copy is in place
- image areas use polished brand-aligned placeholders with correct aspect ratios
- no page should look like an unfinished wireframe
- no section should be left as raw text, a bare box or a developer scaffold
- the final visual assets should later be replaceable without changing layout
- the website should be usable as a high-fidelity working prototype immediately after this build

## Responsive and theme scope

- The website must be fully responsive across mobile, tablet, desktop and wide desktop.
- **Dark mode is out of scope. Do not implement a dark/light theme toggle.**
- The visual system should use one intentional light-theme experience throughout.

## Implementation target

- Next.js
- App Router
- TypeScript
- responsive/mobile-first
- reusable React components
- accessible semantic HTML
- CSS variables as design tokens
- Tailwind CSS is preferred if already available or easy to configure
- no unnecessary UI framework
- no heavy animation library
- Stripe-ready commerce layer

## Critical build principles

- Wipeband.com direct purchase is primary.
- Amazon is a secondary purchase path and must be visually subordinate.
- The site is 70% premium modern DTC and 30% playful children's brand.
- Parents buy the product; children use it.
- Do not introduce unsupported health, germ-prevention or medical claims.
- Do not invent missing prices, age ranges, patent wording, pack quantities or policies.
- Render unresolved facts as neutral placeholders/TBD only where needed in admin/dev data; do not show ugly "TBD" text in polished customer-facing layouts unless unavoidable.
- Final imagery is out of scope for this build. Use designed placeholders with stable aspect ratios and descriptive labels.
- Do not use random stock imagery.

## Required pages

Build all routes in `seed-data/routes.json`.

Primary navigation:
- Home
- How It Works
- Shop
- Refills
- Our Story
- FAQ
- Cart

Footer:
- shop links
- help/support links
- about links
- legal links
- Amazon secondary link
- social placeholders

Campaign pages must exist but stay out of primary navigation and should be marked noindex until approved.

## Visual placeholders

Every image slot must:
- preserve intended aspect ratio
- include a subtle placeholder background
- display a small development-only label such as `Asset: home_hero_child-using-wipeband_desktop.webp`
- have a predictable path in `/public/assets/...`
- be easy to replace later with no layout changes

Do not create final characters or product images.


## Motion and interaction scope

Motion is part of the final website experience.

Use **Framer Motion** where appropriate for high-quality micro-interactions and scroll/page transitions, while keeping performance and accessibility in mind.

In scope:
- subtle section reveal animations
- staggered card entrances
- gentle image/product movement
- button and card micro-interactions
- smooth state transitions
- subtle scroll-linked effects where they improve storytelling
- page transitions between major routes
- refined mobile menu/cart transitions
- hover/focus motion on desktop
- reduced-motion support

Do not use:
- scroll-jacking
- excessive parallax
- distracting continuous animations
- long intro sequences
- motion that delays content access

If a single-pass build becomes too large, prioritize in this order:
1. complete all pages and responsive layouts
2. complete navigation, cart and Stripe scaffold
3. implement core micro-interactions
4. add section reveal / scroll animations
5. add page transitions and final motion polish

All five stages are in scope, even if implemented progressively.

## Commerce

Implement a lightweight storefront/cart model.

Products:
- Starter Kit
- Family Bundle
- Tissue Refills

Use `seed-data/products.json`.

Stripe:
- scaffold a server-side Checkout Session integration
- never expose secret keys client-side
- use environment variables
- map products to Stripe Price IDs via environment/config
- if Stripe is not configured, keep the cart fully functional and present a clear development-only checkout configuration state
- do not fake successful payments
- preserve Amazon as a small secondary purchase link where defined

Actual Amazon MCF fulfillment is a later phase; keep fulfillment concerns isolated from UI.

## Content

Seed all copy from the canonical Markdown files.

Do not replace approved wording with lorem ipsum.

For legal pages, preserve the canonical structure and clearly mark internally that legal review is required.

## Quality bar

Before declaring completion:
- all routes render
- no dead internal links
- header/footer consistent
- mobile navigation works
- cart works locally
- Stripe integration is safely scaffolded
- responsive at 375, 768, 1024, 1440 widths
- no horizontal overflow
- accessible focus states
- headings are hierarchical
- placeholder images have alt behavior
- metadata exists for every page
- campaign pages are noindex
- build/lint/typecheck succeed
- no secrets committed
- no unsupported claims introduced

## Deliverable expectation

Do not stop after scaffolding.

Implement the full website as a finished, high-fidelity experience. Complete responsive layouts first, then add the motion/interactions described above. If the work must be staged internally, continue through those stages before handoff rather than treating animation as optional future work.

Then audit it against `09_ACCEPTANCE_CHECKLIST.md`, fix issues, and only then provide a concise handoff report.
