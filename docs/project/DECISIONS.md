# Project decisions

- 2026-10-28: Use a repository-local shared Studio Method skill set for Claude
  Code and Codex, with canonical files in `.agents/skills/` and a Claude directory
  junction. Both tools maintain the same docs/project context files.
- 2026-10-28: Disable the four original Studio Method plugin packs in this
  project's local Claude settings to avoid duplicate discovery. Existing global
  installations and other projects are retained.
- 2026-10-28: Preserve the existing app and stack. Shared-context setup is not a
  full codebase audit or adoption assessment.
- 2026-10-28: Owner confirmed the initial assessment and authorized saving the
  adoption documents and installing dependencies. Preserve the existing Bun
  lockfile and install with frozen resolution.
- 2026-10-28: GitHub pushes trigger Hostinger production deployment. No push or
  deployment is authorized by this local setup task. A Vercel testing copy is
  planned by the owner; setup/URL is pending.
- 2026-10-28: Do not introduce a database. Keep supplied images in repository
  assets and assess their appropriate placement once available.
- 2026-10-28: Use a local chore/studio-adoption branch for this setup to avoid
  modifying the deploy branch. Future integration conventions are unconfirmed.
