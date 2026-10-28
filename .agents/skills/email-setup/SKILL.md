---
name: email-setup
description: Guide the user step by step to set up email for their own domain — receive mail at addresses like contact@, privacy@, support@ in an existing inbox (usually Gmail), reply from those addresses, and send app/website email (noreply@) through Resend — with Cloudflare DNS. Starts with a prep checklist, asks for keys only when needed and keeps them out of chat, and ends with deliverability tests. Use when the user says "email setup", "/email-setup", "set up contact@ / noreply@", "custom domain email", "receive and reply from my domain", or "configure Resend". Works in any project.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Email setup (own domain, Cloudflare DNS, Resend, Gmail)

Goal: every chosen address receives mail, the user can reply as that address, and the app/site sends
authenticated mail from `noreply@`. The user does the console clicks; you plan, check DNS, give exact
click paths, verify each step, and keep a tick list.

## Rules
- **Click paths:** numbered, one action per line, exact labels and values. Console labels change: before each
  phase, re-check the current official doc (links below) and say if a label differs from what's written here.
- **Secrets never in chat.** When a key is needed, tell the user where to put it (a gitignored env file, or a
  command they run themselves, e.g. `npx supabase secrets set NAME=value`). Ask them to reply "done", not the value.
  If a key is pasted anyway, tell them to revoke it and make a new one.
- **One phase at a time.** End each phase with a check you run yourself (`nslookup`/`dig`, the provider's verify
  button, a test mail) and a tick-list update. Don't move on until the check passes.
- **Ask before** anything outward-facing you'd do yourself (sending test mail to real people, deploying functions).
- Short, plain language. Keep the tick list in `docs/EMAIL_SETUP.md` (or the project's docs folder) so a later
  session can resume.

## Phase 0 — Prep checklist (show first, user ticks)
- [ ] Domain is on Cloudflare (nameservers point to Cloudflare); user can log in to the Cloudflare dashboard.
- [ ] Main inbox account (e.g. a Gmail) the mail should land in; user can sign in to it.
- [ ] Resend account created (ideally signed up with that same inbox).
- [ ] Access to where the app's secrets live (e.g. Supabase project, Vercel), if the app will send mail.
- [ ] A second, unrelated email account for testing (personal Gmail, etc.).
- [ ] Decide the address list (Phase 1).

## Phase 1 — Plan addresses and the reply path
Suggest, then confirm with the user:
| Address | Purpose | Receives? |
|---|---|---|
| contact@ | general contact, website contact form | yes |
| privacy@ | privacy/data requests (often required by the privacy policy and store listings) | yes |
| support@ | app help (optional; can be an alias of contact@) | yes |
| noreply@ | app/site system mail (confirmations) | no (send only) |
| dmarc@ | DMARC aggregate reports (optional) | yes, or use a filter |
| catch-all | anything else (typos, abuse@, postmaster@) → main inbox | optional, recommended |

**Reply-path decision (ask, AskUserQuestion):** Gmail "Send mail as" for non-Google addresses (including your
own domain via SMTP) **ends January 2027**, and new setups may already be refused in late 2026 (Gmail Help
22370). Options:
1. **Gmail now, move later** — Cloudflare forwards to Gmail, reply via Gmail "Send mail as" through Resend SMTP.
   Free, one inbox; must be replaced before Jan 2027.
2. **Zoho Mail Forever Free** — real mailbox for the domain (up to 5 users, 5 GB each, one domain; no IMAP/POP;
   web + Zoho app). Free and lasting, but a second inbox. Replaces Cloudflare routing (Zoho needs the root MX).
3. **Google Workspace** — one paid inbox per user; the extra addresses are free aliases; lasting, best Gmail experience.
Receiving through Cloudflare (Phase 3) and sending app mail through Resend (Phase 4) are the same for 1;
path 2 uses Phase 3b instead of 3 and 5; path 3 follows Google's MX setup in place of Phase 3 (Resend still works
alongside: its records live on the `send` subdomain).

## Phase 2 — DNS check (you do this)
Look up current records and flag conflicts before anything changes:
`nslookup -type=mx <domain>`, `nslookup -type=txt <domain>`, `nslookup -type=txt _dmarc.<domain>`,
`nslookup -type=txt send.<domain>`, `nslookup -type=txt resend._domainkey.<domain>`.
- Existing root MX from another provider → routing will replace it; confirm nothing relies on it.
- Only **one** SPF TXT allowed at the root; merge rather than add a second.

## Phase 3 — Receive: Cloudflare Email Routing (path 1)
Doc: https://developers.cloudflare.com/email-routing/get-started/enable-email-routing/
1. Cloudflare dashboard → **Compute** → **Email Service** → **Email Routing** → **Onboard Domain** → pick the domain →
   review the records it adds (root MX ×3, SPF TXT, DKIM TXT) → **Done**.
2. **Destination Addresses** → enter the main inbox → submit → open the verification mail → **Verify email address**.
3. Domain → **Routing Rules** → **Create routing rule** for each receiving address: Email pattern = local part
   (`contact`), Action = **Send to an email**, Destination = main inbox → **Save**.
4. Catch-all (if chosen): Routing Rules → catch-all → Action **Send to an email** → main inbox → enable.
   (Not on the onboarding doc page; confirm the current label in the dashboard.)
5. noreply@: no rule needed if catch-all is off; if catch-all is on, add a `noreply` rule with action **Drop**.
**Check:** MX lookup shows Cloudflare routes; send a mail from the test account to each address; it lands in the inbox.
In Gmail, add a filter/label per address (Has the words: `to:contact@<domain>`) so mail is easy to tell apart.

## Phase 3b — Receive + reply: Zoho Mail Forever Free (path 2)
Docs: https://www.zoho.com/mail/help/adminconsole/configure-email-delivery.html ·
https://help.zoho.com/portal/en/kb/mail/adminconsole/articles/how-do-i-add-an-email-alias
One mailbox (e.g. `contact@`) + aliases (`privacy@`, `support@`; up to 29 per user, free with an own domain).
1. zoho.com/mail → pricing → **Forever Free Plan** → sign up (use the main inbox as the contact email) → "Sign up with a
   domain I already own" → enter the domain → create the first address (`contact`). The account's data centre follows the
   signup region (India → zoho.in); **always copy record values from the Admin Console, never from generic docs.**
2. Admin Console → **Domains** → the domain → verify ownership: add the **TXT** record shown (`zoho-verification=…`) in
   Cloudflare → DNS → Records (Name `@`) → back in Zoho → **Verify**.
3. Cloudflare DNS: **delete every old MX** at the root (and the old provider's root SPF TXT), then add Zoho's three MX
   records exactly as shown (Name `@`, given priorities). Replace the root SPF with Zoho's value (one SPF TXT only).
4. Zoho Admin Console → **Email Authentication / DKIM** → add a selector → copy the TXT (Name `<selector>._domainkey`)
   into Cloudflare (DNS only) → back in Zoho → **Verify** → enable.
5. Aliases: Admin Console → **Users** → the user → **Mailbox Settings** → **Email Alias** → **Add** → `privacy`, `support`
   (and `dmarc`, and `hello` if the app will send from it). Not accounts.zoho.com → "My Email Addresses": that only
   adds sign-in addresses, it does not create a mailbox alias.
6. Catch-all (optional, if the plan offers it): Admin Console → mail settings → catch-all → this mailbox.
7. Install the Zoho Mail app on the phone; in Zoho settings check that each alias appears under the From choices.
**Check:** MX/SPF/DKIM lookups show Zoho values; mail from the test account to each address arrives in Zoho; a reply
from Zoho as `privacy@` arrives with From `privacy@<domain>` and Show original = PASS.
Then skip Phase 5 (replying already works) — Resend (Phase 4) is unchanged; its records sit on `send` and
`resend._domainkey`, so they don't touch Zoho's.

## Phase 4 — Send: Resend domain
Docs: https://resend.com/docs/dashboard/domains/cloudflare · https://resend.com/docs/send-with-smtp
1. resend.com → **Domains** → **Add domain** → enter the root domain (lets you send from `noreply@<domain>`;
   Resend's own records go on the `send` subdomain and `resend._domainkey`, so they don't clash with root MX).
   Pick the region closest to the users if asked.
2. **Sign in to Cloudflare** (automatic, Domain Connect) — or add manually in Cloudflare → DNS → Records:
   MX `send` → value shown, priority 10; TXT `send` → `v=spf1 include:amazonses.com ~all`;
   TXT `resend._domainkey` → value shown, **DNS only**. Name field = subdomain part only.
3. Don't enable Resend **Receiving** on the root domain (it would take over root mail).
4. **Verify DNS Records** → wait for Verified.
5. DMARC (once SPF/DKIM pass): Cloudflare DNS → TXT `_dmarc` → `v=DMARC1; p=none; rua=mailto:dmarc@<domain>`.
   Move to `p=quarantine` after a few weeks of clean reports.
6. API keys (Resend → **API Keys** → **Create API key**, permission **Sending access**, domain = this domain):
   - one for the app/server (e.g. `RESEND_API_KEY`),
   - one separate key for Gmail SMTP (path 1), so either can be revoked alone.
   The user stores them straight away (see Rules); never in chat, never committed.
**Check:** Resend shows Verified; DNS lookups show the records.

## Phase 5 — Reply as the address (path 1: Gmail "Send mail as")
Doc: https://support.google.com/mail/answer/22370
1. Gmail (desktop) → ⚙ → **See all settings** → **Accounts and import** → "Send mail as" → **Add another email address**.
2. Name = brand name (e.g. "Acme"), Email = `contact@<domain>`; untick **Treat as an alias** only if replies should
   stay separate → **Next Step**.
3. SMTP Server `smtp.resend.com`, Port `465`, Username `resend`, Password = the Gmail SMTP key, **Secured connection
   using SSL** → **Add Account**.
4. The confirmation mail reaches `contact@` → forwarded to Gmail → click the link (or enter the code).
5. Repeat for each address the user wants to reply as (privacy@, support@).
6. **Accounts and import** → "When replying to a message" → **Reply from the same address the message was sent to**.
If Gmail refuses the new SMTP address (the 2026 wind-down), stop and go back to the Phase 1 decision.
**Check:** from the test account, write to `contact@`, reply from Gmail; on the test side the From is `contact@<domain>`
and **Show original** says SPF/DKIM/DMARC = PASS.

## Phase 6 — App/site sending
Set the app's mail secrets where its server code runs (user runs the command; you give it with placeholders), e.g.
`RESEND_API_KEY`, `*_FROM` = `Brand <noreply@<domain>>`, reply-to = `contact@<domain>`, forward-to = `contact@<domain>`.
Then (with the user's ok) deploy and send one real test through the app's own flow.
**Check:** the mail arrives, From = noreply@, replying goes to contact@, Show original = PASS.
Optional: score a test mail at https://www.mail-tester.com (aim ≥ 9/10).

## Phase 7 — Wrap up
- Update the project's status doc (addresses, providers, which secrets exist — names only, never values).
- If path 1: add a dated reminder to revisit replying before January 2027.
- Save a memory with the reply path chosen and the inbox it lands in.
- Next, for templates edited in an admin panel, replies back into the panel, bounce tracking and unsubscribe: the
  `email-system` skill. It also moves app mail from `noreply@` to a real `hello@` with a reply subdomain.
