import { describe, expect, it } from "vitest";

import {
  agentSkillLoadout,
  getSessionStartupSkills,
  getSkillsForTaskGroup,
  screenSkillLoadout,
} from "./hyperfocus_skill_stack";

describe("hyperfocus skill stack", () => {
  it("returns the core startup skills in order", () => {
    expect(getSessionStartupSkills()).toEqual(["HS-125", "HS-030"]);
  });

  it("returns the flow skill group in order", () => {
    expect(getSkillsForTaskGroup("flowSkills")).toEqual(["HS-123", "HS-078"]);
  });

  it("keeps the frontend craftsman loadout aligned with the UX-safe trio", () => {
    expect(agentSkillLoadout["frontend-craftsman"]).toEqual([
      "HS-010",
      "HS-078",
      "HS-069",
    ]);
  });

  it("keeps the focus screen mapped to the intended focus stack", () => {
    expect(screenSkillLoadout.focus).toEqual(["HS-078", "HS-010", "HS-069"]);
  });

  it("keeps the ux-flow-guardian loadout aligned with the focus stack", () => {
    expect(agentSkillLoadout["ux-flow-guardian"]).toEqual([
      "HS-078",
      "HS-010",
      "HS-069",
    ]);
  });
});
