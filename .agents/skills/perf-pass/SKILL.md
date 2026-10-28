---
name: perf-pass
description: Measure-first recipe for "it feels slow" in a React Native (Expo) app - add markers on the JS and UI thread, read logcat, split the cost, apply targeted fixes (show first, work after first frame; pre-mount hidden views with shared values; memo; move high-frequency state into a small store; drop slow animations), re-measure and report a before/after table. Use when the user says "it feels slow", "laggy", "make it instant", "0 ms", "open/close takes time", "performance pass", "why is this screen slow".
---

Project compatibility: read `docs/project/WORKING_CONTRACT.md` before applying this skill. Its shared paths and host-tool mappings override upstream defaults below.


# Perf pass

Never optimise from a hunch. Order: **define the target -> measure -> split the cost -> fix the biggest piece -> re-measure -> report.** Stop when the target is met; do not gold-plate.

## 1. Define the target
Write one sentence per interaction: "tap -> card visible on the same frame (< 16 ms of JS work before first paint)", "close -> gone on the same frame". Note the device: test on the **real phone and a release-like bundle** (`--no-dev --minify` or a release build); dev mode and emulators exaggerate or hide costs.

## 2. Static read first (cheap)
Trace the path from the touch handler to the first painted frame. Look for, in this order of usual cost:
1. `await` before the state change that shows the UI (permission requests, recorder/engine start, file sweeps, network).
2. Enter/exit/layout animations on the thing that should appear instantly (fade-ins of 200+ ms, veils, layout transitions).
3. Mount cost: heavy trees (SVG gradients, blurred layers, many styled stacks) created on tap; waiting for `onLayout` before rendering the real content.
4. Parent re-renders: a screen that re-renders on every state change of a hook, new object identities each render, a swapped subtree (unmount A, mount B) in one commit.
5. High-frequency state (timers, audio levels, partial speech results) held in React state at the top of the tree.
6. Work on close: cleanup, file deletes, resets before the hide.

## 3. Measure (add markers, keep them behind a flag, remove or keep off at the end)
- JS thread: `performance.now()` at the touch handler entry, before/after each `await`, first render of the target component, first `onLayout`, effect cleanup on unmount. Log with a tag: `console.log('[perf] open:tap', t)` and read `adb logcat -s ReactNativeJS:V | grep "\[perf\]"`.
- UI thread: Reanimated `runOnUI` / a worklet logging when a shared value reaches its end; or compare with `Choreographer` frame logs / `adb shell dumpsys gfxinfo <pkg> framestats` for janky frames. For deep traces use Perfetto or the React Profiler on a release-like build.
- **Baseline with no code changes** (use this when markers aren't approved yet, e.g. in an audit):
  - Load the installed dev client with `npx expo start --dev-client --no-dev --minify`. Treat the results as before/after numbers, not store numbers.
  - Count requests per action from the local backend's gateway logs (`docker logs --since/--until <api-gateway container>`, e.g. Supabase Kong). This reveals duplicate refetches.
  - Warm start: `adb shell am start -W`.
  - Jank: `dumpsys gfxinfo <pkg> reset`, then the gesture, then `dumpsys gfxinfo <pkg>`.
  - Memory: `dumpsys meminfo <pkg>` before and after 15 open/close cycles.
  - Visual time: a device-side `screencap` loop timed with the same clock as the tap.
  - Don't pixel-time cold starts: Android shows a cached snapshot of the last screen. A dev client's cold-start time is mostly the bundle download.
- Run each scenario **5 times cold and 5 warm**, report median and worst. Same device, same account, same data, not charging-throttled, not while Gradle/Docker is busy.

## 4. Split the cost
Table every segment: `tap -> handler` | `handler -> state set` | `state set -> first render` | `first render -> first paint (layout/animations)` | `native start (recorder, etc.)`. The biggest segment is the target of the next fix; repeat.

## 5. Fix menu (apply the smallest that meets the target)
- **Show first, work after.** Set the visible state optimistically in the handler; start the slow thing (permission, engine, upload) after the first frame (`requestAnimationFrame` / `InteractionManager.runAfterInteractions`), and handle failure by reverting with a toast.
- **Pre-mount hidden.** Keep heavy panels mounted with `opacity 0` + `pointerEvents none` and toggle a **shared value**, so layout and SVG are already built. Do not branch `cond ? <A/> : <B/>` for expensive subtrees; toggle display.
- **Cached but slower means render-bound.** If a screen opens slower when its data is cached than when it shows a spinner first, the full render runs in the same JS turn as the navigation push and blocks the slide. Render a light first frame (header plus the first rows, or a skeleton), then the rest after the transition (`runAfterInteractions` / `transitionEnd`). Pre-filling the cache (`initialData`) without this makes the screen slower.
- **Kill slow animations on the critical path.** Drop or shorten (<= 100 ms, opacity only) entering/layout transitions and veils; set closing values directly (0 ms) instead of `withTiming`.
- **Memo and stable callbacks.** `React.memo` heavy children; stable handler identities; split a "god hook" so unrelated state does not re-render the screen.
- **Move high-frequency state to a small store** (shared values for UI-only values like audio level; a tiny external store with selectors for the rest) and throttle (e.g. partial results to ~150 ms).
- **Order the close.** Hide first (`reset()`), then cleanup native/files in the background.
- **Cache measurements** (measure size once) instead of waiting for `onLayout` each mount.
- Avoid: blur layers (see playbook), `renderToHardwareTextureAndroid` on many layers, large JSON in props.

## 6. Re-measure and report
Same scenarios, same device. Report <= 10 lines plus the table:

| Segment | Before (median / worst) | After | Change |
|---|---|---|---|
| tap -> card visible | ... | ... | ... |
| close -> gone | ... | ... | ... |

State what was changed (file, one line each), what was left alone and why, risks (race on optimistic show, permission-denied path), and that markers were removed or are off. Run the keyboard/regression checks from `device-qa` on the touched screens.

## Worked example
`references/example-speak-card.md` (a voice-capture card that appeared late on tap and lingered on close): causes ranked, fixes chosen, measurement plan.
