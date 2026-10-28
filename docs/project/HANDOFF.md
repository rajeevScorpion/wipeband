# Shared handoff

Updated: 2026-10-28 (Asia/Kolkata). Usage: unknown.

Stopped at: consolidating local main with GitHub cb2e76d, including f682182
checkout/feedback implementation, plus all shared tooling/context commits.
Earlier assessments and both mockups used a stale app base and are obsolete.
Canonical skills: `.agents/skills/`; shared context: `docs/project/`.

In flight: verification complete; local merge checkpoint on main. Application source matches the
latest fetched origin/main, with a subsequent approved color correction: hero
and starter purchase buttons inherit primary dark teal #0A4D57 / hover #073B43.
Browser computed-color checks passed for both. No global token changes.
Obsolete mockup preview servers on port 3011 stopped. Existing port-3000 app
server (PID 38600, not started by this task) left untouched. Nothing pushed.

Next session: continue from updated local main and freshly assess v2 before
any new mockup. Do not review studies 01/02 as current. Current local site is
http://localhost:3000/ ; headings match the captured Hostinger deployment at
https://darkslategrey-mouse-465156.hostingersite.com/ .
Owner will supply images and plans a Vercel preview. Minimal operational storage
is approved. GitHub pushes trigger Hostinger production deployment.

Critical correction: preserve the current v2 storefront's data, text and section
order in mockups. Study 02's audit was against the old base f49359f, not the
deployed version. Its artifact checks do not establish current content fidelity.
Focus on the landing page first; admin needs a more considered operations design.
Source, content manifest and meaningful artifact checks are in mockups/src/.

MCF context: FBA inventory exists. Existing public Wipeband.com sends shoppers
to Amazon and takes no direct orders. Need to verify MCF availability, SKU
mapping and connector/API access. No existing web-to-MCF integration confirmed.
Emails: customer order confirmation + shipment tracking only. No merchant order
alerts; merchant checks admin. Contact/bulk queries go to inbox.

Correction carried forward: owner reports client feedback was implemented.
Reconcile actual code and preview with the pack; its Pending tracker may be stale.
Local demo-only order/support flows and checkout gaps remain recorded in status.

Owner check: confirm Claude sees the shared skills. Codex discovery succeeded.
Confirm the current production and future Vercel URLs when needed for testing.

Recovery: run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/setup-shared-skills.ps1`
if this checkout has moved or Claude's skill junction is missing.

Open: see CURRENT_STATE.md. Live payments, MCF and full client-review acceptance
remain unverified. TypeScript/lint pass; isolated production build passed (27/27).
Checkout rejection checks (empty cart, disabled bundle, invalid pattern) passed;
disabled bundle page returns 404. No valid payment/fulfillment was submitted.
The adoption branch is fully incorporated; owner authorized removal after checks.

Latest correction: all runtime orange accents replaced with existing dark teal
tokens, including the sleeve headline, navigation, buttons and placeholder art.
Headless homepage computed-color check, source scan, lint and TypeScript pass.
No content/order changes and nothing pushed. Keep orange out of future UI work.

Current review: hero study 03 at http://localhost:3011/hero-options.html.
Owner requested two supplied hero scenes, transparent product overlay and fluid
wave. Built as a standalone mockup; no live hero changes. Await owner selection.
Preview server: Python loopback port 3011 (exec session 58067). Source assets in
public/assets/sections remain owner-supplied untracked files.

Study 03 latest revision removes the desktop outer frame, reduces the classroom
scene scale and enlarges the product overlay. Same preview URL. Preserve this
full-width desktop review convention for subsequent website mockups.

Latest hero image: Hero_option_01-wider.png replaces option 1 in the mockup.
Natural fade is preserved without an additional desktop fade overlay.
