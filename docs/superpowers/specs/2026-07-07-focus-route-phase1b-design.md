# Phase 1b Focus Route Design

## Status
**COMPLETE (2026-07-08).** The repo now ignores local dependency noise (and stopped tracking the previously-committed `node_modules/`), boots a minimal React app shell, and exposes `/focus` as the first visible runtime consumer of `screenSkillLoadout.focus`. Verified: `npm test` 7/7 green, `vite build` clean, and a browser check confirmed `/` redirects to `/focus` and renders `HS-078`, `HS-010`, `HS-069`. Delivered in commits `1cf4a15`→`e2bacce`.

## Goal
Turn the tested skill stack into the first visible runtime consumer by adding a minimal `/focus` route and a small repo hygiene pass.

## Approved Scope
- Add `.gitignore` to remove local noise such as `node_modules/`
- Add the minimum app shell needed to host one route
- Create a single `/focus` route
- Import `screenSkillLoadout.focus` from `src/config/hyperfocus_skill_stack.ts`
- Render the focus skill stack visibly in the UI

## Product Context
- This is the first visible step after Phase 1a proved the routing metadata with tests.
- The route should represent the `Focus Sprint` screen from the approved hero flow in [03_PRODUCT_SHAPE.md](file:///h:/HYPERFOCUSZONE/HyperFocus-Os/docs/war-room/03_PRODUCT_SHAPE.md).
- The route is intentionally narrow: one screen, one skill-powered output, one clear next slice.

## Architecture Decision
- Use a minimal Vite + React + React Router shell for Phase 1b.
- Reason: the repo does not yet have an application shell, and this is the smallest clean path to a working `/focus` route.
- Keep the route isolated so the eventual app architecture can evolve without rewriting the whole project.

## Route Behavior
- Path: `/focus`
- Heading: `Focus Sprint`
- Show a small placeholder area for the current micro-task
- Show a "Powered by" section that renders `screenSkillLoadout.focus`
- Keep the design readable and calm, but do not attempt the full ND-friendly interaction model yet

## In Scope
- `.gitignore`
- Minimal React app shell
- Minimal route wiring
- Visible skill list from config
- Basic route/component tests

## Out Of Scope
- Capture screen
- Plan screen
- Win screen
- Full navigation skeleton
- Rescue button behavior
- AI integration
- Persistence
- Founder NOC or Relay UI surfaces

## Success Criteria
- `git status` is no longer dominated by `node_modules/`
- The app boots locally
- Navigating to `/focus` renders the screen successfully
- The route imports and displays `screenSkillLoadout.focus`
- Existing Phase 1a tests still pass
- New route tests pass

## Design Rules
- Keep the slice honest: one route only
- Favor clarity over polish
- Do not invent new product behavior beyond the approved screen placeholder
- Keep the focus route as the first runtime consumer, not a fake dashboard
