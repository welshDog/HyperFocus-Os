# HyperFocus OS — Hackathon Roadmap (Phase 1c → Demo-Complete)

> **Status (2026-07-08): DEMO-COMPLETE.** Phases 1a–1d and the optional 1d+ live-AI moment are all shipped and green (22 tests, typecheck, build). Remaining work is submission polish. The authoritative current-state doc is [`docs/BUILD_STATUS.md`](BUILD_STATUS.md); this file is the plan that got us here.

## Context
HyperFocus OS turns rough ideas into research, launch plans, and bite-sized next steps for solo founders and neurodivergent builders. For the hackathon the target is a **calm, demoable product with one flawless story** — not breadth.

The winning strategy: build **one vertical slice** through the full hero flow for a **single seeded idea**, so the demo completes end-to-end and cannot fail live.

Hero flow: **Dump → Plan → Focus Sprint → Win**
Seeded hero idea: `src/content/heroIdeaSeed.ts` (a newsletter for ADHD developers).

## Guiding Principles
- **One idea, all the way through** beats four half-built screens.
- **Seeded-first.** The seed is the deterministic demo path *and* the offline fallback. Live AI is an enhancement, never a dependency.
- **Calm is the product.** No streaks, scores, timers, or guilt. The "I'm stuck" rescue is the signature moment.
- **Demo-safe over feature-rich.** If it can break on stage, gate it behind a flag with a seeded fallback.

## Where We Are
- **Phase 1a — done.** Skill-stack config proven by tests (`src/config/hyperfocus_skill_stack.ts`).
- **Phase 1b — done.** `/focus` route renders `screenSkillLoadout.focus`; app shell, tests, build all green.
- **Phase 1c — done.** Focus Sprint calm micro-task flow + "I'm stuck" rescue.
- **Phase 1d — done.** Full `Dump → Plan → Focus → Win` wired end-to-end, seeded, with an app-flow test.
- **Phase 1d+ — done.** `demoMode` flag + multi-provider `/api/plan` (OpenRouter free / Perplexity / Anthropic) with seed fallback.

## Phase 1c ✅ — Focus Sprint becomes a calm micro-task flow
**Plan:** `docs/superpowers/plans/2026-07-08-focus-sprint-phase1c.md`

- One seeded micro-task at a time, "Mark this done" advances, calm "Sprint complete" end state.
- "I'm stuck" rescue stub reveals a supportive MERCY-MESSAGE line (`HS-069`).
- **Refinement vs the plan as written:** instead of a standalone `focusSprintSeed.ts`, consume `heroIdeaSeed.focusSprint.microTasks` and `heroIdeaSeed.focusSprint.rescueMessage` so the whole demo shares one source of truth. (The plan's inline seed is fine as a starting point; unify onto the hero seed when wiring 1d.)
- **Exit criteria:** the Focus screen drives the hero idea's three micro-tasks to completion, rescue toggles, tests + build green.

## Phase 1d ✅ — Extend the spine to the full hero flow
Goal: make `Dump → Plan → Focus → Win` walk end-to-end for the one hero idea.

1. **Dump screen (`/`, or `/dump`)** — a calm textarea pre-fillable with `heroIdeaSeed.rawDump`; a single "Make this calm" action.
2. **Plan screen (`/plan`)** — renders `heroIdeaSeed.distilled` (the relief reframe) + `research[]` + `launchPlan[]`, revealed progressively (never a wall of text). A "Start a focus sprint" action routes to `/focus`.
3. **Focus screen (`/focus`)** — Phase 1c, now fed by the hero seed.
4. **Win screen (`/win`)** — `heroIdeaSeed.win` headline + note; calm, quiet, no confetti-spam.
5. **Wire the flow** — Dump → Plan → Focus → Win as one continuous path. State in-memory (no persistence).

**Exit criteria:** a single click-path completes the whole story; every screen reads from `heroIdeaSeed`.

## Phase 1d+ ✅ — the live AI moment (shipped)
- One constrained AI call on **Dump → Plan**: raw text in, the `distilled` / `research[]` / `launchPlan[]` **schema** out. The model fills the shape; it never freeforms into the UI. This is the answer to "not a generic AI wrapper."
- **`demoMode` flag** (`isDemoMode()`, ON by default): Dump → Plan returns `heroIdeaSeed` deterministically. Live mode calls `/api/plan`.
- **Pluggable provider switch** (`api/plan.ts`): OpenRouter (free default) / Perplexity / Anthropic, chosen via `PLAN_PROVIDER` or a request `provider` field. Adding an OpenAI-compatible provider is one config entry.
- Any failure falls back to the seed silently. Setup: `docs/LIVE_AI_ENDPOINT.md`.

## Demo Hardening (do before submission, not after)
- Add the `demoMode` flag and confirm the full path works with **network disabled**.
- Lock a **click-path runbook** (exact steps you'll perform on stage — see the submission checklist).
- Capture the three hero screenshots (Dump, Plan, Focus+rescue) and the 60–90s video.

## Explicitly Cut (post-hackathon)
Persistence, auth, accounts, multiple ideas/personas, task editing, real integrations, MVP Relay / Founder NOC surfaces, multi-user, analytics.

## Suggested Pacing
1. **Session A:** Phase 1c (Focus Sprint flow + rescue), unify onto hero seed.
2. **Session B:** Phase 1d Dump + Plan + Win screens, wired end-to-end, seeded.
3. **Session C:** demo hardening + submission pack (video, README, screenshots).
4. **Stretch:** the live AI moment with seeded fallback — only if A–C are solid.

## Definition of "Demo-Complete" — MET ✅
- ✅ One click-path walks Dump → Plan → Focus → Win for the hero idea.
- ✅ Works with the network off (seeded).
- ✅ The "I'm stuck" rescue lands as an emotional beat.
- ✅ `npm test` and `vite build` green.
- ⏳ Submission pack — the one remaining item (see `docs/SUBMISSION_PACK.md`).
