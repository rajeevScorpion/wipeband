# Gotchas (each one cost time in a real build)

| Symptom | Cause | Fix |
|---|---|---|
| Every webhook event: `401 bad_signature`, `why: mismatch`, even after re-copying the secret | `npx supabase secrets set …` from PowerShell goes through a `.cmd` shim that mangled the value | Paste secrets in the Supabase dashboard (Edge Functions → Secrets). Compare SHA-256 of the copied value with the `secrets list` digest to prove it. |
| First attempt pasted `<whsec_…>` / placeholders literally | Angle-bracket placeholders in a command | Never give commands with `<…>` placeholders to paste; give the dashboard path or a variable (`$s = (Get-Clipboard).Trim()`) |
| `email.received` → `500 server_error`, `why: resend receiving 401` | API key with "Sending access" only | Create a Full access key; replace `RESEND_API_KEY` in the dashboard; Replay |
| Secret changed but the old value still used | Running function instances | Redeploy the function after changing a secret if the first replay still fails |
| Panel replies show as empty "We sent" rows | Only the subject was logged | Log the filled body in `email_log.body` |
| Reply in the panel is 900 characters of quoted history | Mail apps append "On … wrote:" + `>` lines | Split quoted history for display; keep the stored text complete |
| The outgoing "You wrote" box repeats the whole chain | Quoting the full stored text | Quote only the split's new part |
| The answer starts a new Gmail conversation | No threading headers | `In-Reply-To` and `References` = their `message_id` |
| Message shows twice in a thread | The opened message was added again on top of the person's replies list | De-duplicate by id |
| Buttons hidden by the phone keyboard on the admin site | Chrome resizes only the visual viewport | `<meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content">`; sticky action bars in long forms |
| Typed text looks like placeholder text | Inputs inherit a muted label colour | Set input/textarea `color` to the foreground token |
| "Could not reach the server" right after login on the admin site | The function's CORS list lacks the current origin (e.g. a `*.vercel.app` URL before the custom domain) | Connect the custom domain, or add the origin to the allow-list env |
| Test emails land in Gmail Promotions | Branded layout with a big button | Expected; replies and plain one-offs reach Primary more; don't fight it early |
| A bad unsubscribe link said "You're unsubscribed" | The route always returns 200 | Return `{ok:true, valid:false}` and show the bad-link message on the page |
| Resend free plan limit hit sooner than expected | Received replies and their forwards count toward 100/day | Set `EMAIL_DAILY_LIMIT` below the plan limit; upgrade before a big send |
