# Wipeband — Client Feedback Implementation Pack v2

**Client review:** 26 September 2026  
**Live reference reviewed:** https://darkslategrey-mouse-465156.hostingersite.com/  
**Build framework:** Next.js (existing repository first)  
**Important:** No source code/repository was supplied with this review. Public site content was inspected, not source code, private Stripe state or authenticated checkout operations.

## Primary requirement: CHECKPOINT BEFORE ANY CHANGES

**First and mandatory:** Read `implementation/01_CHECKPOINT_AND_DISCOVERY.md` and preserve a recoverable checkpoint of the *actual existing site code and deployment configuration*. Do not edit source, copy or assets before completing baseline checks and recording the checkpoint ID. If the repository has no version control, create a documented safe backup first. Never commit credentials or secrets.

## Goal

A controlled **conversion-focused revision of the existing site**, not a rebuild. Preserve current visual identity, light theme, responsiveness, finished look, animations/micro-interactions, existing routes, and working commerce configuration unless a client request explicitly supersedes it.

At the end, every requested feedback item must have exactly one honest status: `Implemented & verified`, `Already present & verified`, `Partially implemented`, `Blocked - client input`, `Deferred by approval`, or `Not done`.

## Read this pack in order

1. `01_CHECKPOINT_AND_DISCOVERY.md`
2. `02_LIVE_SITE_VS_SEEDED_AUDIT.md`
3. `03_FEEDBACK_DECISION_MATRIX.md`
4. `04_COPY_AND_LAYOUT_PATCHES.md`
5. `05_COMMERCE_AND_TRUST_GUARDRAILS.md`
6. `06_VISUAL_ASSET_CONTRACT.md`
7. `07_PHASED_IMPLEMENTATION.md`
8. `08_ACCEPTANCE_AND_REGRESSION.md`
9. `09_CLIENT_REPORTING_PROTOCOL.md`

Then inspect `original-seeded-copy-bank/` and `original-seed-data/` as historical reference; they are **not** an instruction to reset the existing live work. Client review supersedes older copy decisions where explicitly in conflict. The actual codebase determines implementation details, after reading its project/working contract, handoff rules and environment configuration.

## Non-negotiable guardrails

- Existing site must remain functional and recoverable throughout implementation.
- Do not deploy broken or unverified checkout/analytics/fulfillment.
- Direct Wipeband.com checkout is primary; Amazon is a lower-emphasis alternative.
- Light theme only; no dark mode.
- Fully responsive and presentation-ready at each phase.
- Keep subtle motion, including current Framer Motion effects, unless accessibility/performance require changes.
- No fabricated customer reviews, names, verified-buyer badges, images, discounts, health claims, factual product specifications or service policies.
- **Approved final visual production is separate.** Implement asset slots and fallback placeholders; real demo/UGC needs actual media/approval.
- Do not claim changes were incorporated merely because a task was planned. Report only tested results as complete.
