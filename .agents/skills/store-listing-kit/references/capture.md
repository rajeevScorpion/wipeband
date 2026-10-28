# Capturing real app screens

Prefer a release/production-like build (no dev menus, no debug banners) pointed at a backend where a fictional test account exists. Never sign in with the owner's personal account for marketing shots.

## Android emulator (adb)
Clean status bar (System UI demo mode) before capturing; exit afterwards:
```
adb shell settings put global sysui_demo_allowed 1
adb shell am broadcast -a com.android.systemui.demo -e command enter
adb shell am broadcast -a com.android.systemui.demo -e command clock -e hhmm 0941
adb shell am broadcast -a com.android.systemui.demo -e command battery -e level 100 -e plugged false
adb shell am broadcast -a com.android.systemui.demo -e command network -e wifi show -e level 4 -e mobile hide
adb shell am broadcast -a com.android.systemui.demo -e command notifications -e visible false
# ... capture ...
adb shell am broadcast -a com.android.systemui.demo -e command exit
```
- `-e mobile hide` matters: otherwise a "3G"/"LTE" label appears.
- Theme: `adb shell cmd uimode night yes|no` (app must follow system), then relaunch: `adb shell monkey -p <package> -c android.intent.category.LAUNCHER 1`. Restore with `cmd uimode night auto`.
- Capture: `adb exec-out screencap -p > raw/<name>-light.png` (Git Bash/PowerShell: make sure the output isn't CRLF-mangled; `exec-out` is binary-safe).
- Drive the UI: `adb shell uiautomator dump /sdcard/ui.xml && adb pull /sdcard/ui.xml` to find bounds, then `adb shell input tap X Y`, `input swipe`, `input text "hello%sworld"` (`%s` = space; apostrophes and non-ASCII break it).
- Non-Latin text (Devanagari, etc.): install ADBKeyboard (github senzhk/ADBKeyBoard) on the emulator, `adb shell ime set com.android.adbkeyboard/.AdbIME`, then `adb shell am broadcast -a ADB_INPUT_TEXT --es msg 'कल सुबह 7 बजे'`. Restore the default IME afterwards.
- Hide the keyboard before shooting: `adb shell input keyevent 111` (Escape) or tap outside.
- Pulsing/animated elements: take 2–3 shots and keep the best frame.

## iOS simulator (xcrun simctl)
```
xcrun simctl status_bar booted override --time "9:41" --batteryState charged --batteryLevel 100 --wifiBars 3 --cellularMode notSupported
xcrun simctl ui booted appearance dark|light
xcrun simctl io booted screenshot raw/<name>-light.png
xcrun simctl status_bar booted clear
```

## Web or React Native Web fallback
When no emulator is available: run the web build, open it in headless Chrome/Edge at the phone's CSS size with the device scale factor (e.g. `--window-size=412,915 --force-device-scale-factor=2.625` for 1080×2400) and screenshot. Add a drawn status bar in the template if needed. Say in the report that shots came from the web build.

## Content checklist
- Every shot has a reason (maps to one storyboard slide). Capture light and dark of each; the storyboard picks.
- Lists look full (5+ items) but not crowded; the first visible items carry the story (scroll or filter if needed).
- Generated text that reads robotic or wrong (descriptions, groups, categories) is a product finding: report it, and pick or retake content that reads well.
- `raw/INDEX.md`: one line per file — what it shows, caveats.
