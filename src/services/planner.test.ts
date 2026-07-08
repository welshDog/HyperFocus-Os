import { afterEach, describe, expect, it, vi } from "vitest";

import { heroIdeaSeed } from "../content/heroIdeaSeed";
import { generatePlan, seedPlan } from "./planner";

describe("generatePlan", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the seed plan in demo mode without any network call", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const plan = await generatePlan(heroIdeaSeed.rawDump, { demoMode: true });

    expect(plan).toEqual(seedPlan);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("falls back to the seed plan when the live request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));

    const plan = await generatePlan(heroIdeaSeed.rawDump, { demoMode: false });

    expect(plan).toEqual(seedPlan);
  });

  it("uses the live plan when the request succeeds", async () => {
    const livePlan = {
      distilled: "A crisp reframe from the model.",
      research: [{ id: "r1", question: "Q?", insight: "A." }],
      launchPlan: [{ id: "l1", title: "Step", detail: "Do it." }],
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify(livePlan), { status: 200 }),
    );

    const plan = await generatePlan("anything", { demoMode: false });

    expect(plan).toEqual(livePlan);
  });
});
