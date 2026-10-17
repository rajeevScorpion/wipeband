# Commerce, Policy and Trust Guardrails

## Preserve checkout as it actually exists

Before editing, inspect whether the site currently uses live Stripe, Stripe test mode, catalog metadata, a cart database, webhooks, shipping logic or an MCF interface. **Do not assume** a simple static-cart scaffold from the historical prompt pack still reflects the deployed site.

- Use one source of truth for SKU, price, pattern/variant ID, stock availability and Stripe mapping.
- Allow homepage pattern selection and add-to-cart, with selected state visible, keyboard accessible and preserved until cart/checkout.
- The add-to-cart CTA must not misrepresent payment completion; never fake a paid order.
- Test variant `Dinosaur`, `Unicorn`, `Wonder Wings` from homepage through cart to Stripe session creation in a safe test environment.
- Preserve applicable cart taxes, currency, quantity logic, shipping calculations and verified analytics. Use product configuration to compute total, not client input values.
- Validate cart/checkout server-side and prevent duplicate submissions where reasonable.
- Use site state to handle unconfigured checkout safely; never expose Stripe secrets.
- Direct checkout CTA dominates; Amazon is a small text link after it and must not look like an equal primary action.

## Family Bundle

Client says mechanics for bundle sales are not ready. Prefer a feature flag to hide all bundle promotional and purchase UI, remove it from catalog feeds/structured data if misleading, prevent new bundle cart submissions and mark/redirect route appropriately. **Do not delete existing order records, SKU IDs or code**. Confirm operations with the user before re-enabling.

## MCF / Stripe returns — research-supported separation

**Marketplace purchase** (customer buys on Amazon): customer uses Amazon marketplace order and its applicable returns flow.

**Wipeband.com purchase** (Stripe direct payment, Amazon MCF ships): Wipeband remains merchant/customer-support owner. MCF can facilitate return to Amazon's fulfillment center via Seller Central/RMA, or merchant can send return to its own location. Amazon does not issue the customer refund on the merchant's external Stripe purchase: Wipeband must manage/refund through its payment process and order records. For returns to Amazon MCF, the merchant/customer must arrange/pay return postage under the applicable policy, and returned-condition inspection affects inventory handling.

Official sources:
- https://supplychain.amazon.com/mcf/faqs
- https://supplychain.amazon.com/blog/how-to-process-multi-channel-fulfillment-mcf-returns

Do NOT claim 30-day hassle-free/free return shipping, specific 1–2 processing/3–7 delivery times, Amazon-handled direct-store refunds, or instant returns before business/legal approval and actual process validation.

## Product/factual claims requiring confirmation

- Product age: client requests `2–6`; live FAQ currently says `2 and up` including preteens. Resolve discrepancy with client/packaging/product instructions.
- Material: silicone known from visual refs, but `skin-safe`, `hypoallergenic`, etc. require support.
- Patent 12,383,048 currently displayed; verify owner record, wording, products covered and legal signoff before promoting as trust signal.
- 1 band, 5 packs and 6 layers each; prices $19.95 / $5.99; verify commercial catalog and active variant mapping.
- Existing `30-day returns` and delivery promises are unverified policy claims from deployed site, not automatically approved.
- Real reviews require original exact quote, customer consent/license, source URL and approved attribution; no fabricated `verified` icons.
- Testimonials about a two-year-old do not independently substantiate an age-fit claim.

## Legal page handling

Current privacy/terms/shipping text includes factual/legal promises not resolved by the original copy checklist. Freeze and flag existing text for legal/owner review, and do not introduce new legal policy wording without signoff. Audit actual Stripe handling, analytics/cookie consent, children's marketing/privacy language and fulfillment sharing before publishing revised policy.
