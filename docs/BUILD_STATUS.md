# HyperFocus OS — Build Status

**The single source of truth for where the build is.** Last updated: **2026-07-08**.

If you're picking up the project, read this first, then `docs/AGENT_START.md` for the guardrails.

---

## TL;DR

The product is **demo-complete**. The full hero flow — **Dump → Plan → Focus → Win** — walks end-to-end for one seeded hero idea, offline-safe by default. A real, multi-provider AI endpoint is wired and one env var away from live. All checks green: **22 tests**, typecheck (browser + API), and production build.

Remaining work is **submission polish**, not core build.

---

## What's built (all done ✅)

| Phase | What shipped | Key files |
|---|---|---|
| **1a** | Canonical skill-stack config, proven by tests | `src/config/hyperfocus_skill_stack.ts` (+ test) |
| **1b** | Minimal Vite + React + React Router app shell; `/focus` as first visible consumer of `screenSkillLoadout.focus` | `src/main.tsx`, `src/App.tsx`, `index.html` |
| **1c** | Focus Sprint = calm micro-task flow (advance one task at a time → "Sprint complete") + **"I'm stuck" rescue** (MERCY-MESSAGE, HS-069) | `src/modules/hyperfocus/focus/FocusSprintPage.tsx` |
| **1d** | Seeded **Dump / Plan / Win** screens wired into one continuous path; app-level integration test walks the whole flow | `src/modules/hyperfocus/{dump,plan,win}/`, `src/App.test.tsx` |
| **1d+** | **demoMode flag** + **planner seam** + **real multi-provider `/api/plan`** (OpenRouter free / Perplexity / Anthropic), with seed fallback | `src/config/appConfig.ts`, `src/services/planner.ts`, `src/state/HeroFlowContext.tsx`, `api/plan.ts` |

## Architecture at a glance

```
Truth docs (war-room, AGENT_START)
  └─ skill stack config  (src/config/hyperfocus_skill_stack.ts)
       └─ tests as first consumer
            └─ /focus as first visible consumer
                 └─ full seeded hero flow: Dump → Plan → Focus → Win
                      └─ optional live AI: /api/plan (multi-provider, seed fallback)
```

**Routes** (`src/App.tsx`, wrapped in `HeroFlowProvider`):
- `/` → Dump · `/plan` → Plan · `/focus` → Focus Sprint · `/win` → Win

**Demo content:** one hero idea (a newsletter for ADHD developers) modeled end-to-end in `src/content/heroIdeaSeed.ts`. It is the deterministic demo path **and** the offline fallback.

**Live AI (optional):** `src/services/planner.ts` → `generatePlan()` returns the seed in demo mode, otherwise `POST /api/plan` and falls back to the seed on any failure. `api/plan.ts` is a pluggable provider switch:

| Provider | Model | Key env | Notes |
|---|---|---|---|
| `openrouter` *(default)* | `tencent/hy3:free` | `OPENROUTER_API_KEY` | Free — the money-saver |
| `perplexity` | `sonar-pro` | `PERPLEXITY_API_KEY` | Live web search + citations |
| `anthropic` | `claude-opus-4-8` | `ANTHROPIC_API_KEY` | Warmest tone, structured output |

Switch via `PLAN_PROVIDER` env var or a `provider` field in the request body. See `docs/LIVE_AI_ENDPOINT.md`.

## Commands

```bash
npm install
npm run dev        # Vite dev server (seeded; /api/plan not served here)
npm test           # Vitest — 22 tests across 7 files
npm run typecheck  # browser tsconfig + api tsconfig
npm run build      # production build
npm run preview    # preview the production build
vercel dev         # serve the SPA AND /api/plan together (needs Vercel CLI + keys)
```

## Verification status (2026-07-08)

- ✅ `npm test` → **22/22** (skill-stack 5, Focus 5, Dump 3, Plan 3, Win 2, planner 3, App-flow 1)
- ✅ `npm run typecheck` — clean (browser + Node/API)
- ✅ `npm run build` — clean; client bundle ~169 kB (AI SDK stays server-side)
- ✅ Browser drive-through of the full flow, seeded + offline
- ✅ TDD throughout — red tests committed before green implementations

## Guardrails (unchanged, always apply)

One calm screen at a time · no timers, scores, streaks, or guilt · non-clinical · no surveillance · keep everything anchored in Dump → Plan → Focus → Win · **relief, not management software.** Full context in `docs/AGENT_START.md`.

---

## What's next (submission polish, not build)

1. **Submission pack** — 60–90s demo video, 3 screenshots (Dump / Plan / Focus+rescue), Devpost fields. Ordered checklist: `docs/SUBMISSION_PACK.md`.
2. **Deploy live** — set `PLAN_PROVIDER`, the matching key, and `VITE_DEMO_MODE=false` in Vercel. Steps: `docs/LIVE_AI_ENDPOINT.md`.
3. **Optional UI flourish** — a provider dropdown on the Dump screen that passes `provider` to `/api/plan` (turns the server-side switch into a visible "choose your AI" control).
4. **Security** — rotate any API key that has been exposed; keys live only in Vercel env / `.env.local` (both gitignored). `.env.example` documents the variables.

## Explicitly out of scope (post-hackathon)

Persistence, auth, accounts, multiple ideas/personas, task editing, real integrations, MVP Relay / Founder NOC surfaces, multi-user, analytics.
