# Cube Grid Landing — Handoff

## Project context

Portfolio at `/Users/matiasgoloboff/matigolo-portfolio`.
Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, framer-motion.
Dev server: `npm run dev` (port 3000).

---

## What was built

A full-screen landing overlay inspired by devashish.design — a grid of 3D tiles that pops up on first page load (refresh only, not on client-side nav back from case studies). The center tile is purple with a loading counter → "CLICK TO ENTER". Clicking it triggers a scatter-out exit animation that reveals the homepage.

### Files

| File | Role |
|------|------|
| `components/CubeGridLanding.tsx` | The landing overlay component |
| `components/HomeClient.tsx` | Client wrapper — manages `sessionStorage("seen-landing")` to decide whether to show the overlay |
| `app/page.tsx` | Homepage — wrapped in `<HomeClient>` |

### How `HomeClient` works

```tsx
// Shows overlay on hard refresh, skips on client-side navigation
const seen = sessionStorage.getItem("seen-landing");
setShowLanding(!seen);
// On enter: sets "seen-landing" in sessionStorage → hides overlay
```

---

## Current tile design (as of last session)

Each tile uses a **flat-perspective 3D trick** — no CSS side walls, just two layers:

1. **Back face** (`translateZ(0)`) — full-bleed lavender (`#E8D0FF`) square with no border-radius. This is always visible.
2. **Front face** (`translateZ(DEPTH)`, inset `INSET`px from all edges) — white rounded rectangle that floats above. The lavender back face shows around it as a "frame".

The pop-out illusion comes from `perspective: 800` on each tile + `translateZ(80px)` on the front face.

### Key constants

```ts
const TILE   = 100;   // tile size in px
const GAP    = 0;     // no spacing between tiles (tightly packed)
const CELL   = 100;   // = TILE + GAP
const DEPTH  = 80;    // front face elevation in px
const RADIUS = 10;    // border-radius of front face
const INSET  = 14;    // inset of front face from tile edge (creates the lavender "frame")
const SIDE_COLOR   = "#E8D0FF";  // lavender back face / frame
const BORDER_COLOR = "#C2C2C2"; // subtle grey border on front face
```

### Wave animation

CSS `@keyframes keyPress` applied to the inner wrapper div (not the motion.div, to avoid framer-motion transform conflicts):
- Oscillates `translateZ` between `0` and `DEPTH` → tiles "pop in and out" continuously
- Each tile has a staggered `waveDelay` and `waveDuration` based on col/row for organic feel
- `animation-fill-mode: backwards` so tiles start in the popped-down state before the delay fires

### Center tile (purple)

- Back face: `#5b21b6`
- Front face: `#7c3aed`, always at `translateZ(DEPTH)` (static, no wave)
- Shows counter `0 → 100` (framer-motion `animate()`, 2s), then "CLICK TO ENTER"

### Entrance animation

- `motion.div` handles: `initial={{ scale: 0.6 }}` → `animate={{ scale: 1 }}`
- Staggered delay: `Math.min(distance * 0.02, 0.6)` (from center out)
- `opacity` is NOT animated (removed for simplicity — opacity only on the parent overlay)

### Exit scatter

On click, each tile animates outward from center:
- Direction: `Math.atan2(row - centerRow, col - centerCol)`
- Distance: `distance * 180` px
- Delay: `distance * 0.04`s (outer tiles delay slightly)

---

## Things to keep working on

### Possible tweaks still open

- **Corner artifacts at grid edges**: Full-width walls (no RADIUS trim) means the very edge tiles of the grid show small corner flaps where the front face's rounded corners meet the tile edge. These are mostly off-screen. If they're visible, reduce `INSET` or trim the back face.
- **Tilt / rotation**: Currently no `rotateX` on the grid or tiles — the "depth" is pure perspective. If you want to restore a slight tilt to show the top/bottom of each tile, add `rotateX(8deg)` to the inner wrapper div and update the `@keyframes` to include it.
- **Purple accent on center tile**: Colors are `#7c3aed` (front) / `#5b21b6` (back). Can adjust here.
- **Text on center tile**: Currently "Click / to / enter" at 10px. Can change text or size.
- **Scatter exit timing**: `exitDelay = distance * 0.04` and `duration: 0.5`. The overlay waits 900ms before calling `onEnter()`. Can tune.

### Not yet done (broader portfolio)

Per the agreed order of operations:
1. ✅ Landing animation
2. ⬜ Agentic Co-pilot case study content (text only — next up)
3. ⬜ Images: user exports from Figma, we insert them
4. ⬜ Polish pass (design-taste-frontend / impeccable skill)
5. ⬜ Deploy to GitHub Pages (github.matigolo domain)
6. ⬜ Resume PDF at `/public/resume.pdf` (nav button links to it, file missing)

---

## Quick test commands

```bash
# Reset the "seen" flag and see the landing again
# In browser DevTools console:
sessionStorage.removeItem('seen-landing'); location.reload();

# Or in the Claude browser tool:
# javascript_tool: sessionStorage.removeItem('seen-landing'); window.location.reload();
```

---

## Design decisions made (don't re-litigate)

- Landing shows on **hard refresh only** (sessionStorage, not localStorage)
- Nav is covered by the fixed overlay (z-index 50), no separate hide logic needed
- No mouse parallax on the grid (was tried, removed at user request)
- Purple accent color: `#E8D0FF` for walls/frame, `#7c3aed` for center tile
- Gap between tiles: `0` (tightly packed, like the reference devashish.design)
- CSS approach: flat `translateZ` pop-out with back-face visible, no explicit side walls (cleaner than 3D wall geometry which had corner artifacts)
