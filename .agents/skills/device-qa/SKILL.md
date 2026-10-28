---
name: device-qa
description: Protocol for testing an Expo / React Native app on an Android emulator or a USB-connected phone - RAM check, emulator settings, local backend swap, demo-account sign-in, adb reverse, focus check before every input, keyboard-open test for every input, screenshots and the QA report. Use when the user says "test on the emulator", "test on the phone", "QA this", "run the app on a device", "check the keyboard", "take screenshots", or before any release.
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Device QA

Hard rules (from the playbook): demo accounts only; the focused app must be confirmed before EVERY input on a real phone; never a blind tap loop; never kill all node; do not clear the bundler cache first. Put them verbatim in any helper brief.

## 1. Pick the target
- **Real phone over USB (preferred):** it is the real target and needs no RAM. `adb devices` -> if "unauthorized"/locked, ask the owner to unlock and enable Developer options -> Stay awake. A dedicated TEST phone only; never the owner's daily phone.
- **Emulator:** only if host free RAM is enough. A 3 GB AVD actually uses about 4.4 GB on the host; plus bundler ~0.6 GB, Docker/WSL ~1 to 2 GB. Check free RAM first (`Get-CimInstance Win32_OperatingSystem | % FreePhysicalMemory`, KB). Need roughly **3.5 GB free minimum, 6 GB comfortable**. Runs froze or black-screened below ~0.5 GB free. If not enough: use the phone, or play the "second person" with a node script signed in as another demo user. When a run freezes: stop, do not keep retrying (rebooting clears stuck processes).
- One phone, two helpers: use a lock file (`phone.lock`) so only one drives it.

## 2. Emulator settings (what made first render 2 minutes -> seconds)
- AVD `config.ini`: `hw.ramSize` 3072, `hw.cpu.ncore` 4 to 6, `vm.heapSize` 512, `hw.gpu.mode=host`. Put the AVD on a drive with space; adb leftovers (`tmpAdbCmds`) can grow to GBs, safe to delete with the emulator off.
- GPU: on Windows hybrid laptops set the Graphics preference for `qemu-system-x86_64.exe` to the discrete GPU. Start: `emulator -avd <name> -gpu host -dns-server 8.8.8.8,1.1.1.1 -no-snapshot-save -no-boot-anim`. Verify: `adb shell dumpsys SurfaceFlinger | grep GLES` names the discrete GPU.
- **DNS flag** fixes "no internet" after host network changes (push registration fails without it).
- **PC mic resets every boot:** `adb -s emulator-5554 emu avd hostmicon`, or voice tests hear nothing. `-allow-host-audio` for voice.
- Demo-mode status bar for clean screenshots: `adb shell settings put global sysui_demo_allowed 1`, then `am broadcast -a com.android.systemui.demo --es command enter`, then `clock -e hhmm 1000`, `battery -e level 100 -e plugged false`, `network -e wifi show -e level 4`, `notifications -e visible false`; leave with `command exit`.
- Use `adb exec-out` (never `adb shell`) to pull binary data (shell injects CRLF).
- **Windows Git Bash rewrites device paths:** `/sdcard/ui.xml` becomes `C:/Program Files/Git/sdcard/ui.xml`, so `uiautomator dump` + `cat` silently return nothing. Prefix those adb calls with `MSYS_NO_PATHCONV=1` (or use PowerShell). MIUI also prints a harmless Java stack trace on `uiautomator dump`; send stderr to null.
- Bundler for audits: `npx expo start --port 8081 --no-dev --minify`. Do NOT pass `-c` unless the bundle is stale.

## 3. Point the app at the LOCAL backend
1. `supabase start` (retry once on a container name conflict). 2. Back up `.env` outside git. 3. Swap to the local block (URL `http://127.0.0.1:<api-port>`, local anon key), see `env-setup`. 4. Start the bundler with the vars (`EXPO_PUBLIC_*` are inlined at bundle time: restart after any change). 5. `adb reverse tcp:8081 tcp:8081` and `adb reverse tcp:<api-port> tcp:<api-port>`. 6. At the end restore `.env` byte-exact: `cmp .env <backup>` must pass.
**Black screen** = the dev client never got the bundle. After any APK (re)install the reverse mappings are lost: redo `adb reverse`, then `am force-stop <pkg>` + `am start`, and wait for `ReactNativeJS` logs. A reinstall also drops runtime permissions: `adb shell pm grant <pkg> android.permission.RECORD_AUDIO` (and others needed).
Local gradle builds need `JAVA_HOME` (Android Studio JBR) and `ANDROID_HOME`.

## 4. Sign in with a demo account
If real sign-in is Google-only, use a script (pattern from the reference app): `node scripts/e2e/signin.mjs <adb-serial> <email>` which (a) fetches a session from the local auth endpoint with the demo password, (b) force-stops the app, (c) pulls the app's storage DB with `adb exec-out run-as <pkg> cat databases/RKStorage`, (d) inserts the session under the Supabase storage key (`sb-<host-first-label>-auth-token`), (e) pushes it back via `/data/local/tmp` + `run-as cp`. Works on debuggable builds only. Always check the app is NOT signed in as a real account before testing.

## 5. Focus check before every input (real phone, mandatory)
```
adb -s <serial> shell dumpsys window | grep mCurrentFocus   # must contain the app package
```
Run it before EVERY tap, keyevent or text. Not the app -> stop and report. No fixed-coordinate tap sequences without a check between steps. After a cold start, wait for the app window and confirm it. Never press CALL, never open the dialer/contacts (a blind loop once called real contacts). Prefer `uiautomator dump` to find elements over guessed coordinates.

**Web pages on the phone** (site, admin panel): `adb reverse tcp:<port> tcp:<port>`, open with `am start -a android.intent.action.VIEW -d http://localhost:<port>/… com.android.chrome`, and check focus for `com.android.chrome` instead of the app. Chrome's password-manager sheet can swallow the first tap on a login field: dismiss it with Back, tap again, and never pick one of the owner's saved passwords; decline "Save password".

## 6. Keyboard-open test (every input, every pass)
For every screen/sheet/dialog touched: tap each text input, screenshot with the keyboard open, confirm the focused input AND its action button (Save/Send/Add) are visible above the keyboard. Re-test after ANY change to the screen, even non-keyboard changes. A pass without these screenshots is not done.

## 7. Matrix per touched flow
Light + dark; font scale 1.0 and 1.3 (`adb shell settings put system font_scale 1.3`; reset to 1.0 after); small and large screens if available; offline/slow network for network flows; second language if the app has one; back button and rotation where relevant.

## 8. Screenshots
`adb exec-out screencap -p > file.png`. Folder: `docs/testing/screenshots/<YYYY-MM-DD>-<feature>/`; names `NN-<screen>-<light|dark>[-kb].png` (`-kb` = keyboard open). Real date from `date`. Fictional demo data only.

## 9. Report (10 lines or fewer)
Target (emulator/phone, account used) - flows tested - matrix covered - keyboard check done Y/N per input - bugs found with screenshot paths - what was NOT tested - processes left running (PIDs) - `.env` restored (`cmp` ok).

## 10. Web panels (admin, dashboards) without a device
Headless browser at phone width (390 px) against the dev server pointed at a fake backend URL; route that URL to sample JSON and put a fake session in local storage, so no real data or sign-in is touched. Simulate the keyboard: focus the input, shrink the viewport height by ~300 px, and check the input and its action button are still on screen. Then a real phone once it is live.
