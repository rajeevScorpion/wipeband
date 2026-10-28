# Shared Ponytail skills

Source: https://github.com/DietrichGebert/ponytail
Installed 2026-10-28 using the Codex skill-installer GitHub helper, main branch
(observed HEAD: 09c434ab73ca43761c5d8b0c5d341926c2fba710).

Six skills under `.agents/skills/ponytail*` are shared with Claude through the
existing `.claude/skills` junction: ponytail, audit, debt, gain, help, review.
This is a repository-local skill installation. Hook/MCP/plugin runtime adapters
are not needed for this shared skill workflow and were not installed.
Removed Claude-only argument-hint frontmatter where present for the shared
Codex skill validator. Skill instructions are otherwise unchanged; MIT license
is preserved in PONYTAIL_LICENSE.

Updates should use a reviewed upstream version and preserve this shared layout.
