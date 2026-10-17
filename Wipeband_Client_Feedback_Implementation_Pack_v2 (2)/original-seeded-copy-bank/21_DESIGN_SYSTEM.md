# Wipeband Design System

**Status:** WORKING MASTER  
**Phase:** 03 — Platform-Agnostic Design System  
**Primary implementation target:** Next.js  
**Future compatibility:** WordPress / Elementor adaptation possible  
**Source of truth:** This file + canonical Wipeband copy-bank Markdown files

---

# 1. Design Intent

The redesigned Wipeband site should feel:

**70% premium modern DTC brand + 30% playful children's brand.**

The site is for adults making a purchase decision, while the product is for children.

That means:

- clear enough to understand in seconds
- warm and friendly without becoming childish
- product-led rather than decoration-led
- visually playful in controlled moments
- credible enough for parents to trust
- lightweight, fast and mobile-first
- consistent enough that generated assets can be reused across pages and campaigns

The approved landing-page direction is the visual anchor.

---

# 2. Core Visual Principles

## 2.1 Product first

Every major page should quickly show:

1. what Wipeband is
2. how it is worn
3. how the tissue is used
4. how it is refilled
5. where it fits into everyday life

Avoid decorative sections that do not improve product understanding.

## 2.2 One visual language per page

Do not mix:

- flat vector cartoon
- 3D child illustration
- photoreal product render
- hand-drawn comic
- unrelated stock photography

inside one visual cluster.

Different visual modes may exist across the site, but they must be assigned intentionally.

## 2.3 Controlled playfulness

Use playful elements as accents:

- green directional strokes
- soft iconography
- rounded cards
- gentle background washes
- small illustrated moments
- character imagery when relevant

Do not turn every section into a cartoon scene.

## 2.4 Breathing room

The site should feel substantially cleaner than the legacy site.

Use:
- generous section spacing
- restrained copy width
- clear visual hierarchy
- few competing CTAs
- limited simultaneous colors

---

# 3. Brand Color System

The following are the **working digital tokens** for the prototype.

They are visually derived from the approved landing-page direction and existing Wipeband palette. They may be fine-tuned later against final brand files.

## Primary Colors

| Token | Working HEX | Use |
|---|---:|---|
| `--color-teal-700` | `#0A4D57` | Primary brand color, primary buttons, headings, footer |
| `--color-teal-800` | `#073B43` | Dark hover state, deep sections |
| `--color-green-500` | `#62B44A` | Positive emphasis, highlighted words, accents |
| `--color-coral-500` | `#F36F6B` | Limited warm accent, legacy brand continuity |
| `--color-aqua-400` | `#66C5CD` | Secondary playful accent |
| `--color-amber-400` | `#FDB515` | Small accent only; never dominate |

## Neutrals

| Token | Working HEX | Use |
|---|---:|---|
| `--color-ink` | `#123B42` | Main body text |
| `--color-muted` | `#637A7E` | Secondary text |
| `--color-border` | `#DDE7E4` | Borders/dividers |
| `--color-white` | `#FFFFFF` | Primary background |
| `--color-offwhite` | `#FAFCFA` | Light neutral surface |

## Soft Surfaces

| Token | Working HEX | Use |
|---|---:|---|
| `--surface-mint` | `#EEF7EA` | Product insight / feature backgrounds |
| `--surface-cream` | `#FFF5DE` | Commerce / story cards |
| `--surface-aqua` | `#EEF9FA` | Testimonial / informational surface |
| `--surface-coral` | `#FFF1EF` | Rare warm support surface |

## Color hierarchy

Use deep teal for the majority of strong UI actions.

Use green primarily for:
- highlighted words
- step numbers
- small visual signals
- success/positive emphasis

Use coral, aqua and amber as supporting accents only.

Do not use all brand colors at equal strength in one section.

---

# 4. Typography

## 4.1 Font pairing

### Headings / display
**Nunito Sans**

Recommended weights:
- 700
- 800
- 900

Reason:
- friendly rounded character
- readable
- child-adjacent without looking juvenile
- suitable for strong DTC headlines

### Body / UI
**Inter**

Recommended weights:
- 400
- 500
- 600
- 700

Reason:
- highly readable
- clean UI behavior
- works well for commerce and product detail

## 4.2 Type scale

### Desktop

| Style | Size | Weight | Line Height |
|---|---:|---:|---:|
| Display | 64px | 900 | 1.02 |
| H1 | 56px | 900 | 1.05 |
| H2 | 40px | 800 | 1.12 |
| H3 | 28px | 800 | 1.18 |
| H4 | 22px | 700 | 1.25 |
| Body Large | 20px | 400 | 1.55 |
| Body | 17px | 400 | 1.6 |
| UI / Button | 16px | 700 | 1.2 |
| Small | 14px | 500 | 1.45 |
| Caption | 12px | 500 | 1.4 |

### Mobile

| Style | Size |
|---|---:|
| Display | 44px |
| H1 | 40px |
| H2 | 32px |
| H3 | 24px |
| Body Large | 18px |
| Body | 16px |

## 4.3 Text rules

- Hero copy width: max 580px
- Standard paragraph width: max 680px
- Avoid paragraphs longer than 4–5 lines on desktop
- Use sentence case
- Avoid all-caps except small labels/badges
- Use bold emphasis sparingly
- Prefer line breaks over shrinking important headlines

---

# 5. Layout System

## 5.1 Content width

Primary max content width:

`1200px`

Wide visual sections may extend to:

`1320px`

Full-bleed backgrounds are allowed, but inner content should respect the grid.

## 5.2 Grid

Desktop:
- 12-column grid
- 24px gutters

Tablet:
- 8-column grid
- 20px gutters

Mobile:
- 4-column grid
- 16px gutters

## 5.3 Horizontal padding

Desktop:
- 40px minimum

Tablet:
- 28px

Mobile:
- 20px

## 5.4 Vertical rhythm

Use an 8px base spacing system.

Recommended tokens:

- 4
- 8
- 12
- 16
- 24
- 32
- 40
- 48
- 64
- 80
- 96
- 120

Standard section spacing:

Desktop:
- 88–96px top/bottom

Tablet:
- 72px

Mobile:
- 52–64px

Do not create huge empty zones merely for decoration.

---

# 6. Breakpoints

Working breakpoints:

- Small mobile: `480px`
- Mobile / tablet boundary: `768px`
- Desktop: `1024px`
- Wide desktop: `1280px`

The site should be designed mobile-first.

---

# 7. Shape Language

## Cards

Standard radius:

`16px`

Feature / product cards:

`18–20px`

Small UI elements:

`10–12px`

Pills / badges:

`999px`

## Borders

Default:

`1px solid var(--color-border)`

Use borders more often than heavy shadows.

## Shadows

Use subtle, soft shadows only.

Suggested card shadow:

`0 8px 30px rgba(10, 77, 87, 0.08)`

Do not use strong floating-card shadows.

---

# 8. Buttons and CTA Hierarchy

## 8.1 Primary CTA

Use for:
- Shop Wipeband
- Shop Starter Kit
- Add to Cart
- Shop Refills

Style:
- deep teal background
- white text
- 48–52px minimum height
- 14–16px horizontal radius
- strong 700 weight
- visible hover and focus states

Hover:
- teal-800

## 8.2 Secondary CTA

Use for:
- See how it works
- Our story
- View FAQs
- Shop another category

Style:
- white or transparent background
- teal border
- teal text

## 8.3 Tertiary CTA

Use as text link with arrow.

Examples:

`Our story →`

`Shop refills →`

`See how it works →`

## 8.4 Amazon CTA

Amazon is a **secondary purchase path**.

Never give it equal visual emphasis beside the direct Wipeband checkout.

Preferred treatments:

- tertiary text link
- low-emphasis outline button
- small supporting line under primary purchase CTA

Preferred wording:

`Prefer Amazon? Shop on Amazon →`

or

`Also available on Amazon →`

Do not place Amazon in primary navigation.

---

# 9. Header

## Desktop

Include:
- Wipeband logo
- How It Works
- Shop
- Refills
- Our Story
- FAQ
- Cart

Optional:
- compact "Shop Wipeband" CTA on wide screens

## Mobile

Include:
- logo
- menu icon
- cart icon

Use a clean slide-over or dropdown menu.

## Behavior

Preferred:
- sticky after initial scroll
- white / lightly translucent background
- subtle bottom border
- no heavy shadow

---

# 10. Announcement Bar

Height:
- approximately 28–34px

Use deep teal background + white text.

Default working copy:

**Little everyday moments. A little less mess.**

This component may later display:
- shipping threshold
- seasonal promotion
- campaign message

Keep to one line.

---

# 11. Hero System

## Desktop structure

Recommended split:

- Copy: 42–46%
- Visual: 54–58%

The product must remain visible and understandable.

## Mobile structure

Recommended order:

1. headline
2. product explanation
3. primary CTA
4. secondary CTA
5. hero visual
6. quick benefits

## Visual requirements

Hero should show:
- child actively using Wipeband
- the band clearly visible
- tissue clearly readable
- product close-up or floating product render
- uncluttered background

Avoid:
- generic child portrait with no product use
- over-dramatic facial expressions
- unrealistic medical scenes
- excessive props

---

# 12. Section Surface System

Use a limited repeating rhythm.

## Surface A — White

Use for:
- hero
- how-it-works
- FAQ
- informational sections

## Surface B — Mint Wash

Use for:
- product insight
- feature engineering
- refill education

## Surface C — Warm Cream

Use for:
- product cards
- story cards
- commerce sections

## Surface D — Deep Teal

Use for:
- final CTA
- footer
- occasional high-impact band

## Surface E — Soft Aqua

Use sparingly for:
- testimonials
- supportive information

Avoid alternating a different color on every section.

---

# 13. Icon System

Style:
- simple line icons
- rounded stroke ends
- consistent stroke weight
- deep teal by default
- optional green accent

Suggested stroke width:
- 2px at 24px base size

Use icons for:
- school
- travel
- play
- home
- fit
- tissue layers
- tear-away
- refills
- support
- shipping

Avoid mixing:
- filled emoji-like icons
- thin technical icons
- cartoon icons

in the same UI.

---

# 14. Illustration and Character Rules

## 14.1 Primary lifestyle style

The approved landing page uses a warm, polished, stylized 3D child/lifestyle look.

For new generated scenes:
- soft cinematic lighting
- believable environment
- warm expressions
- premium animated-film-like polish
- product remains physically plausible
- no exaggerated cartoon distortion

## 14.2 Character consistency

When a recurring child character is used:
- face shape must remain consistent
- hair must remain consistent
- clothing continuity should be intentional
- Wipeband position should remain consistent
- product proportions must remain stable

Do not generate a new child identity for every section unless the page intentionally represents different families.

## 14.3 Product consistency

Wipeband must not morph between generated scenes.

Preserve:
- strap construction
- tissue holder
- print/graphic design
- closure points
- tissue-stack size
- orientation on wrist

When a real product image is available, use it as reference.

## 14.4 Legacy illustrations

Legacy cartoon/comic assets may be used in:
- Our Story
- historical storytelling
- founder/invention narrative

They should not define the main modern product presentation.

---

# 15. Product Image Rules

Preferred product assets:

1. clean isolated product render
2. three-quarter product view
3. side/wrist-fit view
4. exploded tissue-layer view
5. refill-pack render
6. packaging render

Background:
- white
- warm cream
- very pale mint

Avoid:
- busy environments behind technical product views
- excessive reflections
- unrealistic glossy-plastic appearance if the actual product is matte

---

# 16. Asset Aspect Ratios

These are default targets for Phase 04.

## Hero lifestyle

Desktop:
`16:10` or `4:3`

Mobile:
`4:5`

## Three-step How It Works cards

`4:3`

## Use-case cards

`4:3`

## Product cards

`1:1`

## Feature / engineering split visual

`4:3` or transparent product PNG/WebP

## Story teaser

`4:3`

## Testimonial portrait

`1:1`

## Campaign landing hero

Desktop:
`16:10`

Mobile:
`4:5`

---

# 17. Asset File Formats

Preferred:

- AVIF or WebP for lifestyle imagery
- WebP for product imagery
- SVG for icons and motifs
- PNG only when transparent raster artwork is specifically required

Prepare responsive sizes where possible.

Do not ship oversized source images directly to production.

---

# 18. Asset Naming Convention

Use:

`page_section_subject_variant.ext`

Examples:

`home_hero_child-using-wipeband_desktop.webp`

`home_hero_child-using-wipeband_mobile.webp`

`home_howitworks_wear.webp`

`home_howitworks_wipe.webp`

`home_howitworks_tear.webp`

`home_features_exploded-product.webp`

`home_usecase_school.webp`

`home_usecase_playdate.webp`

`home_usecase_travel.webp`

`shop_starter-kit_product.webp`

`refills_pack_product.webp`

This naming convention must be preserved in the future AI-coder prompt pack.

---

# 19. Motif System

Use small visual motifs rather than large decorative illustrations.

Approved motif behaviors:

- three short green emphasis strokes
- subtle curved arrows
- rounded line doodles
- tiny movement lines
- soft organic background shapes

Rules:
- maximum 1–2 motif families in one section
- never obscure copy
- never replace functional icons
- use transparent SVG where possible

---

# 20. Product Card System

Each product card should contain:

1. badge if relevant
2. product image
3. product name
4. one-line purpose
5. dynamic price
6. primary CTA
7. optional small Amazon link

## Badge examples

- START HERE
- FAMILY FAVORITE
- REFILLS

Avoid promotional badges such as:
- BEST VALUE
- MOST POPULAR
- SAVE X%

unless supported by real commercial data.

---

# 21. Testimonial System

Only use verified testimonials.

Recommended card structure:

- optional quotation mark
- short quote
- name/source
- optional location
- optional verified-purchase marker
- rating only if sourced

Do not fabricate:
- names
- ratings
- purchases
- customer photos

---

# 22. FAQ System

Desktop:
- two-column layout may be used for short FAQs

Mobile:
- single-column accordion

Behavior:
- first item may be open
- clear plus/minus affordance
- no unnecessary animation

Keep answers concise.

---

# 23. Commerce UX

## Primary checkout

The website should prioritize direct checkout.

Current implementation direction:
- Next.js storefront
- Stripe payment flow

The design system must remain independent of the final payment architecture.

## Cart

Recommended:
- slide-over cart or dedicated cart page
- clear quantity controls
- subtotal
- shipping note
- primary checkout button
- no distracting cross-sells

## Checkout

Keep checkout visually simple.

Do not rebuild sensitive payment handling unnecessarily if hosted Stripe Checkout is used.

---

# 24. Motion System

Motion is part of the intended finished experience and should make the site feel polished and modern without becoming distracting.

Use **Framer Motion** for reusable transitions and micro-interactions where it materially improves the experience.

Recommended:
- fade / translate section reveals on scroll
- staggered card entrances
- 8–20px vertical movement
- 180–500ms transitions depending on context
- gentle product or image hover lift
- subtle arrow/icon motion
- card hover elevation
- animated mobile navigation
- animated cart drawer
- subtle page transitions between routes
- lightweight scroll-linked motion for selected storytelling sections

Avoid:
- heavy parallax
- continuous bouncing
- auto-rotating hero carousels
- long entrance animations
- scroll-jacking
- motion that delays reading or purchase actions

All motion must respect `prefers-reduced-motion`.

## Motion implementation priority

If implementation is staged:

1. complete responsive page layouts
2. add core micro-interactions
3. add section reveal and stagger motion
4. add mobile-nav/cart transitions
5. add route/page transitions and final polish

These stages are all in scope for the finished build.

---

# 25. Accessibility

Target:
**WCAG 2.2 AA**

Minimum requirements:

- body text contrast must meet AA
- buttons must have clear hover/focus states
- keyboard navigation must work
- interactive targets minimum ~44px
- meaningful images need alt text
- decorative images use empty alt text
- content must not rely on color alone
- forms require labels
- errors must be readable and specific
- motion must respect reduced-motion settings

---

# 26. Performance Principles

The site should feel substantially lighter than the current WordPress/WooCommerce direction.

Targets:

- optimize all raster images
- lazy-load below-the-fold media
- preload only essential hero assets
- avoid large animation libraries where CSS can do the job
- keep third-party scripts minimal
- avoid unnecessary client-side JavaScript
- use responsive image delivery
- use server-rendered/static content where appropriate

---

# 27. Responsive Behavior

## Mobile priorities

On mobile, prioritize:

1. product understanding
2. CTA
3. product visual
4. how it works
5. purchase options

Do not simply shrink desktop layouts.

## Stacking

Split sections should stack:
- copy first when explanation is essential
- image first when visual understanding is essential

## Cards

Desktop:
- 3-card rows

Tablet:
- 2-card rows

Mobile:
- single column or horizontal swipe only when useful

---

# 28. Global Components

The following should be reusable components:

- AnnouncementBar
- Header
- Hero
- BenefitStrip
- ContextIconRow
- HowItWorksSteps
- ProductFeatureSplit
- UseCaseCards
- ProductCard
- ProductGrid
- RefillBanner
- TestimonialCard
- StoryTeaser
- FAQAccordion
- EmailCapture
- FinalCTA
- Footer

The detailed copy behavior for these components is defined in `18_GLOBAL_COMPONENTS.md`.

---

# 29. Next.js Implementation Guidance

The design system is platform-agnostic, but for the Next.js prototype:

## Recommended implementation pattern

- define colors and spacing as CSS variables
- map tokens into Tailwind config if Tailwind is used
- create reusable React components for all global patterns
- keep page copy separate from layout where practical
- use the canonical Markdown bank as the content source of truth
- keep commerce logic separate from visual components
- keep asset paths predictable
- do not hardcode repeated design values throughout components

## Preferred architecture

`/components`
- layout
- commerce
- sections
- ui

`/content`
- canonical page content or structured derivatives

`/public/assets`
- product
- lifestyle
- icons
- motifs
- brand

The final implementation structure may evolve during Phase 05.

---

# 30. AI Coder Guardrails

When this file is passed to an AI coding system:

The coder must:

1. preserve the copy exactly unless explicitly asked to edit it
2. preserve CTA hierarchy
3. keep Amazon visually secondary
4. use tokens rather than arbitrary colors
5. use reusable components
6. keep the site mobile-first
7. avoid adding decorative sections not in the content architecture
8. avoid unsupported product or health claims
9. keep visual placeholders clearly labeled until final assets exist
10. respect the asset naming convention
11. preserve accessibility
12. optimize images and page performance
13. avoid adding unnecessary dependencies
14. keep Stripe/payment logic isolated from presentational code

---

# 31. Phase 04 Handoff Method

Visual asset generation should happen **one section at a time**.

For each section:

1. identify the page + section
2. use the canonical copy
3. define the exact visual role
4. define aspect ratio / dimensions
5. define required product visibility
6. define character/reference needs
7. receive the user’s reference assets
8. generate only the required visual
9. review for continuity
10. approve and add the final filename to the asset manifest

Do not generate multiple unrelated assets in one batch when character or product continuity matters.

---

# 32. Design Freeze Rules

The design system becomes **FROZEN v1** after:

- palette is approved
- typography is approved
- primary/secondary CTA behavior is approved
- card system is approved
- hero structure is approved
- image style is approved
- mobile behavior is approved

After freeze, changes should be logged rather than silently altered.

---

# 33. Current Open Design Decisions

The following are intentionally still open:

- final verified brand HEX values
- whether Nunito Sans + Inter remains the final font pair
- exact cart pattern
- hosted Stripe Checkout vs custom payment flow
- exact product-card badge logic
- final icon source / custom icon set
- final character set and recurring character identities
- final motion intensity
- final mobile hero composition

These can be resolved during the landing-page visual-production and prototype stages.


# 34. Theme Scope

The website is **light-theme only**.

Do not implement:
- dark mode
- theme switcher
- automatic dark-mode behavior based on OS preference

The palette and visual hierarchy are designed as one consistent light experience.

# 35. Placeholder Completion Standard

Even before final imagery is available, the site should look complete.

Each placeholder should:
- use the correct final aspect ratio
- be styled with the Wipeband visual system
- preserve the intended crop/layout behavior
- feel intentional rather than like a missing-image box
- be swappable later without changing the surrounding layout

The build should be suitable for client presentation before final assets are inserted.
