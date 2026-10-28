# Shared working contract

## Context and handoff

- Both Claude and Codex read and update these same repository files:
  `CURRENT_STATE.md` (status), `HANDOFF.md` (resume point), `MEMORY.md`
  (lasting preferences and facts), and `DECISIONS.md` (confirmed decisions),
  all in `docs/project/`.
- Read handoff first, then status, this contract, and memory. Update status
  after meaningful work; update handoff before switching tools or ending a
  session. Record checks honestly and leave unverified features unverified.
- Shared docs are the authority for project context. Do not create parallel
  `.codex/project-status.md`, `.codex/handoff.md`, root status/handoff files,
  or project memories in a tool's private memory directory. If a host requires
  an additional index, it should point here rather than duplicate context.
- Existing equivalents and prior decisions must be preserved. Keep documents
  concise, replace stale facts, and never put secrets in them.

## Project overrides for Studio Method

These rules override the upstream skills' host-specific defaults.

- Canonical skills: `.agents/skills/`. Claude's `.claude/skills` is a directory
  junction to those files. Resolve scripts and references from the canonical
  skill directory; there is no `CLAUDE_PLUGIN_ROOT` in this installation.
- Skill names such as `catch-up`, `check-out`, and `playbook` mean the local
  skill folders. Ignore plugin namespaces when resolving a cross-reference.
- `AskUserQuestion`, Read/Edit/Write, Grep/Glob, web tools, timers, and monitor
  names mean the current host's equivalent capability. If no question UI is
  available, ask in chat. Do not pretend unavailable tools exist. Timers are
  optional; never claim background monitoring unless actually configured.
- Model names are examples. The current host may plan, execute, and review
  directly. Helpers are optional and must follow the host's permissions and
  capabilities. Do not change model, branch, or stack merely to match a skill.
- The product-lead role is `.agents/roles/product-lead.md`. Claude can also
  discover it through `.claude/agents`. In Codex, read that role and perform
  its read-only review directly, or delegate only when permitted and useful.
- All references to project memory, auto-memory, or `MEMORY.md` mean
  `docs/project/MEMORY.md`. Use additional files under `docs/project/memory/`
  only when needed, and link them from that shared index. The teaching log is
  `.agents/skills/teach/learning-log.md`, shared by both hosts.
- `harvest` and `forge` work on these local skills when requested. Propose
  upstream contributions separately. Marketplace update commands do not update
  this shared copy; preserve adaptations when deliberately merging an update.
- Keep the existing Next.js stack and current branch conventions. Installation
  alone is not full codebase adoption or permission to scaffold/migrate.
- No database is planned. Ship owner-supplied images in repository assets.
  GitHub pushes trigger Hostinger deployment; local validation does not authorize
  a push. The owner plans a Vercel testing copy and will provide its URL.
- The owner reports client feedback was implemented. Reconcile review items
  against current code; do not treat the pack's unchanged Pending tracker as
  evidence that all requests remain unimplemented.

## Collaboration and completion

- Prefer one active writer per checkout. When switching tools, save files,
  update the handoff, and let the next host inspect git status before editing.
  Concurrent work requires disjoint file ownership and one shared-doc writer.
- Verify changes with checks appropriate to their scope. Update status before
  a scoped commit; preserve unrelated edits. Never invent test results.
- Follow the user's existing authorization for actions; an upstream example
  does not grant permission to push, deploy, send messages, or delete data.
- Keep replies plain and concise. Usage is unknown unless the user or host
  supplies it; do not infer remaining allowance from elapsed time or context.
