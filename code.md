# Netravati Expedition — Build Brief for Antigravity

## 0. What changed from the original prompt, and why

The original brief is a strong *creative* brief but a weak *agent* brief. Three problems, fixed below:

1. **No build order.** "Use Three.js, GSAP, Framer Motion, do everything at once" is how an agent burns its context on a half-working 3D scene and never gets to the content. Rewritten as **phases with acceptance criteria**, so Antigravity can checkpoint progress and you can review before it goes deeper.
2. **Photoreal assets that don't exist.** "Hornbills flying, river spray, jeep moving through coffee plantations" implies real photo/video/3D assets you likely don't have. A coding agent will either stall, hallucinate broken `<img>` paths, or burn time generating placeholder art badly. Rewritten to specify a **stylized low-poly / painterly procedural look** (geometry + gradients + particles, no photo dependency) — this is also what makes a from-scratch Three.js scene performant on mobile.
3. **No real data.** Date, group name, exact distances/elevation per day, and difficulty rating aren't in the brief. Flagged explicitly as **placeholders the agent must pull from a single `content/itinerary.ts` file** — so when you supply real numbers later, nothing else needs to change.

Everything else below is the same creative ambition, made buildable.

---

## 1. Project Snapshot

| | |
|---|---|
| **Name** | Netravati Expedition |
| **Format** | Single-page scrollytelling site, 3 days of content |
| **Region** | Western Ghats, Karnataka — Mudigere → Samse → Netravati Peak → Maidadi View Point → Kodige Falls → coffee estate |
| **Reference feel** | Apple product page pacing, Patagonia expedition storytelling, National Geographic restraint, NOT a generic SaaS landing page |
| **Stack** | Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Framer Motion · GSAP + ScrollTrigger · React Three Fiber + drei |

**Placeholders to fill before/during build** (agent should read these from `content/itinerary.ts`, not hardcode them in components):
- Trek dates (Day 1 / 2 / 3 calendar dates)
- Group/organizer name
- Total distance per day, cumulative elevation gain, summit elevation, difficulty grade
- Number of participants / batch size (if relevant to the page)
- Estate/homestay names if they should be shown (Samse Homestay, the Airbnb coffee estate name)

---

## 2. Design Direction (resolved, not generic)

Per design-quality review, three defaults to actively avoid here: warm-cream-serif-terracotta, near-black-with-one-neon-accent, and broadsheet-hairline-newspaper. None fit a Malnad/Western Ghats monsoon-forest trek. Direction instead:

**Palette** (named, not just hex):
- `--canopy` `#0E1B14` — near-black forest green, base background
- `--mist` `#D9E4DC` — pale sage-white, primary text on dark
- `--moss` `#41603F` — mid-green, card surfaces / glass tint
- `--clay` `#B4623E` — terracotta-rust, Malnad earth roads, used for CTA/accents only
- `--dawn` `#F2A65A` — sunrise amber, Day transitions and elevation highlights
- `--river` `#6FA8A0` — muted teal, water/river motifs

**Type:**
- Display: **Fraunces** (variable, high-contrast serif with personality — reads like an expedition journal masthead, not a tech product)
- Body/UI: **Inter** or **General Sans**
- Data/utility (times, distances, coordinates): **Space Grotesk** — gives the timestamps and stats a surveyor's-instrument feel rather than generic dashboard numerals

**Signature element:** a **contour-line trail spine** — a single SVG path that runs the full length of the page like a topographic contour line, literally bending and rising/falling in sync with the real elevation profile of the trek. Checkpoints (Mudigere, Samse, Forest Checkpost, Peak, Maidadi, Kodige Falls, Estate) are dots threaded on this line. It draws itself via `stroke-dashoffset` tied to scroll position. This replaces generic numbered-step markers with something that actually encodes trek data — elevation is the real subject here, so the spine *is* the elevation chart, not a separate widget.

**Day/night lighting:** controlled by scroll progress within each day's section (not wall-clock time) — ambient gradient + Three.js scene fog/light color interpolates dawn → day → golden hour → night across each day's scroll range.

---

## 3. Content Structure (filled in, structured for `content/itinerary.ts`)

```ts
// content/itinerary.ts — single source of truth, agent reads from here

export type Checkpoint = {
  id: string;
  day: 1 | 2 | 3;
  time: string;            // "06:00 AM"
  title: string;
  location: string;
  elevationM: number;      // meters above sea level, drives the contour spine
  distanceKm: number;      // cumulative distance at this point
  description: string;
  tags?: string[];         // e.g. ["river-crossing", "viewpoint", "meal"]
};
```

**Day 1 — The Ascent** *(Journey Into The Wild)*
1. Mudigere Bus Stand — arrival, group pickup, scenic drive to Samse
2. Samse Homestay — freshen up, traditional breakfast, trek briefing, group intro
3. Netravati Forest Checkpost — transition from road to trail, off-road jeep stretch, forest canopy
4. Netravati Peak Trek (multi-milestone) — forest trail, tiered waterfalls, river crossings, steep ascents
5. Netravati River Crossing — dedicated dramatic beat
6. Final Summit Push — elevation climb, clouds underfoot, wind
7. Netravati Peak Summit — panoramic reward, packed lunch, photography, stats overlay
8. Return to Samse — golden hour descent, optional hanging bridge stop
9. Night at Homestay — campfire, stars, lanterns, group wind-down

**Day 2 — Waterfalls & Viewpoints** *(Exploration Beyond the Summit)*
1. Sunrise wake-up — birdsong, coffee aroma, light through canopy
2. Maidadi View Point — 360° valley/range reveal
3. Kodige Falls — interactive water section (spray, rock, pool)
4. Traditional Malnad Lunch — banana-leaf meal, local cuisine
5. *(Optional, time-permitting)* Rani Jhari View Point, Kelagur Tea Plantation — aerial-style sweep over tea rows
6. Evening Estate Stay — coffee estate Airbnb, sunset, firepit (weather permitting), dinner, night ambience

**Day 3 — Slow Morning** *(Farewell to the Mountains)*
1. Estate Walk — coffee tasting, plantation walk, dew-covered leaves, morning light
2. Checkout — return to Mudigere Bus Stand
3. Closing line: *"Every summit leaves a story behind."*
4. Journey stats recap — total distance, total elevation gained, days, memories framed as a closing "achievement" panel, not a repeated dashboard

> Note: the original brief gave Day 1 and Day 2 explicit clock times but left Day 3 untimed. Recommend keeping Day 3 deliberately loose/untimed in the copy ("a slow morning" tone) rather than forcing times — it reinforces the "farewell" pacing rather than mechanical itinerary listing.

---

## 4. Three.js Scene — scoped for feasibility

Full photoreal terrain with jeeps, hornbills, and river spray as literal 3D assets is not realistic to hand an agent without an asset pipeline. Scope it instead as:

- **One continuous low-poly ridge-line mesh** (procedural, generated from the elevation data above — same numbers driving the SVG contour spine, so the 3D terrain and the 2D spine agree).
- **Camera moves along a fixed spline path** above the terrain, position driven by scroll progress (`ScrollTrigger` updates a 0–1 value consumed by `useFrame`).
- **Atmosphere does the heavy lifting**: layered fog planes for mist, a gradient sky dome that shifts color per day/time-of-day, simple instanced particle systems for rain/mist motes — this reads as "cinematic" without needing modeled trees, jeeps, or birds.
- **Birds/jeep/waterfall**: represent as simple animated low-poly silhouettes or 2D sprite billboards in the 3D scene, not detailed models. Keep them as accents, not focal geometry.
- **Mobile fallback**: detect low-end devices / `prefers-reduced-motion` and swap the R3F canvas for a static layered-parallax CSS/SVG version of the same ridge line. Ship this fallback from day one, not as an afterthought — it's also what keeps Lighthouse scores sane.

---

## 5. Phased Build Plan (acceptance criteria per phase)

**Phase 0 — Scaffold**
- Next.js 15 + TS + Tailwind project, design tokens (colors/type/spacing) in `tailwind.config` and CSS variables.
- `content/itinerary.ts` populated with the structure above (placeholders marked `TODO:` where real data is missing).
- ✅ Done when: app boots, tokens render in a style-guide page, content file type-checks.

**Phase 1 — Static layout, no animation**
- Hero, Day 1/2/3 sections, stats panel, all checkpoints rendered as plain glass cards in document order. Fully readable with zero JS animation.
- ✅ Done when: page is complete and correct content-wise, scrollable top to bottom, responsive at 375/768/1440px, passes a11y check with no motion.

**Phase 2 — Contour spine + scroll reveals**
- SVG spine drawn from elevation data, animates with scroll. Checkpoint cards fade/slide in via Framer Motion + ScrollTrigger as they enter viewport.
- ✅ Done when: spine height changes visibly match elevation data; reveals work scrolling both directions; respects `prefers-reduced-motion` (cards simply appear, no slide).

**Phase 3 — 3D scene**
- R3F canvas with procedural terrain + scroll-driven camera, layered behind Phase 2 content as a fixed background.
- Day/night lighting interpolation tied to per-day scroll range.
- ✅ Done when: 60fps on a mid-tier laptop, graceful CSS fallback confirmed on a throttled/mobile profile, canvas never blocks scroll or interaction with cards above it.

**Phase 4 — Supplementary sections**
- Trek stats counters, packing checklist, route map overview, weather cards, safety accordion.
- ✅ Done when: each is keyboard-navigable, counters animate once (not on every scroll re-entry), accordion has correct ARIA states.

**Phase 5 — Polish pass**
- Audio: optional ambient track, **off by default**, explicit user-initiated toggle (autoplay will be blocked by browsers anyway — don't fight this).
- Performance pass: image/asset budget, code-split the R3F bundle, Lighthouse check.
- Final visual self-critique against Section 2's design direction — remove one ornament, per the usual rule.

---

## 6. Explicit Non-Goals

- No real photography/video required or expected — the procedural/illustrative approach in Section 4 is the actual direction, not a placeholder for "later add real photos."
- No backend, booking flow, or payments — this is a presentation piece for an existing group, not a marketing funnel.
- No autoplaying audio or video under any circumstance.

---

## 7. Open Questions for You (resolve before or during Phase 0)

1. Exact calendar dates for the 3 days, and group/organizer name for the hero.
2. Real distance/elevation numbers per day (or confirm using typical published Netravati Peak trek figures as placeholders).
3. Do you want real estate/homestay names shown (Samse Homestay, the specific coffee-estate Airbnb), or kept generic?
4. Any existing brand colors/logo for the trekking group that should override the palette in Section 2?