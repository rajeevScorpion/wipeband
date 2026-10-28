# Shared handoff

Updated: 2026-10-28 (Asia/Kolkata). Usage: unknown.

Stopped at: six shared Ponytail skills installed and validated; project scope
clarified; storefront motion + admin order-desk draft created and browser-checked.
Earlier application TypeScript, lint and build checks passed before mockup work.
Canonical skills: `.agents/skills/`; shared context: `docs/project/`.

In flight: local prototype/context changes on chore/studio-adoption. No application
behavior changes or helper agents. Local preview server at 127.0.0.1:3011
(Python PID 37212) intentionally left running for review; Next dev server stopped.
Check git status/log for the current checkpoint. Nothing pushed or deployed.

Next session: review `docs/product/mockups/storefront-operations.html` with the
owner (Expressive/Quiet and Desktop/Phone controls). Draft, not agreed/built.
Preview: http://localhost:3011/storefront-operations.html . If stopped, restart
with `python -m http.server 3011 --bind 127.0.0.1 --directory docs/product/mockups`.
Owner will supply images and plans a Vercel preview. Minimal operational storage
is approved. GitHub pushes trigger Hostinger production deployment.

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

Open: see CURRENT_STATE.md. Browser QA, live payments, production parity and
client-review acceptance are unverified. Build/type/lint passed locally.
