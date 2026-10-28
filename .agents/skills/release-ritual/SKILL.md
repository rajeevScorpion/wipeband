---
name: release-ritual
description: The checklist for shipping an Expo app release - Play (store) build with EAS quota and versionCode, AAB permission introspection after native/plugin changes, OTA update with free-RAM check, release log row, WHATS_NEW and website /updates entry in audience-friendly words, Play Console drafts review, Data safety and privacy policy kept in sync, real dates. Use when the user says "release", "ship it", "build for Play", "publish an update", "OTA", "eas update", "eas build", "log the release", "ready to release?".
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Release ritual

Follow in order. Rules referenced live in `playbook` (real dates, release log, audience-friendly notes, build quota, console drafts, ask before push).

## 0. Decide: OTA or store build?
- **OTA** (`eas update`): JavaScript/asset-only changes. Reaches only installs whose runtime version (= app version) matches. No review wait.
- **Store build**: anything native - new module, plugin, permission, app.json native field, SDK bump - or when the runtime version must change. Costs build quota.
If unsure, run section 2's introspection: if the merged manifest or native config changed, it is a build.

## 1. Pre-flight (both)
1. `date "+%Y-%m-%d"` - note it; use it for every entry below.
2. Typecheck, unit tests, and the device QA pass (`device-qa`) on every touched flow, light/dark, 1.3x font, keyboard-open checks. List what changed and what was tested (the build-quota rule).
3. Working tree clean on `dev`; commits made; ask the owner before any push.

## 2. Store build
1. Bump `expo.version` and `android.versionCode` (must exceed every code ever uploaded, even discarded drafts).
2. **Permission introspection BEFORE building:** move the local `android/app/src/main/AndroidManifest.xml` aside (stale entries leak in), run `npx expo config --type introspect`, read the permissions/features. Restore the file.
3. Build: from the app folder, bare command: `npx -y eas-cli build --platform android --profile production --non-interactive --no-wait`. Record the build id.
4. **AAB check AFTER building:** download the AAB and run
   `unzip -p app.aab base/manifest/AndroidManifest.xml | grep -a -o "android.permission.[A-Z_]*\|android.hardware[a-z._]*" | sort -u`.
   Expect exactly the permissions the app needs (e.g. RECORD_AUDIO, CAMERA, POST_NOTIFICATIONS), NO `READ_MEDIA_*` / `READ_/WRITE_EXTERNAL_STORAGE` unless intended, and optional hardware features marked `required=false` (camera, autofocus) so the store does not drop devices. Never set a plugin permission flag to `false` without checking what it strips app-wide (one such flag removed the mic from the whole app).
5. Upload to internal testing; install from the store link on a test phone; smoke test.
6. A permission or data change means updating Data safety + privacy policy (section 5).

## 3. OTA
1. **Free RAM first:** hermesc needs a few GB for large bundles; it crashed at ~1.6 GB free. Stop the emulator (`adb emu kill`) and the bundler by PID (never all node). Local backend containers can stay.
2. **Check `.env` points at the cloud backend.** `eas update` bundles `EXPO_PUBLIC_*` from the local `.env` (build-profile `env` in `eas.json` applies to store builds, not to `eas update`). A local URL (`127.0.0.1`) left active ships a broken app to every user. Confirm with `grep -c '^EXPO_PUBLIC_SUPABASE_URL=https://' .env` (must print 1), without printing the value.
3. From the app folder, bare command: `npx -y eas-cli update --channel production --platform android --message "<short>" --non-interactive`. If the permission system blocks it as a production deploy, give the owner the exact command; read the update group id afterwards (`eas update:list`).
4. Confirm the runtime version matches the store version you target; users get it after opening the app twice.

## 4. Log it (same batch as the release)
1. **Internal** `docs/release/RELEASE_LOG.md`: | date | kind (Play build/OTA) | version/runtime | build or update id | commit | technical what changed |.
2. **Public**: run `site-updates` (studio-site). It writes the website updates entry and `docs/release/WHATS_NEW.md` in plain words with the real date (store build -> `version`, OTA -> `needs`), finds pages, screenshots and demos the release made stale, and drafts store release notes.
3. Update the status doc. The site change ships with the next approved push; do not curl-poll the live site.

## 5. Store console review (before any production/closed-test release)
Remind the owner to review EVERY Play Console draft against the Data safety doc and the live privacy policy, and submit: App content (Data safety, content rating, privacy policy URL, ads, target audience, app access, account deletion URL), store listing, countries, pricing. Give numbered click paths checked against current official help (menu -> page -> section -> button, exact value) and say what you could not verify.
Keep in sync with permissions and features: microphone/audio -> Data safety (audio files, shared with other users if chat), camera/photos -> photos collected and shared, notifications, sign-in method, AI provider processing (name it in the policy, not in the listing headline), analytics/crash data, account deletion. When a feature shares user content with other users, "users interact" in the content rating and the user-generated-content answers apply.
Paid tier planned? Remind: payments profile, billing integration, subscription products, Data safety + policy update, content-rating re-check.

## 6. After release
Tell the owner: what shipped, ids, which versions receive it, what to test on their phone, owner to-dos (console clicks). Tidy: merged branches deleted, record in memory only what is lasting.
Then run `product-pulse` (studio-core) with what shipped as the trigger; it stays silent if nothing is worth raising.

## Gotchas
- Stores reject a version code uploaded before, even as a discarded draft.
- Plugin flags act app-wide; Play infers hardware requirements from permissions; neither shows in tsc, tests or a dev build with a stale `android/`.
- iOS: untested recorder/image settings must be verified on a real iPhone before any iOS release.
- Future-dated notes destroy trust: `date` first.
