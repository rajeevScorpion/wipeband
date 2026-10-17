# Phase 0 — Mandatory Checkpoint and Codebase Discovery

## STOP gate — no editing until saved

1. Identify the actual repo/worktree, git branch, uncommitted modifications, deployment provider/environment, currently connected storefront, checkout mode, analytics, forms, MCF integrations and image handling. Read existing project-specific agent/working-contract documents and follow them; do not override project guardrails from this pack.
2. Record `git status`, current SHA, deployment URL, environment type, package lockfile, build command and test scripts. Do not print any secret values.
3. If worktree has changes, preserve them safely without accidentally incorporating unrelated work: create a dedicated snapshot commit only with user-authorized files, otherwise save a protected git stash/patch or nonsecret backup. **Do not overwrite uncommitted work.**
4. Create a **new branch** for this client revision, e.g. `review/sep26-conversion-pass`, from a known baseline. Save a unique annotated tag/checkpoint on the pristine baseline, e.g. `checkpoint/wipeband-before-sep26-review`. If tagging is prohibited, record the immutable SHA in `CHECKPOINT_REPORT.md`. If no git repository exists, take an external backup/export plus hash manifest, excluding .env, secrets, customer data and keys.
5. Save `CHECKPOINT_REPORT.md` (checkpoint ID, restore command/process, checked deployment, current working tree state, current URL, baseline known issues). Test the restore feasibility; do not actually reset user changes.
6. Run baseline typecheck/lint/build/tests where available, and snapshot main pages at 375/768/1024/1440px if browser tooling is available. Record known failures before editing.
7. Audit current copy source (CMS, JSON, TSX, Markdown), product config, variant keys, cart/checkout route, form handlers, tracking, Stripe configuration, order success/cancellation, legal pages, SEO and assets. Do **not** presume the repo matches our historical seed exactly.
8. Produce a small mismatch/decision log; do not delete code or disable routes until the preservation strategy is clear.

## Explicit return point

Before Phase 1, report the checkpoint identifier and any environment risks. The coder may then proceed automatically where safe; ask user only if necessary for destructive operations, policy ambiguity, live payment configuration, or authorization.

## Recovery requirement

Every phase ends in a tested commit/checkpoint, with a concise changelog and rollback reference. Never force-push, rewrite main branch or overwrite deployment configuration.
