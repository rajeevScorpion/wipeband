# EAS (Expo Application Services)

## Basics
- Run from the app folder. `eas` is usually not installed globally: `npx -y eas-cli <cmd>`. (`npx eas` fails with "could not determine executable".)
- `eas.json` profiles: `development` (dev client, internal, channel `dev`), `preview` (APK, internal), `production` (app-bundle AAB, store). Public env values (`EXPO_PUBLIC_*`) go in each profile's `env` or EAS environment variables; never secrets. Keep `appVersionSource: "local"` if you bump versions in `app.json`.
- Free tier = limited builds per month. **Build only after meaningful, device-tested changes; batch fixes; cancel superseded queued builds.**

## Play build
1. Bump `expo.version` (user-visible) and `android.versionCode` (integer, must be higher than any ever uploaded, even a discarded draft).
2. Check the merged manifest BEFORE building (see release-ritual): `npx expo config --type introspect` with the local `android/` folder moved aside so stale entries do not leak in.
3. `npx -y eas-cli build --platform android --profile production --non-interactive --no-wait`; read the id; download the AAB when done.
4. First upload to Play must be manual (internal testing track); later automate with `eas submit` and a service-account key.
5. Local gradle builds (dev client) need `JAVA_HOME` (Android Studio JBR) and `ANDROID_HOME` set.
6. `android/` and `ios/` are generated (prebuild); `app.json` plus config plugins are the truth. Hand edits are lost.
7. Release builds signed with the debug key are rejected by Play; EAS injects real credentials.

## OTA (EAS Update)
- `npx -y eas-cli update --channel production --platform android --message "..." --non-interactive` from the app folder.
- **Runtime version = app version** (policy `appVersion`): an OTA reaches only installs of the matching runtime. After a native change or version bump, the new runtime needs a new store build; previous OTAs do not apply to it.
- Phones fetch the update on launch and apply it on the next one (close and reopen twice).
- **Needs free RAM**: the Hermes bytecode step (`hermesc`) crashed with ~1.6 GB free ("Failed to generate Hermes bytecode") and succeeded with ~4 GB. Stop the emulator (`adb emu kill`) and the bundler (by PID) first.
- JS-only changes ship as OTA; anything touching native modules, permissions, plugins or app.json native fields needs a build.

## Permissions (classifier) note
The permission system may block `eas build/update` as production deploys until the owner says go in chat or an allow rule matches. Run as a bare command; if denied, hand the exact command to the owner and read the result afterwards.

## Record
Each build/OTA: id, version/runtime, commit, one line of what changed -> release log (see release-ritual).
