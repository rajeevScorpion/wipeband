# Wipeband current state

Updated: 2026-10-28 (Asia/Kolkata). Usage: unknown.

## Summary

Existing Wipeband website repository with Next.js 14, React 18, Tailwind,
motion libraries, and Stripe dependency, as declared in package.json.
This session configured shared Claude/Codex skills and context only.

## Working

- 22 Studio Method skills live in `.agents/skills/`, with supporting resources.
- Claude reads the same skills through `.claude/skills`; Codex discovers
  `.agents/skills`. Both use AGENTS.md and the shared docs/project files.
- The local setup script restores Claude junctions and disables duplicate
  Studio Method plugin packs for this checkout.

## Validation

- All 22 skills passed the skill-creator frontmatter validator.
- All Claude skill paths and the product-lead role resolve to the canonical
  files. A temporary write-through probe passed in both directions.
- Setup ran twice successfully. Maintenance scripts passed a shared-state check
  in an isolated temporary repository. No application checks were run.

## Open / unverified

- App behavior, build, payments, deployment, and feature completeness were not
  audited or tested during installation.
- Native skill selection in fresh Claude and Codex sessions still needs a
  user smoke check; filesystem wiring and skill validation are checked here.
- Upstream changes require an explicit merge into the shared skill copy.

## Next

Open this same checkout in either tool and say `catch up`. For full project
adoption, request `studio start` and confirm its codebase understanding.
