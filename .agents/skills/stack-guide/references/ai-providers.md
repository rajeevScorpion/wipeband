# AI providers (server-side only)

## Rule
Provider keys (OpenAI, Gemini, others) exist ONLY as edge-function secrets. Never `EXPO_PUBLIC_*`, never in the app bundle. An early client-side key is a billable credential extractable from the APK. Verify a production bundle has none (`npx expo export`, grep for `sk-` and `AIza`).

## Proxy pattern
- App -> edge function (`verify_jwt = true`) -> provider. The function checks the user, applies per-user quotas, calls the provider, returns only what the UI needs.
- Shared module `_shared/openai.ts`: one place for the client, an **allow-list of models** (`AGENT_MODELS`) so a typo'd secret cannot call an expensive model, retries, and token logging.
- Transcription (Whisper) goes through the same function: upload audio, return text. Keep the final accuracy step even if live recognition showed words earlier (owner decision in WowTodo: accuracy over speed).
- Fallback provider (e.g. Gemini) only if its billing is actually attached; test the fallback path, do not assume.

## Function secrets (names only)
`OPENAI_API_KEY`, `GEMINI_API_KEY`, model selectors (`AGENT_ROUTER_MODEL`, `AGENT_SPECIALIST_MODEL`, `AGENT_TRANSLATE_MODEL`, `AGENT_FACTS_MODEL`), rollout flags.

## Rollout flag
`AGENT_ROLLOUT = off | owner | all` (+ `AGENT_OWNER_IDS` list). Defaults to `off` when absent, so forgetting it in cloud is safe. Flip with `supabase secrets set AGENT_ROLLOUT=off` - no deploy, no app release needed. Roll out owner-only first.

## Prompts and quality
- Scope "do not invent details" rules to errands/events; asked-for content (courses, plans) must get real domain expertise (see playbook rule).
- Keep an eval script (`eval:voice`-style) with fixed cases, including expert-content cases and no-invention controls; run it when touching prompts or switching models. Record model comparisons in a dated doc.
- Prompt-cache stable prefixes (per-user facts) to cut cost; keep per-user memory in your own tables so it can be shown, edited and cleared (privacy promise) and you are not locked to one vendor.

## Privacy
Data-safety answers and the privacy policy must name that user text/audio is sent to the provider. Keep "AI" wording out of the front-of-house copy; fine in the policy.

## Costs and abuse
Daily per-user and global limits in the database (`DEMO_GLOBAL_DAILY_LIMIT` style) for any anonymous endpoint such as the website demo; Turnstile on top.
