# TECHNICAL ARCHITECTURE

## Recommended stack

- Next.js App Router
- TypeScript
- React Server Components by default
- Client Components only where interaction requires them
- Tailwind CSS or clean CSS Modules + CSS variables
- `next/font` for fonts
- Stripe server SDK for Checkout Sessions
- minimal dependency footprint
- Framer Motion for deliberate motion and transitions

## Suggested folder structure

```text
app/
  layout.tsx
  page.tsx
  how-it-works/page.tsx
  shop/page.tsx
  products/[slug]/page.tsx
  refills/page.tsx
  our-story/page.tsx
  faq/page.tsx
  schools/page.tsx
  contact/page.tsx
  feedback/page.tsx
  track-order/page.tsx
  shipping-returns/page.tsx
  privacy-policy/page.tsx
  terms-conditions/page.tsx
  cart/page.tsx
  school/page.tsx
  travel/page.tsx
  cold-season/page.tsx
  back-to-school/page.tsx
  api/checkout/route.ts
  api/contact/route.ts
  api/feedback/route.ts

components/
  layout/
  sections/
  commerce/
  forms/
  ui/

content/
  page registry or structured content adapters

lib/
  content.ts
  products.ts
  stripe.ts
  site.ts
  seo.ts

public/
  assets/
    brand/
    product/
    lifestyle/
    icons/
    motifs/
    placeholders/

styles/
```

## Data ownership

Canonical prose stays in Markdown.

Structured implementation data should come from:
- navigation.json
- routes.json
- products.json
- site.json
- assets.json
- seo.json

If the implementation converts Markdown into TypeScript objects, preserve the original Markdown files unchanged.

## Rendering

Use static/server rendering for marketing pages.

Use client components only for:
- mobile navigation
- cart interactions
- FAQ accordion
- forms
- optional product quantity selectors

## Cart model

A lightweight client cart is sufficient for the prototype.

Persist cart locally.

Cart item:
- slug
- product name
- selected variant if any
- quantity
- display price if configured
- Stripe price key reference

Do not store secret Stripe data in the client.

## Checkout model

`POST /api/checkout`

Server:
1. validate requested product/quantity
2. resolve server-side Stripe Price ID
3. create Checkout Session
4. return redirect URL

Environment variables:
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_PRICE_STARTER_KIT`
- `STRIPE_PRICE_FAMILY_BUNDLE`
- `STRIPE_PRICE_REFILLS`
- optional Amazon product URLs

## Forms

Contact and feedback forms should be functional at UI/validation level.

If no email/backend provider is configured, server endpoint may log safely in development and return a clear configurable state. Do not pretend a message was delivered.

## Analytics

Create clean extension points for later:
- GA4
- Meta Pixel
- Meta Conversions API

Do not hardcode IDs.

## Performance

- `next/image`
- responsive sizes
- lazy-load below-fold placeholders/assets
- keep hero placeholder lightweight
- avoid large client bundles
- no carousel library unless truly needed

## Security

- secrets server-only
- validate API request bodies
- no raw HTML injection from user input
- basic rate-limit hook/comment for form endpoints
- no payment card collection on custom forms


## Motion architecture

Use Framer Motion intentionally rather than scattering animation logic throughout pages.

Recommended reusable motion patterns:
- `FadeIn`
- `RevealOnScroll`
- `StaggerGroup`
- `MotionCard`
- `PageTransition`
- `AnimatedMobileNav`
- `AnimatedCartDrawer`

Guidelines:
- keep durations generally around 180–500ms
- prefer transform + opacity animations
- use viewport-triggered reveal sparingly
- respect `prefers-reduced-motion`
- do not block initial content rendering for animation
- avoid expensive scroll listeners when CSS/intersection-based patterns are sufficient

Page transitions should be subtle and fast. Content must remain navigable if animations are disabled.
