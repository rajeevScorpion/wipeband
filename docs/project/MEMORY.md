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
- No database is planned. Images will ship in the repository's asset folder;
  the owner will provide more images for placement based on their content.
- The main next implementation goal is still to be confirmed by the owner.
