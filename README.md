# HyperFocus OS

An ADHD-friendly focus companion that turns overwhelm into one clear next step.

Hero flow: **Dump → Plan → Focus Sprint → Win**. The current priority is one calm, memorable, demo-safe MVP — depth on a single screen before breadth across four.

## Start Here

New to the repo? Read these first, in order:

1. [`docs/AGENT_START.md`](docs/AGENT_START.md) — the fastest way in: project snapshot, skill stack, guardrails, and session start order.
2. [`docs/WAR_ROOM_LATEST.md`](docs/WAR_ROOM_LATEST.md) — stable pointer to the full war-room strategy pack.

The machine-readable source of truth for the skill stack is [`src/config/hyperfocus_skill_stack.ts`](src/config/hyperfocus_skill_stack.ts).

## Quick Start

```bash
npm install      # install dependencies
npm test         # run the Vitest suite
npm run dev      # start Vite; open http://localhost:5173/focus
npm run build    # production build
```

## Status

- **Phase 1a** — skill-stack config proven by tests.
- **Phase 1b** — `/focus` is the first visible runtime consumer of `screenSkillLoadout.focus`. See [`docs/superpowers/specs/2026-07-07-focus-route-phase1b-design.md`](docs/superpowers/specs/2026-07-07-focus-route-phase1b-design.md).
