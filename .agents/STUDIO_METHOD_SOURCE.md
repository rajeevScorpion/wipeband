# Studio Method shared installation

Upstream: https://github.com/aavritidesignstudio/studio-method
Source used: existing official GitLab marketplace checkout.
Revision: 4b6e1240db73be018472ed3a1e8383a2deea0477
License: MIT (see STUDIO_METHOD_LICENSE).

Canonical skill files: `.agents/skills/`. Claude uses the `.claude/skills` directory junction to those exact files. The product-lead role is in `.agents/roles/`, also exposed through `.claude/agents`.

Local adaptations: shared-contract preamble; portable script paths; host-neutral working roles and tooling check; shared project memory, teaching log, and maintenance state; product-lead fallback in the current session; quoted malformed upstream studio-start description. Other upstream instructions are preserved, subject to the project contract.

Run `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/setup-shared-skills.ps1` after relocating or cloning this checkout. It recreates local directory junctions and disables duplicate Studio Method plugin packs only for this project. Both hosts must open this same checkout.

Updates are deliberate: compare upstream changes against this revision and merge them into `.agents/skills/`, preserving these adaptations. Marketplace updates do not update this vendored copy. Never edit the marketplace cache to change project skills.
