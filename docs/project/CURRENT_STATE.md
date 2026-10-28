# Wipeband current state

Updated: 2026-10-28 (Asia/Kolkata). Usage: unknown.

## Summary

Baseline correction: local main now integrates GitHub main at cb2e76d (including
f682182 checkout/feedback implementation) with our shared tooling. The old local
base was f49359f. All assessments/mockups made on that old base are historical,
not the current storefront baseline. App source is origin/main plus the approved
approved teal corrections and implemented hero study 03 described below.

Existing Wipeband website repository with Next.js 14, React 18, Tailwind,
motion libraries, and Stripe dependency, as declared in package.json.
Studio Method shared revision 4b6e124 adopted 2026-10-28. Owner confirmed the
assessment and deployment/asset constraints. Dependencies and local baseline
checks are complete. The owner has defined a storefront motion refresh, compact
admin order desk, minimal customer email, and future direct ordering via MCF.

## Working

- 22 Studio Method skills live in `.agents/skills/`, with supporting resources.
- Claude reads the same skills through `.claude/skills`; Codex discovers
  `.agents/skills`. Both use AGENTS.md and the shared docs/project files.
- The local setup script restores Claude junctions and disables duplicate
  Studio Method plugin packs for this checkout.
- Dependencies installed with Bun 1.4.4 via npx and the frozen bun.lock:
  389 packages; resolved Next.js 14.2.35 and React 18.3.1. No manifest/lock changes.
- All planned route modules are present. Product selection, pattern-to-cart,
  localStorage cart, informational pages, campaigns, and motion exist in code.
- Shared project map, product brief, mockup index, and owner decisions are saved.
- Six Ponytail skills are installed project-locally in the shared skill folder
  and validated. Claude and Codex resolve the same skill files.
- Landing study 02 is retained as an obsolete pre-v2 artifact at
  `docs/product/mockups/storefront-operations.html`. Its content audit matched
  the old local base, not the newer deployed version. Do not use it as a spec.
- Study 01 is archived as rejected: changed storefront content/order and a
  shallow admin workflow. The admin requires a separate, considered redesign.
- Hostinger auto-deploys GitHub pushes; Vercel testing copy is planned by owner.

## Validation

Current merged v2 baseline:
- Frozen dependency check passed without lock changes. TypeScript and lint pass.
- Production build passed in an isolated temporary copy (27/27 generated),
  avoiding interference with the existing local dev server's .next cache.
- Local port-3000 homepage returns 200; its 24 headings match captured Hostinger.
- Checkout rejects empty cart, disabled Family Bundle and invalid starter pattern
  with HTTP 400. Family Bundle page returns 404. No valid payment was submitted.
- Application files exactly match origin/main cb2e76d; shared tooling/docs are
  retained at merge time. The merge had no conflicts. Subsequent correction:
  hero and starter purchase buttons now inherit the shared primary color rather
  than the upstream hardcoded orange overrides. Browser computed colors pass:
  normal #0A4D57 and hover #073B43 for both. Prior checks below are historical.

- All 22 skills passed the skill-creator frontmatter validator.
- All Claude skill paths and the product-lead role resolve to the canonical
  files. A temporary write-through probe passed in both directions.
- Setup ran twice successfully. Maintenance scripts passed a shared-state check
  in an isolated temporary repository.
- Codex successfully discovered and invoked the shared catch-up/studio-start
  skills. Claude fresh-session discovery has not been observed here.
- Dependency install passed with frozen lockfile; TypeScript passed using
  `node node_modules/typescript/bin/tsc --noEmit --incremental false`.
- `npm run lint` passed with no warnings/errors. `npm run build` passed,
  including compilation, lint/types, and static generation (28/28).
- Static assessment: 10 JSON inputs parsed, no missing planned route modules
  or unresolved literal internal route links found. No browser/payment checks.
- Prototype-only headless checks passed: pattern/cart totals, sample confirmation,
  Escape dismissal, retry/filter/reset/search, connections, phone overflow,
  reduced motion and no page errors. Desktop/store/admin/phone screenshots viewed.
  These do not validate the production application's ordering behavior.
- Landing study 02 checks passed: exact section/link fidelity in both modes,
  visible copy, centered 1320px frame, actual Motion pointer response,
  motion-off behavior, phone reflow/overflow, reduced-motion preference, no page
  errors or external requests. Full-page, desktop and phone screenshots inspected.

## Open / unverified

- Latest feedback implementation is now present: hero pattern-to-cart, revised
  copy/order, co-inventor story, mobile sticky bar and checkout product/variant
  allowlists. Earlier findings about their absence came from the stale base.
- Checkout selects Stripe prices server-side, but pattern information is not
  forwarded and success UI does not verify payment. Live payment/stock/config
  state is unverified; no webhook, order store, or fulfillment adapter found.
- Tracking always reports an order found. Feedback and school inquiry UI do
  not send submissions. Contact can show success on failure; the contact and
  feedback APIs acknowledge without delivery/storage. Minimal operational
  storage is now approved for orders/fulfillment/retries; provider undecided.
- Family Bundle is excluded from active products, product lookup and checkout
  allowlist. Age/material/patent/policy/review claims, Amazon destinations and
  commercial values still require owner-confirmed evidence before production.
- Most image directories are empty; logo is present. Owner will supply images.
  No reduced-motion handling found in source. Browser accessibility, visual,
  responsive and functional QA, production parity, and deployments are unverified.
- No application test script or tracked CI workflow. Deployment behavior is
  owner-confirmed. Hostinger preview URL is confirmed:
  https://darkslategrey-mouse-465156.hostingersite.com/ . Local port 3000 serves
  the same 24 headings as the captured deployed homepage. Vercel URL pending.
- Upstream changes require an explicit merge into the shared skill copy.

## Next

Continue from updated local main. Reassess the v2 source and rebuild any future
visual study from that version; studies 01/02 are obsolete. Preserve the deployed
storefront content and sequence. Admin needs a deeper operational design after
the landing direction. Final images and Vercel URL are pending.
Owner confirms FBA inventory;
the existing public site only redirects to Amazon. MCF availability/API access
and SKU mappings still need assessment before implementation. Routine order
email is customer confirmation + tracking only; merchant checks admin. No push,
deployment or production commerce changes have been made. Local work remains
on local main, per owner instruction. No push/deployment authorized.

## Site accent correction

All hardcoded orange accents in runtime components now use the existing dark
teal token (#0A4D57), with #073B43 for hover and teal tints for accent surfaces.
Includes headings, navigation, CTAs, icons, placeholder illustrations and fallback
logo. Copy, catalog and section order preserved. Source scan finds no old orange
accent; headless homepage check found no rendered orange and all four purchase
buttons plus the sleeve headline resolve to dark teal. Lint and TypeScript pass.
Local only; no push or deployment.

## Hero study 03

Draft: docs/product/mockups/hero-options.html, served at
http://localhost:3011/hero-options.html. Uses current local v2 content and the
three owner-supplied images, with two scene choices, product overlay and mint
wave. Full page preserved; Desktop/Phone, Motion and notes controls available.
Headless content/link fidelity, image rendering, safe demo actions and phone
overflow checks passed. Awaiting image/composition choice; app source unchanged.

Hero study 03 revised: desktop preview is edge-to-edge; phone frame retained.
Classroom artwork is scaled down to fit the hero, and product overlay increased
from 320px to 440px desktop (210px to 270px phone). Full-width, phone overflow
and content fidelity checks passed. Still a mockup; application unchanged.

Hero option 1 now uses owner-supplied Hero_option_01-wider.png, preserving its
natural desktop fade. Default preview is this wider option; option 2 remains
for comparison. Wave, enlarged product overlay and full-width desktop retained.

Hero image alignment corrected: wider option is top-anchored directly to the
navigation boundary, keeps its aspect ratio, and uses a CSS mask at the right
edge. Reduced excess hero bottom spacing so the wave overlaps the scene.
Screenshots inspected at 1440, 1920 and 2545px; image/hero top equals navigation
bottom at every width. Content fidelity and horizontal overflow checks pass.

Hero composition revision: scene moved 160px left; product overlay moved beside
the purchase area, clear of the boy's wristband. Desktop wave increased to
320px. Screenshots inspected at 1440/1920/2547px; SVG fill checks confirm every
sampled point of the photo bottom edge is covered. Content fidelity and
horizontal overflow checks pass. Mobile layout unchanged.

Hero cleanup approved by owner: removed supporting kit line, Wear/Wipe/Tear
labels and secondary scroll link. Hero purchase label is Add to Cart $19.95
without a separator. Product has gentle levitation and a grounded soft shadow;
Motion Off/reduced-motion disables animation. Added bottom mask as responsive
edge protection alongside the wave. Content checks now explicitly account for
these requested removals; other sections unchanged. Checks passed at five
widths (768 through 2547px); desktop screenshot inspected.

Hero right fade widened: gradual mask starts at 62% of the scene and reaches
full transparency at 85%, bringing the visible image boundary near the Bag
control. Boy, product, CTA and wave positions retained. Desktop content checks
passed at 1440/1920/2547px; 1920px screenshot visually inspected.

Hero right fade now uses a feathered elliptical radial mask instead of a
straight linear fade, retaining the bottom edge mask. This creates a rounded
organic boundary while preserving the boy and wristband. Content checks pass
at three desktop widths; 1920px screenshot inspected.

## Approved hero implemented

Owner approved study 03 and requested the build. HeroSplit now uses the wider
classroom image, organic rounded right fade, responsive wave, enlarged product
beside the CTA, gentle levitation and ground shadow. Single action: Add to Cart
$19.95; supporting labels/secondary link removed as approved. Next Image serves
responsive assets. Existing pattern/cart logic retained; pressed state and
reduced-motion support included. Remaining sections and header unchanged.

Validation: lint/TypeScript pass; production build generates 27/27 pages.
Headless checks pass at 375/700/768/1440/1920/2547px: images render, no horizontal
overflow, exact CTA, Unicorn selection reaches cart at $19.95, persisted cart
survives refresh, reduced motion disables levitation, no browser errors. Desktop
and mobile screenshots inspected; mobile overlay shifted away from wristband.
Served locally at http://localhost:3000/ using production server. No push/deploy.

## Release handoff

Owner explicitly authorized pushing local main to GitHub. Remote was fetched
and has no commits absent from local main. Push includes approved hero, teal
corrections and shared tooling/history. Hostinger deploys automatically; actual
deployment outcome remains unverified. Unused hero option 1/2 uploads stay
local and untracked.

Hero image replacement: owner supplied a revised Hero_option_01-wider.png with
natural side fades. Removed the CSS right-hand radial fade; bottom mask stays
for wave coverage. Hero imports the image statically so Next generates a
content-hashed URL and does not reuse the old optimized image path.

Replacement validation: lint/TypeScript and production build pass (27/27).
Rendered replacement inspected at 1920px; image URL is hashed, CSS radial mask
is absent, and overflow checks pass at 375/1440/1920px. Local production server
restarted on port 3000; update not pushed.
