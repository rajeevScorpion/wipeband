# Approved-Direction Copy and Layout Patch Specifications

> These are targeted **new draft copy replacements** to implement alongside existing content. Do not dump all this text on the page or rewrite the complete site. Preserve existing content elsewhere unless superseded. Verify client-specified factual values first.

## Homepage final target order

1. Hero with an in-use video slot, essential identification, CTA and mini `Wear / Wipe / Tear` cue.
2. Immediate compact 3-step explanation.
3. Short problem insight.
4. Three consumer benefits.
5. Six-layer demo/explanation.
6. School / play / travel use cases.
7. Real reviews/UGC (source-backed; placeholders only until provided).
8. Dominant Starter Kit quick-purchase module with refills as small cross-link.
9. Reassurance around purchase.
10. Objection-driven FAQ.
11. Final CTA and short founder-story access.

**Optional short founder preview** may be adjacent to social proof or included as a small link/module without restoring homepage bloat.

## H01 — Hero

**Headline**: No more wiping runny noses on sleeves.

**Subheading**: Meet Wipeband, the wearable tissue for little ones.

**Body**: Soft, refillable tissues worn right on their wrist, so kids can wipe their nose wherever they are.

**Mini instructional cue**: Wear → Wipe → Tear

**Primary CTA**: `Add to Cart — $19.95` (only when pattern is selected and active price is confirmed; derive label from catalog), or `Choose a pattern` if selection is still required. Avoid a separate Shop journey for the main starter purchase.

**Secondary**: `See how it works` (anchor to immediate demo).

**Tertiary link**: `Prefer Amazon? Buy here →`.

**Optional qualified age line**, ONLY after product-owner approval: `Designed for kids ages 2–6.` Otherwise omit, do not fall back to unsupported 2+.

Media slot: `home_hero_usage_loop.mp4` / `webm` 6–10 seconds, silent autoplay loop, playsinline, poster fallback. No actual media is provided in this pack. The tissue **must face and touch the nose correctly** in any future asset.

Remove the competing `Cleaner kids / Happier parents / Anytime anywhere` strip from above-the-fold; rework lower down.

## H02 — Immediate 3-step sequence

**Section heading:** Wear it. Wipe it. Tear it.

**Wear:** Put Wipeband on like a watch.

**Wipe:** Wipe their nose on the soft tissue.

**Tear:** Remove the used layer. A fresh one is ready underneath.

Support note: The used tissue is removed and disposed of after wiping; children do not need to keep wearing the used layer.

Visuals: three real-use image slots; existing asset placeholders acceptable until approved; do not fake product action.

## H03 — Problem insight

**Heading:** The tissue is far away. The sleeve isn't.

Kids don't stop playing to look for a tissue.

- Tissue box? Across the room.
- Tissue pack? Somewhere in the backpack.
- Sleeve? Right there.

**Payoff:** So we put the tissue where kids already reach: their wrist.

## H04 — Benefits

**Cleaner:** Less wiping on sleeves and clothes.

**Independent:** A tissue kids can reach for themselves.

**Ready:** School. Playdates. Travel. Anywhere.

Use calm icons and restrained, factual phrasing. Avoid implying disease prevention or perfect cleanliness.

## H05 — Six-layer demonstration

**Heading:** One little tissue pack. Six fresh wipes.

**Copy:** Six soft tissue layers, ready one after another. After a wipe, remove the used layer to reveal a fresh one underneath.

Visual slot: layered pad diagram with `1–6` numerals and peel-away motion; no CAD-brown artifacts. The existing product geometry remains true to approved photos. Until approved media is supplied, create a clean labeled placeholder/static UI explanatory diagram, not a fabricated product photo.

## H06 — Use cases, UGC and trust

Keep three everyday cards School / Playdates / Travel but minimize repetition.

**UGC heading:** Wipeband in real life.

Use linked, permissioned, attributable parent customer images or short clips for Preschool / Soccer / Road trip / Airplane. Until actual media is supplied, show minimal styled visual placeholders without invented customer content, names, purchase badges or ratings.

**Reviews heading:** Parents get it. Kids love wearing it.

Do not invent review text: load only owner-supplied approved testimonial content with exact quotes, attribution and deep links. If insufficient genuine content, hide empty carousel rather than manufacture credibility. Audit existing `Sarah K.` and `Henry M.` labels and remove `Verified Family Buyer` unless provenance is recorded.

## H07 — Single dominant Starter Kit purchase module

**Heading:** Everything they need to start.

**Product:** Wipeband Starter Kit

**Price:** `$19.95` currently requested by client and shown on existing site; **always derive active price from validated product/checkout configuration**, not from hardcoded copy alone.

Contents shown only after final catalog verification:
- 1 reusable Wipeband
- 5 tissue packs
- 30 fresh tissue layers total

**Variants:** Dinosaur / Unicorn / Wonder Wings. Validate variant IDs, actual SKU/stock availability and Stripe Price ID mapping.

**CTA:** `Add to Cart — $19.95` (dynamic price).

**Supporting link:** Already have Wipeband? Shop refills →

Amazon appears once as a small tertiary text link. No equal-height Amazon button.

Hide Family Bundle offer and any unsupported promo/value badge. Do not leave a purchasable bundle accessible through search, direct route, cart or checkout unless authorized and operationally supported.

## H08 — Trust by purchase CTA

Candidate claims to use **only after confirmation**:
- Soft, kid-friendly silicone [material/safety claims approved]
- 30-day returns [actual returns policy]
- Secure checkout [real Stripe configuration/security]
- Refillable and reusable [confirmed product characteristics]
- Patented design [patent status verified]

Display only supported signals. Do not show empty badge shells.

## H09 — Objection-first FAQ

Write concise truthful answers for:

1. Will my child actually wear Wipeband? (Comfort/fit; avoid guarantees.)
2. What happens after they wipe? (Used layer removed, new layer underneath.)
3. Does the used tissue stay on their wrist? (Explain tear and disposal.)
4. Is it comfortable? (Approved material/fit facts only.)
5. What ages does it fit? (Validated age range only.)
6. How many wipes are in each pack? (Six if confirmed.)
7. Can it be used at preschool or school? (Product usage context; institution rules vary.)
8. Can I wash the band? (Owner-approved steps only.)
9. What if my child doesn't like it? (Confirmed direct-store return policy and distinction from Amazon marketplace.)

Keep fuller content on `/faq`; homepage shows a small selection, perhaps 5–6.

## H10 — Final CTA / payoff

**Primary payoff:** The tissue little noses can actually reach.

**Support line:** Cleaner sleeves start here.

**CTA:** `Choose a pattern` or `Add to Cart — $19.95` depending on state. Amazon low-emphasis link only.

## Secondary pages

**Refills:** Replace `Engineered specifically for all Wipeband versions` with **Made to fit every Wipeband** only after universal compatibility is confirmed. In other contexts replace unnecessary `multi-layer absorbent tissue packs` with `soft tissues`, but keep exact pack/layer counts where specifications matter.

**How It Works:** Move/demo the peel-away logic clearly, pair six-layer module with how to dispose of a used layer, and use verified product usage instructions.

**Shop:** Prioritize Starter Kit; render Refills as secondary. Hide Family Bundle while mechanics are not in place; remove unsourced `Bestseller`, `Best value`, `savings`, unapproved shipping assertions or testimonial claims.

**Our Story:** Add `Why we invented Wipeband`, using factual existing About Us text as **source material, not verbatim medical/infection claims**. The legacy About Us page has a note signed by Sachin Yadav and does **not** itself establish Tiana's complete role/biography. The client requests a section naming Sachin and Tiana as co-inventors. Obtain owner-approved wording/relationship/permissions before publishing; link Tiana's name to `https://tianaswebsite.com/` (opened external tab with safe rel attributes if appropriate). Do not fabricate personal claims or photos.

**Footer/header:** Preserve routes and layout; replace only copy/text emphasis tied to approval. Avoid changing navigation taxonomy unless necessary.
