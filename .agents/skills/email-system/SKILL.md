---
name: email-system
description: Build the full email system for an app + website + admin panel on Supabase and Resend - one shared sender, versioned templates edited in the admin panel, replies that come back into the panel AND the team inbox, delivery/bounce/complaint tracking, a suppression list, consent per audience (service vs update), one-click unsubscribe, an "email me updates" switch in the app, and the privacy-policy lines. Use when the user says "email system", "send emails from the admin panel", "email templates", "replies should come back to the panel", "track bounces", "unsubscribe link", "newsletter to app users", "transactional emails", or after email-setup when the domain and inboxes already work.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Email system (send, receive, track, unsubscribe)

Goal: the owner writes and sends every email from the admin panel; every reply lands in the panel (threaded per
person) and in the human inbox; nothing is sent to people who bounced, complained or unsubscribed; update emails go
only to people who said yes. Built and proven live in WowTodo (2026-10-22).

Prerequisite: `email-setup` is done (domain on Cloudflare, human inbox e.g. Zoho with aliases, Resend sending domain
verified). Playbook rules apply: mockup first for the admin screens, local backend + demo accounts, real phone QA
with the keyboard open, ask before push, secrets never in chat.

## Shape (decide with the owner, defaults first)
- **From:** `hello@<domain>` (a real alias in the human inbox, so direct mail to it is read). Never ask people to
  reply to `noreply@`.
- **Reply-To:** `hello@reply.<domain>` = a Resend **receiving subdomain** (root MX stays with the human inbox).
  Every email's fixed footer says "Just reply to this email, it reaches the team. Or write to support@<domain>."
- **Replies:** shown in the admin panel (default) AND forwarded to the human inbox with `reply_to` = the sender.
- **Categories:** `service` (about their account/test/place) and `update` (news; consent needed; unsubscribe line).
- **Editor:** plain text inside a fixed branded layout (blank line = paragraph, optional button, `{{placeholders}}`).
- **App switch:** "Email me updates" in Settings → Notifications, off by default (needs an OTA/build + policy line).

## Steps
1. **Spec** (`docs/product/EMAIL_SYSTEM_SPEC.md`): addresses, categories, placeholders, audiences, the reply loop,
   screens. Mockup the admin screens if the panel has no agreed design for them.
2. **Database** (one migration) - see `references/architecture.md`: `email_templates`, `email_template_versions`
   (one `published` per template via partial unique index), `email_inbound`, `email_suppressions`, `email_log`
   columns (template key/version, category, status, status_at, message_id, **body**), `user_profiles.email_updates`.
   RLS on, service role only. Seed v1 of every email the code sends today (code copy stays as fallback).
3. **One shared sender** (`functions/_shared/email.ts`): load published template → fill placeholders (escape) →
   fixed layout → suppression check → consent check → unsubscribe link + `List-Unsubscribe` headers (update only) →
   daily cap → Resend send (from, reply_to, headers, tags) → log with the filled body. Every function sends through it.
4. **`email-events` function** (verify_jwt off): `POST /webhook` (Svix-signed Resend events → status, suppression,
   inbound flow) and `POST /unsubscribe` (one-click + JSON from the web page). Details and pitfalls in
   `references/architecture.md`.
5. **Admin actions + screens**: Templates (list, new, editor with chips and live preview, Save draft / Send me a
   test / Publish, versions with Restore), Inbox (new/read/done, thread per person with our emails + their replies,
   reply box that stays after sending), Send (template + audience → dry-run counts → send), person drawer history.
6. **App switch + web unsubscribe page + privacy policy** (`references/privacy-lines.md`).
7. **Tests**: unit tests for render/escape/placeholders, suppression, consent, unsubscribe token, Svix verify (use
   Svix's published test vector), webhook handling, each admin action; RLS + account-deletion checks for new tables.
8. **Device QA** (`device-qa`): the app switch in every language; the admin site in the phone's browser at phone
   width with the keyboard open on every input (login, editor, reply box).
9. **Go-live with the owner** - `references/resend-setup.md` (click paths checked 2026-10-22): alias, receiving
   subdomain + DNS, webhook, secrets **in the Supabase dashboard**, migration + deploys, merge, OTA.
10. **Live test together**: send a template test → reply from a personal mailbox → appears in panel + human inbox →
    answer from the panel → arrives in the same conversation with a short "You wrote" box → statuses read delivered.

## Gotchas (all hit for real; details in `references/gotchas.md`)
- On Windows, **set secrets in the Supabase dashboard**, not `supabase secrets set` through PowerShell: the npx
  `.cmd` shim mangled the webhook secret and every event failed with a bad signature.
- A **sending-only** Resend API key returns 401 on the receiving API; replies need a **Full access** key.
- Resend free plan: **100 emails/day, received and forwarded mail count too**; 3 domains; 1 webhook. Set the app's
  daily cap below it (e.g. 90).
- Make webhook 401/500 responses carry a short `why` (no secrets): the provider's delivery log then shows the cause.
- Mail apps append the whole history to replies: **show only the new text** (split at "On … wrote:" etc.) and quote
  only the new text back; send `In-Reply-To`/`References` so the answer threads in their mail app.
- Store the **body** of what you send, or your own replies show as empty rows in the thread.
- Web admin pages need `interactive-widget=resizes-content` in the viewport meta, or Chrome's keyboard hides buttons.
- Branded emails with a big button often land in Gmail **Promotions**; replies and plain one-offs reach Primary more.

## Done when
The live test (step 10) passes; bounces/complaints suppress automatically; an unsubscribe link stops update emails
only; the app switch works in every language; privacy policy names the provider, the reply storage and the
suppression list; the owner can create, edit, test, publish and roll back templates without code.

## Ask the owner
Sender name/address, reply subdomain name, which inbox gets forwards, audiences they need, daily cap vs plan,
whether app users get the updates switch now, who the admin account is.
