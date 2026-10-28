# Wipeband project map

Assessed 2026-10-28. Local code assessment; production parity is unverified.
Baseline updated to GitHub cb2e76d/f682182 after discovering the checkout was
behind. Application baseline is origin/main; local/live homepage headings match.
Subsequent local correction removes orange overrides from the hero/starter
purchase buttons so they use the shared primary dark-teal tokens.

## Stack and entry points

- Next.js App Router, TypeScript, React 18, Tailwind; Motion/Framer Motion,
  Lucide icons, Stripe server SDK. package.json declares Next ^14.2.20.
- `app/layout.tsx`: fonts, global styles, CartProvider, header/footer/drawer.
- `app/page.tsx`: homepage sections, composed in their displayed order.
- `app/template.tsx`: route entrance animation.
- `app/globals.css` and `tailwind.config.js`: light-theme colors and tokens.
- `next.config.mjs`: strict mode, unoptimized images.

## Routes

- `/`: hero/pattern-to-cart, immediate three-step routine, problem/benefits,
  six-layer explanation, use cases/UGC slots, reviews/co-inventor story, starter
  purchase/trust module, objection FAQs, final CTA and mobile sticky purchase bar.
- `/how-it-works`, `/refills`, `/our-story`, `/faq`: informational pages.
- `/shop`, `/products/[slug]`: active starter-kit and tissue-refill products.
  Family Bundle data is retained as unavailable; active lookup excludes it.
- `/cart`, `/order/success`: cart and unverified checkout-return UI.
- `/contact`, `/feedback`, `/schools`, `/track-order`: support and inquiry UI;
  several handlers are demonstrations, not delivery/tracking integrations.
- `/school`, `/travel`, `/cold-season`, `/back-to-school`: noindex campaign
  pages sharing `components/campaign/CampaignLanding.tsx`.
- `app/not-found.tsx`: missing-page UI.
- `app/api/{checkout,contact,feedback}/route.ts`: three POST handlers.

## Shared components and state

- `components/layout/`: navigation, announcement, footer.
- `components/sections/`: v2 homepage composition. Hero and ChooseWipeband use
  the shared catalog/cart selection. RefillBanner is no longer on the homepage.
- `components/commerce/MobileStickyBar.tsx`: mobile starter purchase control.
- `components/commerce/ProductClientView.tsx`: variant/quantity selection.
- `components/commerce/CartDrawer.tsx`: drawer and checkout request.
- `components/ui/`: Button, Accordion, motion helpers, logo, PlaceholderMedia.
- `lib/cart.tsx`: React context and `wipeband_cart` localStorage persistence;
  quantities, totals, drawer state, shared selectedPattern and addStarterKit;
  filters unavailable products from persisted carts. No server cart/store yet;
  minimal operational storage for direct orders is now approved.
- `lib/products.ts`: runtime catalog, hardcoded prices and Amazon defaults.
- `lib/site.ts`: runtime site text, identity, navigation and claims.
- `lib/types.ts`: Product, ProductVariant and CartItem interfaces.
- Source pages contain their own copy. Seed/copy files are reference inputs,
  not directly imported into runtime source; changes can drift between them.

## Services and environment names

Checkout maps permitted slugs to Stripe prices on the server. Pattern data is
allowlisted for starter items but is not forwarded to Stripe. Family Bundle is
rejected by the checkout allowlist. No webhook/order database/fulfillment adapter exists
in this checkout; the success page does not verify payment. Contact/feedback
API handlers acknowledge input without delivering or storing it.

Environment names: NEXT_PUBLIC_SITE_URL, STRIPE_SECRET_KEY,
STRIPE_PRICE_STARTER_KIT, STRIPE_PRICE_FAMILY_BUNDLE, STRIPE_PRICE_REFILLS,
NEXT_PUBLIC_AMAZON_STARTER_KIT_URL, NEXT_PUBLIC_AMAZON_REFILLS_URL.
`lib/site.ts` now resolves Amazon URLs from environment variables with defaults;
verify each UI destination separately. Never place secret values in project docs.

## Inputs and assets

- `prompt-pack/`, `canonical-copy-bank/`, `seed-data/`: original build inputs.
- `Wipeband_Client_Feedback_Implementation_Pack_v2 (2)/`: later client review,
  revisions, guardrails, action tracker, historical seed/copy snapshots.
  Owner reports implementation; reconcile each item against code and previews.
- `public/assets/branding/wipeband_logo.svg`: supplied logo.
- `public/assets/{product,lifestyle}/`: image destinations, mostly empty at
  assessment. PlaceholderMedia renders designed fallbacks if images fail.
- Minimal order/fulfillment/retry storage is approved; provider is undecided.
  New owner-supplied images will ship with the repo.

## Commands and deployment

- Install: `npx --yes bun install --frozen-lockfile` when Bun is not on PATH;
  with Bun installed, `bun install --frozen-lockfile`.
- Dev: `npm run dev` (port 3000). Build: `npm run build`.
- Production local server: `npm run start` (port 3000).
- Lint: `npm run lint`. Type check: `node node_modules/typescript/bin/tsc --noEmit --incremental false`.
- No project test script, tracked CI workflow, or deployment configuration was
  found. Hostinger auto-deploys GitHub pushes according to the owner; this can
  operate without a tracked workflow. Do not push without authorization.
- Hostinger preview: https://darkslategrey-mouse-465156.hostingersite.com/ .
  Local homepage headings match the captured deployment. Vercel URL pending.

## Shared Studio Method

Skills live in `.agents/skills`; Claude uses a directory junction to them.
AGENTS.md and imported CLAUDE.md direct both hosts to the same docs/project
status, handoff, contract, decisions, and memory. Use `catch up` and `check out`.
Six Ponytail skills are installed alongside Studio Method in the same shared
directory, with full mode as the default for coding tasks.
