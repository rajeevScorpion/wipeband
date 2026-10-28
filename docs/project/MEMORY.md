# Shared project memory

- The owner wants Claude Code and Codex to use the same skill files and shared
  project context, scoped to this repository. Why: switching tools should not
  lose project history or require manual synchronization. Apply by updating
  docs/project context directly and using `.agents/skills` as the single source.
- Existing implementation inputs include `canonical-copy-bank/`, `prompt-pack/`,
  `seed-data/`, and the client feedback implementation pack. Consult the relevant
  source for future tasks; this setup did not validate their completeness.
