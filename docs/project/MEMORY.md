# Shared project memory

- The owner wants Claude Code and Codex to use the same skill files and shared
  project context, scoped to this repository. Why: switching tools should not
  lose project history or require manual synchronization. Apply by updating
  docs/project context directly and using `.agents/skills` as the single source.
- Existing implementation inputs include `canonical-copy-bank/`, `prompt-pack/`,
  `seed-data/`, and the client feedback implementation pack. Consult the relevant
  source for future tasks; this setup did not validate their completeness.
- Owner clarification, 2026-10-28: the initial prompt pack produced the website;
  the second pack contains client feedback, which the owner reports has been
  implemented. Apply by checking the actual checkout against the feedback;
  stale Pending tracker entries are not proof that nothing was implemented.
- Production is hosted on Hostinger and automatically deploys after GitHub
  pushes. Treat a push as deployment-capable. The owner plans a Vercel copy for
  HTTPS preview/debugging; no preview URL has been supplied yet. The owner's
  reported HTTPS limitation concerns their current setup, not all Hostinger sites.
- Minimal operational storage is now approved for order/fulfillment/retry state;
  this supersedes the initial no-database preference only for that narrow scope.
  Images remain repository assets, supplied by the owner for contextual placement.
- Wipeband.com is the existing public website being redesigned/redeveloped in
  this React/Next.js project. Core products are wristbands and refill tissue packs;
  Amazon US sales already exist. Refill repurchases do not imply subscriptions.
- Aim for a small admin order/exception workflow and Amazon MCF fulfillment.
  Owner confirms both products use FBA inventory. Current Wipeband.com sends
  shoppers to Amazon and does not take website orders. Direct checkout and the
  MCF handoff are new work; MCF/API eligibility/access still needs assessment.
- Customer emails: order confirmation and shipment tracking. Merchant checks
  admin rather than receiving new-order alerts. Queries/bulk orders use inbox.
- Visual direction: retain current tokens and brand, add purposeful pointer and
  scroll motion with polished product storytelling. Avoid generic illustrations
  and effects. Owner-supplied final images are pending. Prototype before building.
- Owner correction, 2026-10-28: the existing storefront content and section order
  are approved. Earlier mockup changed both and was rejected. Why: visual work
  should improve an already considered page. Apply by capturing existing text,
  catalog and sequence, then validating content fidelity in every visual study.
- Owner wants a professional, alive, experimental-but-grounded visual treatment:
  intentional textures/patterns/artwork, centered composition and meaningful
  motion. Focus on the landing page first; the admin needs a later, deeper
  operations design. Small scope is not permission for a superficial result.
- Tool honesty: the first draft used CSS transforms, not Three.js. Study 02
  actually embeds the existing Motion library; it introduces no WebGL/Three.js.
- Baseline correction: assessments and mockup studies 01/02 used stale app base
  f49359f. GitHub v2 commits f682182/cb2e76d contained the client's implementation.
  They are now integrated into local main with the shared tooling. Do not reuse
  old absence-of-feature findings or mockup content as current facts. Check
  upstream/deployed parity before future design work. Owner requested deleting
  fully merged local branches after verification to avoid this confusion.

- Owner color rule, 2026-10-28: do not use orange accents anywhere on the
  website. Use existing dark teal #0A4D57 (teal-700), hover #073B43
  (teal-800), and matching teal tints. Why: orange violates the approved
  design system. Apply to headings, CTAs, navigation, icons and illustrations;
  do not reintroduce hardcoded #F57642/#E0632F in future visual work.

- Website desktop mockups must span the viewport without an outer box, border,
  radius or surrounding gutter. Keep inner content centered. A device frame is
  appropriate only for the Phone preview (owner correction).
