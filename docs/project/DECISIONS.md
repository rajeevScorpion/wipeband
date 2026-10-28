# Project decisions

- 2026-10-28: Use a repository-local shared Studio Method skill set for Claude
  Code and Codex, with canonical files in `.agents/skills/` and a Claude directory
  junction. Both tools maintain the same docs/project context files.
- 2026-10-28: Disable the four original Studio Method plugin packs in this
  project's local Claude settings to avoid duplicate discovery. Existing global
  installations and other projects are retained.
- 2026-10-28: Preserve the existing app and stack. Shared-context setup is not a
  full codebase audit or adoption assessment.
