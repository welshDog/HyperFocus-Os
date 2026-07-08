import { isDemoMode } from "../config/appConfig";
import {
  heroIdeaSeed,
  type LaunchStep,
  type ResearchPoint,
} from "../content/heroIdeaSeed";

/**
 * The calm plan produced from a raw brain dump. This is the exact shape the
 * Plan screen renders, and the exact shape a live model must return — the
 * seed doubles as both the demo path and the offline fallback.
 */
export interface GeneratedPlan {
  distilled: string;
  research: ResearchPoint[];
  launchPlan: LaunchStep[];
}

export const seedPlan: GeneratedPlan = {
  distilled: heroIdeaSeed.distilled,
  research: heroIdeaSeed.research,
  launchPlan: heroIdeaSeed.launchPlan,
};

interface GeneratePlanOptions {
  /** Override demo mode for tests; defaults to isDemoMode(). */
  demoMode?: boolean;
}

/**
 * Turn a raw brain dump into a calm plan.
 *
 * Demo mode (default) returns the deterministic seed. Otherwise it asks a
 * server endpoint that holds the API key (never the browser), and falls back
 * to the seed on any failure so a live demo can never break.
 */
export async function generatePlan(
  rawDump: string,
  options: GeneratePlanOptions = {},
): Promise<GeneratedPlan> {
  const demoMode = options.demoMode ?? isDemoMode();
  if (demoMode) {
    return seedPlan;
  }

  try {
    const response = await fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rawDump }),
    });
    if (!response.ok) {
      throw new Error(`Planner responded ${response.status}`);
    }
    return (await response.json()) as GeneratedPlan;
  } catch {
    // Network down, key missing, model refused — the seed keeps the demo alive.
    return seedPlan;
  }
}
