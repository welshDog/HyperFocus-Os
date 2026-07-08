import Anthropic from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * POST /api/plan  { rawDump: string, provider?: string }  ->  GeneratedPlan
 *
 * Turns a raw brain dump into ONE calm plan. API keys live only here
 * (server-side) — never in the browser. The client (src/services/planner.ts)
 * falls back to the seed on any non-2xx, so failures degrade gracefully.
 *
 * Providers are pluggable. Pick one with the PLAN_PROVIDER env var or a
 * `provider` field in the request body. Default is OpenRouter's free tier.
 * Add a new OpenAI-compatible provider by adding one entry to PROVIDERS.
 */

interface GeneratedPlan {
  distilled: string;
  research: { id: string; question: string; insight: string }[];
  launchPlan: { id: string; title: string; detail: string }[];
}

type ProviderId = "openrouter" | "perplexity" | "anthropic";

interface ProviderConfig {
  kind: "openai" | "anthropic";
  /** Base URL for OpenAI-compatible providers (calls `${baseUrl}/chat/completions`). */
  baseUrl?: string;
  apiKeyEnv: string;
  defaultModel: string;
  /** Optional env var to override the model. */
  modelEnv: string;
}

const PROVIDERS: Record<ProviderId, ProviderConfig> = {
  openrouter: {
    kind: "openai",
    baseUrl: "https://openrouter.ai/api/v1",
    apiKeyEnv: "OPENROUTER_API_KEY",
    defaultModel: "tencent/hy3:free",
    modelEnv: "OPENROUTER_MODEL",
  },
  perplexity: {
    kind: "openai",
    baseUrl: "https://api.perplexity.ai",
    apiKeyEnv: "PERPLEXITY_API_KEY",
    defaultModel: "sonar-pro",
    modelEnv: "PERPLEXITY_MODEL",
  },
  anthropic: {
    kind: "anthropic",
    apiKeyEnv: "ANTHROPIC_API_KEY",
    defaultModel: "claude-opus-4-8",
    modelEnv: "ANTHROPIC_MODEL",
  },
};

const SYSTEM_PROMPT =
  "You turn a neurodivergent founder's messy brain-dump into ONE calm plan. " +
  "Be warm, direct, and non-clinical — no guilt, no pressure, no medical advice. " +
  "Shrink the idea to its smallest honest first version. Provide 3-4 research " +
  "points (each a question plus a grounded, specific insight) and 3-5 launch " +
  "steps (each a short title plus one calm sentence). Use ids like r1, r2 and l1, l2.";

const JSON_SHAPE_INSTRUCTION =
  'Respond with ONLY valid minified JSON, no markdown or commentary, in exactly ' +
  'this shape: {"distilled": string, "research": [{"id": string, "question": ' +
  'string, "insight": string}], "launchPlan": [{"id": string, "title": string, ' +
  '"detail": string}]}.';

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

function resolveProvider(requested: unknown): ProviderId {
  const candidate =
    typeof requested === "string" && requested
      ? requested
      : (process.env.PLAN_PROVIDER ?? "openrouter");
  return (candidate in PROVIDERS ? candidate : "openrouter") as ProviderId;
}

/** Parse a plan from free-form model text, tolerant of code fences and prose. */
function parsePlan(text: string): GeneratedPlan {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("no JSON object in model response");
  }
  const parsed = JSON.parse(cleaned.slice(start, end + 1)) as GeneratedPlan;
  if (
    typeof parsed.distilled !== "string" ||
    !Array.isArray(parsed.research) ||
    !Array.isArray(parsed.launchPlan)
  ) {
    throw new Error("model response did not match the plan shape");
  }
  return parsed;
}

async function runOpenAICompatible(
  id: ProviderId,
  cfg: ProviderConfig,
  apiKey: string,
  rawDump: string,
): Promise<GeneratedPlan> {
  const model = process.env[cfg.modelEnv] || cfg.defaultModel;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  if (id === "openrouter") {
    // OpenRouter attribution headers (optional but recommended).
    headers["HTTP-Referer"] =
      process.env.OPENROUTER_SITE_URL ?? "https://hyperfocus.os";
    headers["X-Title"] = process.env.OPENROUTER_APP_NAME ?? "HyperFocus OS";
  }

  const response = await fetch(`${cfg.baseUrl}/chat/completions`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 2048,
      messages: [
        { role: "system", content: `${SYSTEM_PROMPT} ${JSON_SHAPE_INSTRUCTION}` },
        { role: "user", content: rawDump },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`${id} responded ${response.status}`);
  }
  const data = (await response.json()) as {
    choices?: { message?: { content?: unknown } }[];
  };
  const text = data.choices?.[0]?.message?.content;
  if (typeof text !== "string") {
    throw new Error(`${id} returned no text`);
  }
  return parsePlan(text);
}

async function runAnthropic(
  cfg: ProviderConfig,
  rawDump: string,
): Promise<GeneratedPlan> {
  const client = new Anthropic();
  const message = await client.messages.create({
    model: process.env[cfg.modelEnv] || cfg.defaultModel,
    max_tokens: 2048,
    output_config: {
      effort: "medium",
      format: { type: "json_schema", schema: planSchema },
    },
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: rawDump }],
  });
  if (message.stop_reason === "refusal") {
    throw new Error("model declined the request");
  }
  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("empty plan from model");
  }
  return parsePlan(textBlock.text);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const rawDump =
    typeof req.body?.rawDump === "string" ? req.body.rawDump.trim() : "";
  if (!rawDump) {
    res.status(400).json({ error: "rawDump is required" });
    return;
  }

  const providerId = resolveProvider(req.body?.provider);
  const cfg = PROVIDERS[providerId];
  const apiKey = process.env[cfg.apiKeyEnv];
  if (!apiKey) {
    res.status(500).json({ error: `${cfg.apiKeyEnv} is not set` });
    return;
  }

  try {
    const plan =
      cfg.kind === "anthropic"
        ? await runAnthropic(cfg, rawDump)
        : await runOpenAICompatible(providerId, cfg, apiKey, rawDump);
    res.setHeader("X-Plan-Provider", providerId);
    res.status(200).json(plan);
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown error";
    res.status(502).json({ error: "Planner failed", provider: providerId, detail });
  }
}
