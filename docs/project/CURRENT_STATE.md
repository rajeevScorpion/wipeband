# Wipeband current state

Updated: 2026-10-28 (Asia/Kolkata). Usage: unknown.

## Summary

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
- A clickable storefront/order-desk draft is saved at
  `docs/product/mockups/storefront-operations.html`. It uses the existing logo,
  embedded fonts and tokens; fictional orders and illustrative product shapes.
- Hostinger auto-deploys GitHub pushes; Vercel testing copy is planned by owner.

## Validation

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

## Open / unverified

- Owner reports the client feedback pack was implemented. Some local code
  conflicts with its requirements; unchanged Pending tracker entries alone
  do not establish implementation status. Reconcile code and preview itemwise.
- Checkout selects Stripe prices server-side, but pattern information is not
  forwarded and success UI does not verify payment. Live payment/stock/config
  state is unverified; no webhook, order store, or fulfillment adapter found.
- Tracking always reports an order found. Feedback and school inquiry UI do
  not send submissions. Contact can show success on failure; the contact and
  feedback APIs acknowledge without delivery/storage. Minimal operational
  storage is now approved for orders/fulfillment/retries; provider undecided.
- Family Bundle is still offered; age/material/patent/policy/review claims,
  Amazon destinations, and commercial values need confirmed sources.
- Most image directories are empty; logo is present. Owner will supply images.
  No reduced-motion handling found in source. Browser accessibility, visual,
  responsive and functional QA, production parity, and deployments are unverified.
- No application test script or tracked CI workflow. Deployment behavior is
  owner-confirmed. Current production/preview URLs are not confirmed.
- Upstream changes require an explicit merge into the shared skill copy.

## Next

Review the prototype's Expressive/Quiet motion and compact admin workflow with
the owner. Final images and Vercel URL are pending. Owner confirms FBA inventory;
the existing public site only redirects to Amazon. MCF availability/API access
and SKU mappings still need assessment before implementation. Routine order
email is customer confirmation + tracking only; merchant checks admin. No push,
deployment or production commerce changes have been made. Local work remains
on chore/studio-adoption.
