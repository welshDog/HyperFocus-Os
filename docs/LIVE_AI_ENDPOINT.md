# Optional Live-AI Endpoint (`/api/plan`)

Phase 1d+ (optional). The app runs fully **seeded** by default — this is only for the "wow" moment where a real model turns the raw dump into the calm plan. It is never a demo dependency.

## How the seam works

- `src/config/appConfig.ts` → `isDemoMode()` — **ON by default**. Set `VITE_DEMO_MODE=false` to enable the live path.
- `src/services/planner.ts` → `generatePlan(rawDump)`:
  - **demo mode** → returns `seedPlan` (deterministic, no network).
  - **live mode** → `POST /api/plan`, and **falls back to `seedPlan` on any failure** (network down, key missing, model refusal). The demo cannot break.
- `src/state/HeroFlowContext.tsx` threads the resulting plan to the Plan screen; the default is the seed, so every screen still renders standalone.

The browser must **never** hold the Anthropic API key. `/api/plan` is a small server you host (Vercel/Netlify function, Express route, etc.) that holds the key and returns the `GeneratedPlan` shape.

## Reference handler (TypeScript, Anthropic SDK)

Install `@anthropic-ai/sdk` on the server, set `ANTHROPIC_API_KEY`, and return the exact `GeneratedPlan` shape (`distilled`, `research[]`, `launchPlan[]`). Structured outputs guarantee the model fills the shape rather than freeforming — this is what keeps it from being a "generic AI wrapper."

```ts
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY

const planSchema = {
  type: "object",
  additionalProperties: false,
  required: ["distilled", "research", "launchPlan"],
  properties: {
    distilled: { type: "string" },
    research: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "question", "insight"],
        properties: {
          id: { type: "string" },
          question: { type: "string" },
          insight: { type: "string" },
        },
      },
    },
    launchPlan: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "title", "detail"],
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          detail: { type: "string" },
        },
      },
    },
  },
} as const;

// POST /api/plan  { rawDump: string }  ->  GeneratedPlan
export async function handlePlan(rawDump: string) {
  const message = await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 2048,
    output_config: {
      effort: "medium",
      format: { type: "json_schema", schema: planSchema },
    },
    system:
      "You turn a neurodivergent founder's messy brain-dump into ONE calm plan. " +
      "Be warm and non-clinical. No guilt, no pressure. Shrink the idea to its " +
      "smallest honest first version. Return only the structured plan.",
    messages: [{ role: "user", content: rawDump }],
  });

  const text = message.content.find((b) => b.type === "text")?.text ?? "{}";
  return JSON.parse(text); // GeneratedPlan
}
```

Notes (from the `claude-api` skill):
- `claude-opus-4-8` is the default model; no `thinking`/`temperature`/`budget_tokens` params (they 400 on this tier).
- Structured outputs (`output_config.format`) are supported on Opus 4.8; the schema cannot use `minItems`/`maxItems`/`minLength`.
- If the model returns `stop_reason: "refusal"`, treat it as a failure and let the client fall back to the seed.

## Demo runbook

- **Default (recommended for the live demo):** leave `VITE_DEMO_MODE` unset → fully seeded, offline-safe.
- **To show the live moment:** deploy `/api/plan`, set `VITE_DEMO_MODE=false`, and keep the seed fallback as the safety net.
