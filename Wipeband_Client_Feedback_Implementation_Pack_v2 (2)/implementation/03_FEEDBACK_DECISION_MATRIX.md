# Client Feedback Coverage Matrix

Every source-numbered point from the client review is mapped here. Original document skips item 14, so IDs preserve its numbering (C01…C13, C15…C24). **No item may be marked complete until verified in the actual code/browser.**

| ID | Source # | Intent | Required outcome | Scope/status | Dependencies |
|---|---:|---|---|---|---|
| C01 | 1 | Hero clarity | Explicit runny nose wearable-tissue explanation, stronger hero and clear practical CTA | Homepage hero, metadata; video contract: Pending | Need client media or placeholder |
| C02 | 2 | First-screen simplicity | Remove/relocate early competing benefit strip | Hero + lower benefits: Pending | No asset |
| C03 | 3 | CTA hierarchy | Primary direct Add to Cart / Buy now with live price; tertiary Amazon text link | All purchase entry points: Pending | Stripe/stock audit |
| C04 | 4 | Move Wear Wipe Tear | Compact educational three-step immediately after hero | Homepage + navigation anchor: Pending | Asset slots |
| C05 | 5 | Short demo | 6–10s silent loop near hero; optional reuse by purchase; fallback poster | Media module ready now; actual media later: Pending | Video or GIF supplied/approved |
| C06 | 6 | Problem insight | Move short sleeve-vs-tissue comparison to homepage high up | Homepage insight: Pending | No asset |
| C07 | 7 | Independence benefits | Cleaner / Independent / Ready below problem | Benefits section: Pending | Wording proof |
| C08 | 8 | Age positioning | Client asks 2–6; validate specification and apply consistently | Hero, product, FAQ, metadata: Pending | Conflicts with live 2+ wording |
| C09 | 9 | Real reviews | Actual sourced Amazon/Instagram/customer quotes and direct source links; remove unverifiable proof | Homepage, shop and UGC: Pending | Verified originals/permissions |
| C10 | 10 | Trust beside Buy | Soft silicone, returns, secure checkout, refillability, patent as approved | Commerce modules: Pending | Claim & policy confirmation |
| C11 | 11 | Starter Kit purchase module | Dominant 19.95 starter kit, 1+5 packs, 30 layers, pattern control, direct add cart | Homepage shopping module: Pending | Price and variants from real catalog |
| C12 | 12 | Family Bundle remove | Hide bundle promotions; suspend sale until mechanics exist | Shop, search, product/catalog/cart: Pending | Current homepage already has only 2 options |
| C13 | 13 | Visual six-layer explanation | Consumer benefit headline and removable layer visual | Homepage and How It Works placeholder: Pending | Approved six-layer animation/visual |
| C15 | 15 | Parent-friendly language | Simplify engineered terms and technical jargon | Refills + global copy: Pending | No asset |
| C16 | 16 | Less repetition | Shorten redundant sections and prevent duplicate selling points | Homepage/secondary pages: Pending | Content review |
| C17 | 17 | Homepage order | Hero > demo > problem > benefits > layers > uses > reviews > starter > trust > FAQ > CTA | Homepage: Pending | Preserve SEO/accessibility |
| C18 | 18 | Mobile sticky cart | Show price+Add to Cart after hero; avoid nav overlap | Mobile 375–768: Pending | Cart UI/state |
| C19 | 19 | Direct pattern-to-cart | Select pattern + add to cart from homepage | Home/cart/Stripe: Pending | Server verified variant and availability |
| C20 | 20 | Objection-led FAQ | Answers on wear, used tissue, age, wipes, fit, washing, returns | Home FAQ/FAQ page: Pending | Age/returns/care facts |
| C21 | 21 | UGC after use cases | 3–4 authentic vertical clips/photos, links and captions | Home UGC slots: Pending | Source/permission |
| C22 | 22 | Brand payoff | Promote within-reach line, demote cleaner sleeves to supporting line | Hero/ending/CTA: Pending | No asset |
| C23 | 23 | Founder humanity | Add Why we invented, Sachin+Tiana, relevant source/link | Our Story/home small preview: Pending | Client-approved exact inventor bios |
| C24 | 24 | Core customer question | Consistently explain why a wearable tissue matters vs ordinary tissue | Homepage and cross-site copy: Pending | No asset |

## Resolved interpretation

The client asks to **remove the Family Bundle** and says selling mechanics are not ready. It is already absent from the current homepage but appears in Shop and a public product route. Keep reusable implementation code/archived content only if useful; remove or disable every public purchase entry until confirmed operationally sellable. Do not silently delete historical orders or configurations.

The review has slightly varying ideal homepage sequences. Use the latest explicit numbered homepage order (item 17), with the 3-step demonstration immediately after hero and the short problem section directly after it. This is the most specific direction. Keep media near hero, with an approved fallback.

`Ages 2–6` is client-requested messaging, not automatically a validated product specification; historical sources conflict. Confirm before exposing it to customers.

`Secure Checkout` can only appear if the deployed payment flow is actually configured and secured. `30-day returns`, `skin-friendly silicone`, `Patented design` require factual/policy verification.
