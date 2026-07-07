# HyperFocus Skill Stack Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a tiny tests-first Phase 1a that proves the `hyperfocus_skill_stack.ts` routing metadata is stable before any UI scaffold is built.

**Architecture:** This phase adds the minimum TypeScript test harness needed to execute regression tests against the existing skill-stack config. The code under test already exists, so this plan focuses on bootstrap plus explicit invariant coverage rather than inventing new runtime behavior.

**Tech Stack:** TypeScript, Vitest, Node.js

---

## File Structure

- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\package.json`
  - Minimal package manifest with `vitest` scripts and dev dependencies.
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\tsconfig.json`
  - Minimal TypeScript config for `src/` and test files.
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\config\hyperfocus_skill_stack.test.ts`
  - Regression tests for startup skills, task groups, agent loadouts, and focus screen loadout.
- Modify: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\config\hyperfocus_skill_stack.ts`
  - Only if export typing needs a tiny tweak for test friendliness; otherwise leave untouched.

### Task 1: Bootstrap Minimal Vitest Support

**Files:**
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\package.json`
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\tsconfig.json`

- [ ] **Step 1: Create `package.json` with a minimal test runner setup**

```json
{
  "name": "hyperfocus-os",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "typescript": "^5.5.4",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json` for source and test files**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*.ts"]
}
```

- [ ] **Step 3: Install dependencies**

Run:

```bash
npm install
```

Expected: `package-lock.json` is created and npm finishes with `added ... packages` and no fatal errors.

- [ ] **Step 4: Run the test command before adding any tests**

Run:

```bash
npm test
```

Expected: Vitest starts successfully and reports `No test files found`.

- [ ] **Step 5: Commit the bootstrap**

```bash
git add package.json package-lock.json tsconfig.json
git commit -m "test: bootstrap vitest for skill stack"
```

### Task 2: Add Regression Tests For Skill Stack Invariants

**Files:**
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\config\hyperfocus_skill_stack.test.ts`
- Modify: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\config\hyperfocus_skill_stack.ts` (only if needed)

- [ ] **Step 1: Create the regression test file**

```ts
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
    expect(screenSkillLoadout.focus).toEqual([
      "HS-078",
      "HS-010",
      "HS-069",
    ]);
  });
});
```

- [ ] **Step 2: Run the tests**

Run:

```bash
npm test
```

Expected: 4 tests are discovered and all pass.

- [ ] **Step 3: If TypeScript or Vitest reports an import/export issue, make the smallest possible fix**

Only apply this step if needed. The preferred fix is to leave `src/config/hyperfocus_skill_stack.ts` unchanged. If a minimal export tweak is required, it should look like this:

```ts
export const screenSkillLoadout = {
  capture: ["HS-010", "HS-069"] as SkillId[],
  plan: ["HS-123", "HS-010"] as SkillId[],
  focus: ["HS-078", "HS-010", "HS-069"] as SkillId[],
  win: ["HS-069", "HS-010"] as SkillId[],
  behindTheScenes: ["HS-007", "HS-099", "HS-125"] as SkillId[],
} as const;
```

Then rerun:

```bash
npm test
```

Expected: Tests pass with no TypeScript errors.

- [ ] **Step 4: Commit the regression tests**

```bash
git add src/config/hyperfocus_skill_stack.test.ts src/config/hyperfocus_skill_stack.ts
git commit -m "test: cover hyperfocus skill stack invariants"
```

### Task 3: Verify The Phase 1a Outcome

**Files:**
- Test: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\config\hyperfocus_skill_stack.test.ts`

- [ ] **Step 1: Run the final test command one more time**

Run:

```bash
npm test
```

Expected: All tests pass and Vitest exits with status code `0`.

- [ ] **Step 2: Record the exact Phase 1a outcome in a short handoff note**

Use this handoff text in the next status update or commit note:

```text
Phase 1a complete: the HyperFocus skill routing metadata now has a minimal Vitest harness and explicit regression coverage for startup skills, flow skills, frontend agent loadout, and focus screen loadout. No UI scaffold was introduced in this phase.
```

- [ ] **Step 3: Commit any final lockfile or config cleanup**

```bash
git add package.json package-lock.json tsconfig.json src/config/hyperfocus_skill_stack.test.ts
git commit -m "chore: finalize phase 1a skill stack test harness"
```

## Self-Review

- Spec coverage: This plan covers the requested tests-first slice only and intentionally excludes the `/focus` UI scaffold.
- Placeholder scan: No placeholders or `TBD` steps remain.
- Type consistency: The plan uses the exact current names `getSessionStartupSkills`, `getSkillsForTaskGroup`, `agentSkillLoadout`, and `screenSkillLoadout`.
