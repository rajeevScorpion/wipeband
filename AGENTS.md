# Wipeband shared agent instructions

Claude Code and Codex use this same checkout and project context.
At session start, read `docs/project/HANDOFF.md`, `CURRENT_STATE.md`,
`WORKING_CONTRACT.md`, and `MEMORY.md` (all under `docs/project/`).
Follow the working contract when applying Studio Method skills.

The canonical skills are `.agents/skills/<name>/SKILL.md`; Claude's
`.claude/skills` points to that exact directory. Use these project copies
for Studio Method workflows, including catch-up and check-out, even if a
similarly named user skill exists. Read supporting resources only as needed.

Keep status, handoff, decisions, and lasting project memory in the shared
documents. Update them before switching tools or ending a session. Do not
keep the only copy of a project decision in a host's private memory.

Use one writing session at a time in this checkout. Before editing, inspect
git status and reread any file another session may have changed. Concurrent
sessions must agree on disjoint file ownership and one context-doc writer.

Existing Next.js code, copy bank, prompt pack, and feedback pack remain the
project's implementation sources. Do not scaffold a new app or migrate the
stack merely because a skill's examples use Expo or Vite.
