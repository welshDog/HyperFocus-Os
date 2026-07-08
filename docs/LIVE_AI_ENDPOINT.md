# Live-AI Endpoint (`/api/plan`)

The "wow" moment: a real model turns the raw brain-dump into the calm plan. It is **optional and never a demo dependency** — the app runs fully seeded by default, and the client falls back to the seed if the endpoint is unavailable or fails.

## Architecture

- **`api/plan.ts`** — a Vercel serverless function with a **pluggable provider switch**. API keys live here (server-side, **never** in the browser). Returns the `GeneratedPlan` shape (`distilled`, `research[]`, `launchPlan[]`).
- **`src/config/appConfig.ts`** → `isDemoMode()` — **ON by default**. Set `VITE_DEMO_MODE=false` to enable the live path.
- **`src/services/planner.ts`** → `generatePlan(rawDump)`: demo mode → deterministic seed; live mode → `POST /api/plan`, **falls back to the seed on any failure**. The demo cannot break.
- **`src/state/HeroFlowContext.tsx`** threads the plan to the Plan screen (defaults to the seed).

## Providers

| Provider | Default model | Key env | Notes |
|---|---|---|---|
| `openrouter` (default) | `tencent/hy3:free` | `OPENROUTER_API_KEY` | Free tier — the money-saving default. |
| `perplexity` | `sonar-pro` | `PERPLEXITY_API_KEY` | Live web search + citations; great for real research. |
| `anthropic` | `claude-opus-4-8` | `ANTHROPIC_API_KEY` | Warmest tone, most reliable structured output. |

**Switch the provider** two ways:
- **Globally:** set `PLAN_PROVIDER` (env var).
- **Per request:** include `{ "provider": "perplexity" }` in the POST body (unknown values fall back to the default). This makes a user-facing provider toggle a trivial add later.

OpenRouter and Perplexity share one OpenAI-compatible adapter — **add any other OpenAI-style provider by adding one entry to the `PROVIDERS` map** (base URL, key env, default model). Claude uses structured outputs; the OpenAI-compatible path uses prompt-instructed JSON with tolerant parsing. Every failure path (bad method 405, missing dump 400, missing key 500, model error 502) is caught by the client's seed fallback.

## Deploy on Vercel

1. **Import the repo** into Vercel (auto-detects Vite; `vercel.json` pins the framework + SPA rewrite that excludes `/api/`).
2. **Set environment variables** (Project → Settings → Environment Variables):
   - `PLAN_PROVIDER` = `openrouter` (or `perplexity` / `anthropic`).
   - The matching key(s): `OPENROUTER_API_KEY`, `PERPLEXITY_API_KEY`, and/or `ANTHROPIC_API_KEY`.
   - `VITE_DEMO_MODE` = `false` — build-time flag so the frontend uses the live path.
3. **Deploy.** The function is served at `/api/plan`; the SPA is served for every other route.

## Run the live path locally

`vite dev` alone does **not** run serverless functions. Use the Vercel CLI:

```bash
npm i -g vercel
vercel link
vercel env pull .env.local   # pulls keys + PLAN_PROVIDER + VITE_DEMO_MODE
vercel dev                   # serves the SPA AND /api/plan together
```

## Security

Keys belong in Vercel env vars / `.env.local` only — both are gitignored. **Never commit a key.** If a key is ever exposed (e.g. pasted into a file or chat), rotate it at the provider before deploying. `.env.example` documents the variables without secrets.

## Typecheck

`api/` is Node code with its own `api/tsconfig.json` (excluded from the browser `tsconfig.json`). Run both:

```bash
npm run typecheck
```
