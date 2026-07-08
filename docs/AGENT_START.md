# AGENT_START

Welcome, Agent. This is the fastest way into `HyperFocus OS`.

Your job is to keep this repo calm, focused, and aligned with the war-room brief.

## Project Snapshot
- Name: `HyperFocus OS`
- Core idea: an ADHD-friendly focus companion that turns overwhelm into one clear next step
- Public product: `HyperFocus OS`
- Hidden engine: `MVP Relay`
- Future expansion: `Founder NOC`
- Hero flow: `Dump -> Plan -> Focus Sprint -> Win`
- Current priority: ship one calm, memorable, demo-safe MVP

If you need the full strategy context, read `docs/WAR_ROOM_LATEST.md` first.

## Core Truth Sources
- `docs/BUILD_STATUS.md`
  - Where the build is right now (routes, providers, tests, what's next) — read this first
- `docs/WAR_ROOM_LATEST.md`
  - Stable pointer to the full war-room pack
- `docs/war-room/01_MASTER_BRIEF.md`
  - Core product truth and positioning
- `docs/war-room/03_PRODUCT_SHAPE.md`
  - Hero flow, scope boundaries, and screen intent
- `docs/war-room/05_BUILD_SYSTEM.md`
  - System shape, module boundaries, and preferred stack
- `docs/war-room/06_SPRINT_PLAN.md`
  - Execution pacing and short-term build direction
- `docs/war-room/07_RISK_SECURITY_QA.md`
  - Safety, privacy, and non-clinical guardrails

If your idea contradicts these files, stop and realign before changing code or docs.

## Skill Stack
HyperFocus OS uses a fixed, canonical skill stack.

Always-on stack:
- `HS-125 THE GRAND CODEX`
- `HS-030 HYPERFOCUS MASTER CONSTITUTION`
- `HS-123 GODFLOW`
- `HS-078 FLOW KEEPER`
- `HS-010 THE AESTHETE`
- `HS-069 MERCY MESSAGE`
- `HS-007 SWARM CROWN`
- `HS-099 SIX-ORGAN HEART`

Human-facing references:
- `docs/SKILL_ACTIVATION_MAP.md`
  - Maps skills to docs, screens, and build phases
- `docs/AGENT_SKILL_LOADOUT.md`
  - Maps agents to their default skill stacks and responsibilities

Machine-readable source of truth:
- `src/config/hyperfocus_skill_stack.ts`
  - `hyperfocusSkillStack`
  - `agentSkillLoadout`
  - `screenSkillLoadout`
  - `getSessionStartupSkills()`
  - `getSkillsForTaskGroup()`

Do not improvise a new skill stack when the config already defines one.

## Runtime And Tests
The app is built: the full `Dump → Plan → Focus → Win` flow runs, seeded and offline-safe, with an optional live-AI plan endpoint. See `docs/BUILD_STATUS.md` for the full picture.

Runtime consumers of the skill stack:
- `src/config/hyperfocus_skill_stack.test.ts` — the config invariants
- `src/modules/hyperfocus/focus/FocusSprintPage.tsx` — renders `screenSkillLoadout.focus` in the UI

What the test suite guarantees (22 tests across 7 files):
- Skill-stack invariants: `getSessionStartupSkills()` → `["HS-125", "HS-030"]`, `getSkillsForTaskGroup("flowSkills")` → `["HS-123", "HS-078"]`, the Focus-safe agent/screen loadouts
- The `/focus` screen renders the focus skill stack and drives the micro-task + rescue flow
- The Dump / Plan / Win screens render from `heroIdeaSeed`
- An app-level integration test walks the whole hero flow
- The planner returns the seed in demo mode and falls back to the seed on live-call failure

Commands to trust:
- `npm test` (suite) · `npm run typecheck` (browser + API) · `npm run build`

Before changing the skill stack or its runtime consumers, run tests and keep them green.

## Session Start Order
Follow this order whenever you start work on `HyperFocus OS`:

1. Read `docs/AGENT_START.md`
2. Read `docs/BUILD_STATUS.md` (where the build is right now)
3. Read `docs/WAR_ROOM_LATEST.md`
4. Read `docs/war-room/01_MASTER_BRIEF.md`
5. Read `docs/war-room/03_PRODUCT_SHAPE.md`
6. Read `docs/SKILL_ACTIVATION_MAP.md`
7. Read `docs/AGENT_SKILL_LOADOUT.md`
8. Inspect `src/config/hyperfocus_skill_stack.ts`
9. Run `npm test`
10. Only then start implementation or propose changes

## Solo Agent In TRAE
If you are the active solo agent in TRAE, use this startup pattern.

Session boot:
1. Read `docs/AGENT_START.md`
2. Read `docs/WAR_ROOM_LATEST.md`
3. Read `docs/SKILL_ACTIVATION_MAP.md`
4. Read `docs/AGENT_SKILL_LOADOUT.md`
5. Inspect `src/config/hyperfocus_skill_stack.ts`
6. Run `npm test`

Skill loading pattern:
- Use `getSessionStartupSkills()` at the start of any session
- Use `getSkillsForTaskGroup("flowSkills")` when shaping sprints or execution loops
- Use `getSkillsForTaskGroup("uxSkills")` when touching UI, copy, empty states, or error states
- Use `screenSkillLoadout.focus` when working on the Focus Sprint route
- Use `agentSkillLoadout["frontend-craftsman"]` for frontend calm-UX work
- Use `agentSkillLoadout["ux-flow-guardian"]` for flow protection and rescue UX work

Operating rule:
- Load from `getSessionStartupSkills()` for baseline context
- Load from `getSkillsForTaskGroup(...)` for task mode
- Load from `screenSkillLoadout[...]` for screen-specific work
- Load from `agentSkillLoadout[...]` for role-specific work

If tests fail:
- Stop feature work
- Fix the failing invariant first
- Re-run `npm test`
- Only continue once the skill stack is stable again

## Hard Guardrails
- Do not build three products at once
  - `HyperFocus OS` is public v1
  - `MVP Relay` is the hidden engine
  - `Founder NOC` is roadmap only for now
- Do not overcomplicate the demo
  - Keep the first build tiny, seeded, and reliable
- Do not make clinical claims
  - This is ADHD-friendly support, not a medical tool
- Do not add surveillance or guilt mechanics
  - No attention scoring, guilt loops, or shaming copy
- Do not let this become a generic AI wrapper
  - Keep work anchored in `Dump -> Plan -> Focus Sprint -> Win`

If an idea violates these rules, realign before proceeding.

## Pick Your Lane
- Strategy work
  - Start from war-room docs plus `HS-125`, `HS-030`, and `HS-123`
- UX and frontend work
  - Start from `HS-010`, `HS-078`, and `HS-069`
- Backend and system work
  - Respect `05_BUILD_SYSTEM.md` and keep implementation aligned with the product wedge
- Multi-agent or swarm work
  - Only expand into `HS-007` and `HS-099` once single-agent flows are stable

## New Agent Checklist
1. Read this file
2. Read `docs/WAR_ROOM_LATEST.md`
3. Read `docs/SKILL_ACTIVATION_MAP.md` and `docs/AGENT_SKILL_LOADOUT.md`
4. Inspect `src/config/hyperfocus_skill_stack.ts`
5. Run `npm test`
6. Only then touch runtime code, the `/focus` route, or war-room docs

## One-Sentence Rule
HyperFocus OS should feel like relief, not management software.
