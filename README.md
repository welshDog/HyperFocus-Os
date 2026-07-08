# HyperFocus OS

**Turn the mess in your head into research, a launch plan, and the smallest possible next step — calmly.**

HyperFocus OS is a focus companion for solo founders and neurodivergent builders. Every other productivity tool yells at you: streaks, scores, red badges, guilt. HyperFocus OS does the opposite. You dump the chaos, it hands back one calm plan and *one* tiny thing to do next. When you're stuck, it doesn't scold you — it helps you shrink the step.

> **One-liner:** Every productivity tool yells at you. HyperFocus OS gives neurodivergent founders one calm next step.

---

## Why this matters

Starting is the hardest part of building — especially with an ADHD brain. You open twelve tabs, panic, and close the laptop. The problem isn't a lack of tools; it's that every tool adds pressure. HyperFocus OS is deliberately the *anti*-productivity app: no attention scoring, no streaks to break, no shame. Just relief, structure, and momentum — the smallest honest next step.

## How it works — the hero flow

**Dump → Plan → Focus Sprint → Win**

1. **Dump** — Drop the messy version of your idea. No structure required.
2. **Plan** — It comes back calm: a one-line reframe, what to research first, and a lightweight launch plan.
3. **Focus Sprint** — One bite-sized micro-task at a time. Stuck? The **"I'm stuck"** button offers mercy, not metrics.
4. **Win** — A quiet "that counts." No confetti-spam — just acknowledgement, and a way to start the next slice.

Everything is powered by a canonical, tested **skill stack** (see below), so each screen pulls the right calm-UX guidance instead of improvising.

## Demo

The whole flow runs on a **seeded hero idea** — *"launch a newsletter for ADHD developers"* — so it works end-to-end **with no network**. That makes the live demo bulletproof.

```bash
npm install
npm run dev
# open http://localhost:5173/  and walk Dump → Plan → Focus → Win
```

> _Screenshots / demo video: see the submission pack. Capture the three key states — Dump (raw idea), Plan (calm reframe), Focus + rescue._

## Quick start

```bash
npm install      # install dependencies
npm test         # run the Vitest suite (unit + full-flow integration)
npm run dev      # start Vite dev server
npm run build    # production build
npm run preview  # preview the production build
```

- App entry: `src/main.tsx` → `src/App.tsx` (routes: `/`, `/plan`, `/focus`, `/win`)
- Hero demo content: `src/content/heroIdeaSeed.ts`
- Skill stack (source of truth): `src/config/hyperfocus_skill_stack.ts`

## Tech stack

TypeScript · React 18 · React Router · Vite · Vitest · Testing Library.
State is in-memory and seeded — no backend, auth, or persistence required to run the demo.

## Architecture story (built thoughtfully, not vibes)

We grew the product in verifiable layers, each proving the next:

```
war-room truth docs  →  machine-readable skill stack  →  tests as first consumer
                                                        →  /focus as first visible consumer
                                                        →  full seeded hero flow (Dump→Plan→Focus→Win)
```

- **Truth docs** (`docs/war-room/`, `docs/AGENT_START.md`) define positioning and guardrails.
- **Skill stack** (`src/config/hyperfocus_skill_stack.ts`) is the machine-readable source of truth for which calm-UX skills power each screen.
- **Tests** were the *first* consumer of that config, then `/focus` became the first *visible* one.
- **The hero flow** wires all four screens into one continuous, seeded, offline-safe demo.

## Status

- **Phase 1a** — skill-stack config proven by tests.
- **Phase 1b** — `/focus` renders `screenSkillLoadout.focus`; minimal app shell.
- **Phase 1c** — Focus Sprint becomes a calm micro-task flow with the "I'm stuck" rescue.
- **Phase 1d** — full `Dump → Plan → Focus → Win` hero flow wired end-to-end, seeded, with an app-level integration test.

Roadmap: [`docs/HACKATHON_ROADMAP.md`](docs/HACKATHON_ROADMAP.md) · Submission checklist: [`docs/SUBMISSION_PACK.md`](docs/SUBMISSION_PACK.md)

## For contributors / agents

Start here, in order:

1. [`docs/AGENT_START.md`](docs/AGENT_START.md) — project snapshot, skill stack, guardrails, session start order.
2. [`docs/WAR_ROOM_LATEST.md`](docs/WAR_ROOM_LATEST.md) — the full war-room strategy pack.

**Guardrails:** no clinical claims, no surveillance or guilt mechanics, no generic-AI-wrapper drift. Keep every change anchored in *Dump → Plan → Focus Sprint → Win*, and keep it feeling like **relief, not management software.**
