export type SkillId =
  | "HS-125"
  | "HS-030"
  | "HS-123"
  | "HS-078"
  | "HS-010"
  | "HS-069"
  | "HS-007"
  | "HS-099";

export type SkillGroup =
  | "coreContextSkills"
  | "flowSkills"
  | "uxSkills"
  | "swarmSkills";

export type AgentName =
  | "broski-orchestrator"
  | "project-strategist"
  | "cto-system-architect"
  | "frontend-craftsman"
  | "ux-flow-guardian"
  | "backend-architect"
  | "security-auditor"
  | "qa-test-engineer"
  | "hyper-narrator"
  | "deep-dive-analyst"
  | "manifest-enforcer";

export const hyperfocusSkillStack = {
  coreContextSkills: ["HS-125", "HS-030"] as SkillId[],
  flowSkills: ["HS-123", "HS-078"] as SkillId[],
  uxSkills: ["HS-010", "HS-069"] as SkillId[],
  swarmSkills: ["HS-007", "HS-099"] as SkillId[],
};

export const agentSkillLoadout: Record<AgentName, SkillId[]> = {
  "broski-orchestrator": ["HS-125", "HS-030", "HS-007", "HS-099"],
  "project-strategist": ["HS-125", "HS-030", "HS-123"],
  "cto-system-architect": ["HS-125", "HS-030", "HS-099"],
  "frontend-craftsman": ["HS-010", "HS-078", "HS-069"],
  "ux-flow-guardian": ["HS-078", "HS-010", "HS-069"],
  "backend-architect": ["HS-125", "HS-030", "HS-123"],
  "security-auditor": ["HS-030", "HS-069"],
  "qa-test-engineer": ["HS-069", "HS-078", "HS-030"],
  "hyper-narrator": ["HS-069", "HS-125", "HS-010"],
  "deep-dive-analyst": ["HS-125", "HS-030"],
  "manifest-enforcer": ["HS-030", "HS-078", "HS-069"],
};

export const screenSkillLoadout = {
  capture: ["HS-010", "HS-069"] as SkillId[],
  plan: ["HS-123", "HS-010"] as SkillId[],
  focus: ["HS-078", "HS-010", "HS-069"] as SkillId[],
  win: ["HS-069", "HS-010"] as SkillId[],
  behindTheScenes: ["HS-007", "HS-099", "HS-125"] as SkillId[],
};

export function getSessionStartupSkills(): SkillId[] {
  return hyperfocusSkillStack.coreContextSkills;
}

export function getSkillsForTaskGroup(group: SkillGroup): SkillId[] {
  return hyperfocusSkillStack[group];
}
