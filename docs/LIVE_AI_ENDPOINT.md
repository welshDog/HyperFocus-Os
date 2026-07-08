# Live-AI Endpoint (`/api/plan`)

The "wow" moment: a real Claude call turns the raw brain-dump into the calm plan. It is **optional and never a demo dependency** — the app runs fully seeded by default, and the client falls back to the seed if the endpoint is unavailable or fails.

## Architecture

- **`api/plan.ts`** — a Vercel serverless function. Holds the Anthropic API key (server-side, **never** in the browser), calls `claude-opus-4-8` with **structured outputs**, and returns the `GeneratedPlan` shape (`distilled`, `research[]`, `launchPlan[]`).
- **`src/config/appConfig.ts`** → `isDemoMode()` — **ON by default**. Set `VITE_DEMO_MODE=false` to enable the live path.
- **`src/services/planner.ts`** → `generatePlan(rawDump)`:
  - demo mode → returns `seedPlan` (deterministic, no network),
  - live mode → `POST /api/plan`, and **falls back to `seedPlan` on any non-2xx / failure**. The demo cannot break.
- **`src/state/HeroFlowContext.tsx`** threads the plan to the Plan screen (defaults to the seed, so every screen still renders standalone).

Structured outputs make the model fill a fixed schema instead of freeforming prose into the UI — this is what keeps it from being a "generic AI wrapper."

## Deploy on Vercel

1. **Import the repo** into Vercel. It auto-detects Vite (`vercel.json` pins `framework: "vite"` and adds the SPA rewrite that excludes `/api/`).
2. **Set environment variables** (Project → Settings → Environment Variables):
   - `ANTHROPIC_API_KEY` — your key (used only by the serverless function).
   - `VITE_DEMO_MODE` = `false` — build-time flag so the deployed frontend uses the live path. Omit it (or set anything else) to keep the site fully seeded.
3. **Deploy.** The function is served at `https://<your-app>.vercel.app/api/plan`; the SPA is served for every other route.

## Run the live path locally

`vite dev` alone does **not** run serverless functions — `/api/plan` will 404 and the client falls back to the seed (still a working demo). To exercise the real call locally, use the Vercel CLI:

```bash
npm i -g vercel
vercel link                       # once, to link the project
vercel env pull .env.local        # pulls ANTHROPIC_API_KEY + VITE_DEMO_MODE
vercel dev                        # serves the SPA AND /api/plan together
```

Then open the app, type into the dump, and hit **Make this calm** — the Plan screen renders the model's plan (or the seed if the call fails).

## The function contract

`POST /api/plan` with `{ "rawDump": "..." }` returns `200` + `GeneratedPlan`, or a non-2xx on: wrong method (`405`), missing `rawDump` (`400`), missing key (`500`), model refusal / empty output / SDK error (`502`). Every non-2xx path is handled by the client's seed fallback.

Notes (from the `claude-api` skill): `claude-opus-4-8` is the default model; no `thinking` / `temperature` / `budget_tokens` params (they 400 on this tier); structured outputs (`output_config.format`) can't use `minItems` / `maxItems` / `minLength`.

## Typecheck

`api/` is Node code with its own `api/tsconfig.json` (it's excluded from the browser `tsconfig.json`). Run both at once:

```bash
npm run typecheck
```
