# STRIPE / COMMERCE IMPLEMENTATION

## Scope for this build

Build:
- local storefront product model
- cart
- direct checkout CTA
- safe Stripe Checkout Session scaffold
- success/cancel routes if Stripe is configured
- Amazon secondary links as optional config

Do not implement:
- custom card capture
- Amazon MCF fulfillment
- invoicing assumptions
- subscriptions unless explicitly enabled later
- fake payment completion

## Product configuration

Use `seed-data/products.json`.

Customer-facing prices should remain hidden or show a neutral configuration state until real values are supplied.

## Environment mapping

Recommended:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
STRIPE_SECRET_KEY=
STRIPE_PRICE_STARTER_KIT=
STRIPE_PRICE_FAMILY_BUNDLE=
STRIPE_PRICE_REFILLS=
NEXT_PUBLIC_AMAZON_STARTER_KIT_URL=
NEXT_PUBLIC_AMAZON_REFILLS_URL=
```

## Checkout safety

The client sends only product slug + quantity.

The server resolves allowed product slugs to configured Stripe Price IDs.

Never accept arbitrary client-supplied Stripe Price IDs.

## Order success

If Stripe is configured:
- redirect to `/order/success?session_id=...`
- show a neutral confirmation
- do not expose payment details
- fulfillment handoff is future scope

If Stripe is not configured:
- cart remains usable
- checkout button should show a development/configuration notice
- never simulate a paid order
