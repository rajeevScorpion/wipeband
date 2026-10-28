# Email: Resend (sending) + Zoho (inboxes)

Goal: `contact@`, `privacy@`, `support@` receive and reply from your own domain; `noreply@` sends waitlist/app mail. The `email-setup` skill walks the user through it interactively; this is the map.

## Why this split
- Gmail "Send mail as" for own-domain addresses is ending (check current Google notice; was January 2027), so do not build on it.
- Zoho Mail Forever Free: one real mailbox (`contact@`) plus aliases (`privacy@`, `support@`); replies go out as the alias.
- Resend: API sending for the site/app from `noreply@`. Send-only.
- Never use Cloudflare Email Routing on the root domain (Zoho owns root MX). Keep Resend records on `send` and `resend._domainkey` only.

## Steps (owner clicks; give numbered paths checked against current docs)
1. **Zoho**: sign up at zoho.com/mail (Forever Free plan, "Add your own domain"). Verify the domain with the TXT record Zoho shows.
2. **Cloudflare DNS**: delete old forwarding MX/SPF; add Zoho MX x3 and the Zoho SPF; add the DKIM TXT (Zoho admin -> Mail -> Email Authorization -> DKIM). Wait for "verified".
3. **Zoho aliases**: Control Panel -> Users -> the user -> Email Alias -> add `privacy`, `support`. Mail Accounts -> Send Mail As if needed.
4. **Test**: mail in to each address; reply as an alias; "Show original" must show SPF/DKIM/DMARC PASS.
5. **Resend**: resend.com -> Domains -> Add domain (pick the region nearest users) -> copy the records it lists (CNAME `send`, CNAME `rsend`, TXT `resend._domainkey`) into Cloudflare as DNS only -> Verify.
6. **DMARC**: TXT `_dmarc` = `v=DMARC1; p=none; rua=mailto:contact@<domain>`; tighten to `quarantine` after clean reports.
7. **API key**: Resend -> API Keys -> Create -> permission **Sending access** -> restricted to the domain. The owner runs `supabase secrets set RESEND_API_KEY=...` (never paste in chat).
8. **Function config (names)**: `RESEND_API_KEY`, `WAITLIST_FROM` (`Name <noreply@domain>`), `WAITLIST_REPLY_TO` (`contact@domain`), `CONTACT_TO` (where the contact form lands), `SITE_URL`, `WAITLIST_EMAIL_DAILY_LIMIT`.
9. **Real test**: submit the site form; the confirmation must reach an inbox (not spam), confirm link works; contact message lands in Zoho with Reply-To = the sender.

## Waitlist flow
Form -> Turnstile token -> edge function (`verify_jwt=false`): origin check, Turnstile verify, quotas, insert row, send double-opt-in email with a confirm link (`/early-access/confirm?token=...`) and a one-click remove link (`/early-access/remove`). Both pages `noindex`. No real-user email without the owner's OK.

## Keep a tick list
A `docs/EMAIL_SETUP.md` with checkboxes for each step above and the date done, so a new session can resume.
