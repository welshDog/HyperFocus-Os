import Anthropic from "@anthropic-ai/sdk";
import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * POST /api/plan  { rawDump: string }  ->  GeneratedPlan
 *
 * Turns a raw brain dump into one calm plan using Claude. The API key lives
 * only here (server-side) — never in the browser. The client
 * (src/services/planner.ts) falls back to the seed on any non-2xx response,
 * so a failure here degrades gracefully instead of breaking the demo.
 */

// Mirrors GeneratedPlan in src/services/planner.ts. Structured outputs make the
// model fill this exact shape rather than freeforming prose into the UI.
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

const SYSTEM_PROMPT =
  "You turn a neurodivergent founder's messy brain-dump into ONE calm plan. " +
  "Be warm, direct, and non-clinical — no guilt, no pressure, no medical advice. " +
  "Shrink the idea to its smallest honest first version. Provide 3-4 research " +
  "points (each a question plus a grounded, specific insight) and 3-5 launch " +
  "steps (each a short title plus one calm sentence). Use ids like r1, r2 and " +
  "l1, l2. Return only the structured plan.";

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

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: "ANTHROPIC_API_KEY is not set" });
    return;
  }

  try {
    const client = new Anthropic();
    const message = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 2048,
      output_config: {
        effort: "medium",
        format: { type: "json_schema", schema: planSchema },
      },
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: rawDump }],
    });

    if (message.stop_reason === "refusal") {
      res.status(502).json({ error: "Model declined the request" });
      return;
    }

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      res.status(502).json({ error: "Empty plan from model" });
      return;
    }

    res.status(200).json(JSON.parse(textBlock.text));
  } catch (error) {
    const detail = error instanceof Error ? error.message : "unknown error";
    res.status(502).json({ error: "Planner failed", detail });
  }
}
