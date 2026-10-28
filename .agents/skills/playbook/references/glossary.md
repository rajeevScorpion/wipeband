# Glossary: the owner's words, and what Claude does

| Owner says | Claude does |
|---|---|
| **catch up** / "catch me up" / "where did we leave off" | Run the `catch-up` skill: read the status and handoff docs, give a 4 or 5 bullet snapshot, then offer: continue, start something new, or close loose ends. |
| **check out** / "wrap up" / "close the session" | Run the `check-out` skill: take stock (git, helpers, running processes), ask what to carry over, update status doc + memory + handoff, flag release loose ends, tidy merged branches, list owner to-dos, commit, end with a starter line for the next session. |
| **mockup** / "mock it up" / "let's ideate" | Run the `mockup-lab` skill: ask what to mock up from recent context, build a clickable phone mockup with sample data (fictional names, light and dark), iterate until agreed. No code changes meanwhile. The agreed mockup becomes the build spec. |
| **teach** / "teach me about X" | Run the `teach` skill: build understanding at the owner's level, not just an answer. With no topic, teach the most significant concept from what was just done. |
| **optimize repo** / "clean the repo" / "free disk space" | Run the `optimize-repo` skill; routine every 15 days; record the run afterwards. Skip the bundler cache if emulator testing is next. |
| **studio start** | Run `studio-start`: scaffold a new project, or read an existing one in full, say back what was understood, then build its status, project map and memory. |
| **harvest** / "add this to the method" | Run `harvest`: offer this session's lessons to the Studio Method repo; the owner approves each one. |
| **forge** / "make this a skill" | Run `forge`: build or improve a skill in the Studio Method repo, validate, version, commit, ask before push. |
| **update the website** / "site updates" / "announce this release" | Run `site-updates`: updates-page entry and What's new in plain words (real date), find stale pages/screenshots/demos, build check, ship with the next approved push, optional announcement draft. |
| **product pulse** / "what next?" / "any product ideas?" | Run `product-pulse`: the product-lead agent returns at most three grounded suggestions; logged in `docs/product/SUGGESTIONS.md`; declined ideas never come back. |
| **go** / "go ahead" / "yes do all three" | Explicit permission for exactly the steps just listed (push, deploy, OTA, migration). Run them without re-asking. Anything not listed still needs a question. |
| **agreed** (about a mockup or plan) | The design is locked as the spec. Record it in the mockups README or decision log with the date, then build exactly that. |
| **Show me** | Do not describe; produce something visible: a screenshot, a mockup, a clickable artifact, a diff. |
| **usage %** ("I'm at 80%") | The owner is reporting their plan usage. Apply the contract limits: under 75%, at most 2 helpers; 75 to 85%, at most 1; 85 to 90%, main session stops and waits for helpers to commit; 90% or more, write the handoff doc and stop. |
| **helpers** / "subagents" / "Sonnet" | Cheaper-model executors. Main session plans, reviews and decides; helpers execute. Each gets a written brief (see rules: helper briefs). |
| **check-in** | Main session peeks at helper progress about every 5 minutes (commits, notes file, running processes) and reports in a line or two. |
| **owner to-dos** | Things only the owner can do (console clicks, secrets pasted into `.env`, store submissions, DNS at the registrar, device unlocks). List them at check-out and in handoffs, each with a numbered click path. |
| **hard rule** | Never break, even when it seems convenient. Add it to every helper brief. |
| **batch** | Group changes into one push, one build, one deploy. |
| **OTA** | Over-the-air JavaScript update (no store review); reaches only installs with the same runtime version. |
| **Play build** | A new store binary via the cloud builder; costs build quota. |
| **drafts** | Store-console changes saved but not submitted; remind the owner to review and submit before release. |
| **the status doc / handoff / contract** | The three project docs under `docs/project/`: current state (updated in every main-session commit), handoff (written at check-out or at 90% usage), working contract (rules for helpers). |
| **fictional names** | Any name in a demo, screenshot, release note or example must be invented, never a real person or tester. |
| **owner device / test phone** | The test phone is dedicated to QA; the owner's everyday phone is a different device. Never ask the owner to reinstall the store app after QA. |
| **dev / main** | `dev` is where work lands; `main` is releasable and deploys the site. See branching rule. |
