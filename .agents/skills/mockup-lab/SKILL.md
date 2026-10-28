---
name: mockup-lab
description: Ideate a feature as an interactive, clickable phone mockup (HTML artifact with sample data) before any code is written, then iterate with the user until the design is agreed and becomes the build spec. Use when the user says "mockup", "mock it up", "/mockup-lab", "prototype this first", "let's ideate", "show me how it would look", or wants to explore a feature update or a new feature without touching the code. Works in any project with an app UI.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Mockup lab

When shaping a feature, **build a clickable mockup first and agree
on it together, then implement**. The model for the process and the page structure is the People-merge example
(Example (WowTodo): `references/example-people-merge.html`; its look is out of date, never copy its styling). The user
tapped through it, chose between variants, approved it, and it then became the spec a helper built from. Mockups
may later be reused on the product website as hands-on feature demos, so build them to be portable.

**Website / desktop pages:** same process, but the model is the homepage example
(Example (WowTodo): `references/example-website-home.html`). Differences from
the phone format: a sticky control bar (View Desktop | Phone, Theme, one toggle per open decision, Jump to section);
the site renders in a container-query wrapper so the Phone view reflows inside a scrolling phone frame; the proposal
column sits sticky on the right (What changes with Show me → scrolls the preview, Agreed, Decide before we build,
Build notes); real copy from the copy deck; real screenshots embedded as data URIs; grey dashed boxes for existing
demos or screens still to capture. Example taste (WowTodo owner): generous breathing room, minimal (nothing without a purpose),
app screens lifted with depth and a slow float.

**Hard rule: template first, then reuse it.** The first mockup of each kind in a project (website, app) sets up
its template. Once the owner agrees it, freeze it as a reusable source, e.g. `docs/product/mockups/src/<kind>.tpl.html`
with real assets as placeholders (`%%LOGO%%`, `%%IMG_<name>%%`) plus a small build script that embeds them. Every
later mockup of that kind starts by **copying that template** and changes only the parts in question; it keeps the
control bar, the collapsible notes column (a Show/Hide notes button), the full-page rendering of the site or app,
the tokens and the layout. Never rebuild the frame from scratch, never put the site in a box with its own scroll
bars. If no template exists yet, the first job is to build one and get it agreed. Name the template file in every
helper brief. List the frozen templates at the top of `docs/product/mockups/README.md`. The web template moves
forward with the live site: once a web mockup is agreed and built, its source becomes the newest template (copy the
newest, never the first), and the README names it.

**Website mockups with live demos:** when the page shows the site's demos in iframes, publish those demo files with
the page (Artifact `files`, e.g. `demos/<name>.html`), or the phones render blank. Each demo file is served without
a skeleton, so it needs its own `<!doctype html>`, `<meta charset="utf-8">` and viewport, or its text garbles.

**Hard rule: the template shows the product as it looks today.** The bundled examples teach the structure only
(phone + controls + proposal column), never the look. Before copying, open the template and the newest agreed
mockup side by side (headless screenshots are fine): header, logo, navigation, cards and sheets must match the
current app or site. When the UI changes (new navigation, header, logo), replace the app template with the newest
agreed mockup that shows the new UI and update the README's frozen-templates table. Leave old-UI mockups where
they are, unchanged: they are the record of the process. They are simply never copied again.
Example (WowTodo): an email-invite mockup was copied from the 8 Oct People-merge mockup, which still had the square
logo and the old mic dock; the app had since moved to the round logo pill and the floating Tasks | Today | People
bar. The owner rejected it; the redo copied the current People-chats mockup.

**Hard rule: copy the whole template, then look once.** Copy every style block and every shared asset of the
template (a template can keep its CSS in several `<style>` blocks), not just the first one. Before publishing, take
one headless screenshot of each screen you changed and compare it with the template; fix what differs, then publish.
A mockup "of what has been built" starts from screenshots of the real screens (emulator or phone), never from the
plan, or it shows a nicer UI than the one users have.
Example (WowTodo): a mockup copied only the first of three style blocks and was published with square avatars and
unstyled rows; its Manage sheet was also drawn from the plan and didn't match the app.
Example (WowTodo): a helper rebuilt a homepage mockup from scratch: the site sat in a box with scroll bars and
the side panel didn't collapse. The owner rejected it; the redo copied `src/website-home.tpl.html`.

**Hard rule: no code changes while in this skill.** Read code, docs and the emulator freely, but only write the
mockup file, its artifact and the mockups index. No app code, migrations, cloud writes or builds. Never
create, share, delete or block anything in a running app; screenshots only.

## 1. Ask what to mock up

Always start by asking, using AskUserQuestion. Build the options from recent context: this conversation, the
project status/handoff docs, open investigations, and `docs/product/mockups/README.md` (create it if missing).
Offer up to four options, for example:
- **Update an existing feature.** Name the concrete candidate(s) from context, e.g. "People tab: …", "Branch tree view".
- **Something new.** Name any new idea that came up recently, or leave it for the user to describe.
- **Iterate on an existing mockup.** List the drafts in the mockups index.

If the user already named the subject when invoking, skip straight to a one-question check of anything that
changes the design: who it is for, the scope, or the one or two decisions you can't infer. Don't interview.

## 2. Ground it in the real product (read-only)

- **For an update:** find the real screens, components, copy, data hooks and routes it touches. If an emulator
  or simulator is running, screenshot the current screens to see what users see today. Note what's confusing,
  duplicated or wrong; those become the "Before" lines.
- **For something new:** find where it would plug in (entry points, navigation, existing data), and what data
  would back it.
- **Design system:** read the project's tokens (colors for light and dark, fonts, radii) from its theme file and
  reuse them exactly. Reuse its real logo, embedded as a data URI.
- Apply the project's rules from CLAUDE.md and memory. Example (WowTodo):
  - the logo is always a circle;
  - no sparkle/AI icon;
  - no "AI" wording in the UI ("Wow turns it into…");
  - design-system dialogs only (no native alerts);
  - EN + Hindi copy;
  - 3-tab dock (Tasks | mic | People), with Settings in the ☰ menu.
- Sample data uses **fictional names only.** Never real users, testers or contacts: the mockup may go public.

## 3. Build the mockup

One self-contained HTML artifact. **Start from the project's frozen template for this kind** (see the hard rule
above): copy it, keep its frame, and change only the screens, sections, copy and toggles this mockup is about.
Only when no template exists yet, build one from the structure below and get it agreed before reusing it. Follow
the Artifact tool's page contract: run its quickstart and its design guidance once for a new template. Structure,
as in the reference:

- **Phone (sticky, right; first on narrow screens):**
  - a real-proportion phone frame running the actual screens with sample data;
  - a vanilla JS state machine: screens, tabs, bottom sheets, confirm dialogs, toasts, all inside the phone;
  - actions change the in-memory data, so it feels alive (accept, remove, share…), with a **Reset data** control.
- **Controls above the phone:**
  - theme (Auto / Light / Dark);
  - language, if the app is bilingual;
  - a toggle for **every open design decision** (e.g. dock layout), so the user decides by trying.
- **Proposal column:**
  - eyebrow + headline + a 2–3 sentence intro that says it's a mockup on sample data;
  - **What changes:** one card per change, with Before / After, and a **Show me** button that drives the phone
    straight to that state;
  - a routing or flow table, only if navigation or notifications change;
  - **Decide before we build:** the open questions, each matched by a control on the phone;
  - **Build notes:** DB impact, what's reused, copy/translation, redirects, and what's deliberately out of scope.
- Keep strings in a `COPY` object per language, so the copy can be lifted into the app later.
- Check once (syntax-check the script, plus one preview if the session offers it), then publish.

Save a copy to `docs/product/mockups/<slug>.html` in the repo, and add a row to `docs/product/mockups/README.md`:
| Mockup | Artifact URL | Status (draft / agreed / built) | Date | Decisions |

## 4. Iterate to common ground

- Reply with the link plus at most three lines: what to try first, and the decisions waiting on them.
- **How decisions are asked.** The user opens the mockup and flips through the toggles. Then ask the open decisions
  with AskUserQuestion: one question per toggle, with the option labels exactly as the toggle buttons read and a
  one-line description of each. The user answers there, or skips it and pastes a screenshot of their answered
  questions; read the picks from the screenshot. If picks arrive blank or missing (e.g. "placement ___"), ask
  the same questions. Don't guess.
- On feedback, edit the same file and republish to the **same path**, which keeps the URL. Move each settled
  question from "Decide before we build" into an **Agreed** list in the proposal column. Set the defaults to the
  chosen options, and remove the toggles for decided items.
- Small rounds: change what they asked, nothing else. No second "check" pass unless something is visibly broken.

## 5. Hand off to the build

When the user approves:
- Mark the mockup **agreed** in the index, and write the agreed decisions at the top of the proposal column.
- The mockup file becomes the spec. Brief the implementing helper with its path and the agreed decisions, and
  have the helper read the `COPY` object and the behaviours from it (this is how the People merge was built).
- Record in the project status doc: the mockup link, agreed, ready to build.
- After the feature ships, set the status to **built**. If the user wants it on the website, the port keeps only
  the phone, drops the proposal column, and swaps in the site's styling.
