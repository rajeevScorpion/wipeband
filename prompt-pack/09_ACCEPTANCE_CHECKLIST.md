# ACCEPTANCE CHECKLIST

The AI coder must run this checklist after implementation and fix failures before handoff.

## Global

- [ ] All routes in `seed-data/routes.json` exist
- [ ] No dead internal navigation links
- [ ] Header and footer appear consistently
- [ ] Mobile menu works
- [ ] Cart link works
- [ ] 404 page exists
- [ ] No lorem ipsum
- [ ] No unsupported health/medical claims
- [ ] No invented factual values
- [ ] Amazon CTA is always secondary
- [ ] No final imagery has been invented
- [ ] Placeholder asset labels are easy to replace

## Finished-site quality

- [ ] Every page looks presentation-ready
- [ ] No raw wireframe sections remain
- [ ] Image placeholders are polished and brand-aligned
- [ ] Placeholder swaps will not require layout restructuring
- [ ] No dark mode / theme toggle is implemented
- [ ] All key micro-interactions are implemented
- [ ] Section reveal/scroll motion is implemented
- [ ] Page transitions are implemented
- [ ] Reduced-motion behavior works
- [ ] Motion does not delay access to content

## Responsive

Test at:
- [ ] 375px
- [ ] 768px
- [ ] 1024px
- [ ] 1440px

Verify:
- [ ] no horizontal scroll
- [ ] headings do not clip
- [ ] buttons remain usable
- [ ] cards stack logically
- [ ] hero reads well on mobile

## Accessibility

- [ ] keyboard navigation
- [ ] visible focus states
- [ ] semantic headings
- [ ] form labels
- [ ] errors announced/readable
- [ ] 44px-ish tap targets
- [ ] reduced motion respected
- [ ] contrast is acceptable

## Commerce

- [ ] Starter Kit product page
- [ ] Family Bundle product page
- [ ] Refill product page
- [ ] add to cart
- [ ] quantity changes
- [ ] remove item
- [ ] subtotal
- [ ] checkout CTA
- [ ] Stripe route is server-side
- [ ] secrets not exposed
- [ ] missing Stripe config fails safely
- [ ] no fake success flow

## Content

- [ ] Home follows canonical section order
- [ ] How It Works uses canonical copy
- [ ] Shop uses canonical copy
- [ ] Our Story uses canonical copy
- [ ] FAQ categories are present
- [ ] Schools page present
- [ ] Contact and Feedback forms present
- [ ] Shipping/Returns page present
- [ ] Legal pages present
- [ ] campaign pages are noindex

## Build quality

- [ ] TypeScript passes
- [ ] lint passes
- [ ] production build passes
- [ ] no obvious console errors
- [ ] no committed secrets
- [ ] concise README explains setup
