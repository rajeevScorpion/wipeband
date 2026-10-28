# Shared handoff

Updated: 2026-10-28 (Asia/Kolkata). Usage: unknown.

Stopped at: shared Studio Method installation for Claude Code and Codex.
Canonical skills: `.agents/skills/`; shared context: `docs/project/`.

In flight: installation files saved in this checkout. No app implementation
changes, helper agents, or background services were started by this task.
Check git status and recent commits to see the current saved/committed state.

Next session: read the shared context docs and give a brief catch-up. Continue
with the user's next task; do not start an adoption audit without a request.

Owner check: restart/open fresh Claude and Codex sessions in D:/DEV/wipeband;
confirm the local catch-up skill is visible and reads these same documents.

Recovery: run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/setup-shared-skills.ps1`
if this checkout has moved or Claude's skill junction is missing.

Open: see CURRENT_STATE.md. No application checks were run for this setup.
