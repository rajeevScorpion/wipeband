# Worked example (WowTodo): the "Speak" card should open and close instantly

**Complaint (also felt on the real phone):** after tapping the mic, the capture card takes noticeable time to appear; closing it also lags. **Target:** appear on the same frame as the tap, vanish on the same frame as close.

**Flow traced:** mic press handler -> `startListening` -> `await voice.start()` -> set phase `listening` -> panel mounts.

## Causes found by reading, ranked
Open (card shows late):
1. HIGH - the handler **awaited the recorder/recogniser start before setting the visible state**. `start` awaited a permission request (a native bridge call even when already granted), a synchronous file sweep, then engine spin-up. *Fix: set the phase first, start audio after the first frame.*
2. HIGH - the card's **enter animation (fade 220 ms) and layout transition (220 ms)** plus a **250 ms veil** made it invisible while animating. *Fix: remove entering/layout or <= 100 ms opacity-only; veil 0 to 80 ms.*
3. MED - heavy first render: three SVG gradient blobs and nested stacks mounted on tap, rendered only after an `onLayout` round trip. *Fix: keep the panel mounted but hidden (opacity 0, pointerEvents none) and toggle by shared value; cache the measured size.*
4. MED - the Home screen **swapped whole subtrees** in one commit and re-rendered on every flow state change (new object each render). *Fix: keep both mounted and toggle display; memo; stable callbacks.*
5. LOW - haptics fired first (not awaited: fine); 100 ms timer calling setState each tick; partial speech results re-rendering the screen. *Fix: throttle live words to ~150 ms; level meter already on shared values (good).*

Close (card gone late):
- the veil's 250 ms fade-out and layout transitions on siblings; `cancel` was not awaited (fine). *Fix: set veil to 0 directly on close; no layout animation; call `reset()` first, then cancel audio in the background.*
- the Done path waited up to 4 s for the engine's end event before transcribing: dead time. *Fix: do not block on 'end'; use the final result and upload in parallel; show "working" immediately.* (A final high-accuracy transcription step stays: owner decision.)

## Measurement plan (markers)
JS thread via `performance.now()`: (a) handler entry, (b) before/after each `await` (split permission vs engine start), (c) panel first render and first `onLayout`, then first blob frame, (d) recorder ready event. Close: (e) cancel/Done press, (f) `reset()` done, (g) panel unmount cleanup, (h) veil opacity reaches 0. UI thread: log when the shared value hits its end. Target a-to-c under one frame (16 ms), e-to-g under one frame. Measure on the real phone with a release-like bundle.

## Order of work
Fix 1 (show first, start audio after first frame) + fix 2 (drop the 220/250 ms animations) together give most of the "0 ms" feel; do fix 3 (pre-mount hidden) only if the real phone still shows a gap. Re-measure after each, then report the table.

## Lessons
- The slowest thing was not a render but an `await` in front of the render.
- Animation durations on the critical path count as latency.
- Keep heavy UI mounted-hidden instead of mount-on-tap; drive it with shared values.
- Read first (30 min, no edits), get the owner's approval for the fix list, then change code.
