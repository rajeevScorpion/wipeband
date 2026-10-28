# Google sign-in (native app -> Supabase Auth)

## Pieces
- Google Cloud project with an **OAuth consent screen** and credentials: a **Web client** (used by Supabase and as `webClientId` in the app), an **Android client** per signing key (package name + SHA-1), optionally iOS.
- Supabase Auth -> Providers -> Google: paste the Web client id + secret; the app obtains an ID token natively and calls `supabase.auth.signInWithIdToken`.
- App: `@react-native-google-signin/google-signin`, `GoogleSignin.configure({ webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID })`. The Web client id is public.

## Click path (verify against current Google docs)
1. console.cloud.google.com -> select/create project -> **APIs & Services -> OAuth consent screen** (Google Auth Platform) -> user type External, app name, support email, authorised domains, then **Publish** before launch (Testing mode limits to listed users).
2. **Credentials -> Create credentials -> OAuth client ID -> Web application**. Authorised redirect URI: `https://<project-ref>.supabase.co/auth/v1/callback`. Copy id + secret.
3. **Create credentials -> OAuth client ID -> Android**: package name; SHA-1 of the signing key. You need SHA-1 for EACH key: debug keystore, EAS upload key (`eas credentials`), and the **Play App Signing** key (Play Console -> Setup -> App signing). Missing the Play key = sign-in works in dev, fails in the store build.
4. Supabase dashboard -> Authentication -> Providers -> Google -> enable, paste Web id + secret. Authentication -> URL Configuration -> add `<scheme>://**` redirect.

## Local stack
The local backend is separate from cloud; the dashboard setting does not reach it. In `supabase/config.toml`:
```
[auth.external.google]
enabled = true
client_id = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID)"
secret = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET)"
skip_nonce_check = true   # local only: nonce cannot round-trip through loopback
```
Values come from a `.env` in the directory where the CLI runs. Reuse the same Web client; add `http://127.0.0.1:<api-port>/auth/v1/callback` to its Authorised redirect URIs (Google rejects private IPs). Restart the stack, then check `curl -s http://127.0.0.1:<api-port>/auth/v1/settings` shows `"google":true`. Missing config shows a white page `Unsupported provider: provider is not enabled`.

## Testing without Google
Keep email/password enabled on the LOCAL stack only for demo accounts, and use a sign-in script that injects a session into a debug build (the dev launcher swallows deep-link callbacks). Never test with a real Google account.

## Gotchas
- Debug and release builds have different SHA-1s.
- Env `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` must be present in the EAS profile `env` (or secrets) or the store build has an undefined client id.
- Account deletion URL and privacy policy are required by Play for apps with sign-in.
