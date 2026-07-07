# HyperFocus Focus Sprint Phase 1c Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:test-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the static Phase 1b `/focus` placeholder into the first *calm micro-task experience*: one seeded task at a time, a single primary "done" action, a calm end state, and an "I'm stuck" rescue stub. Depth on the one screen — no new routes.

**Architecture:** Keep the single `/focus` route. Add a small local seed module and drive the screen with in-memory React state (`useState`) — no persistence, no AI, no network. The rescue action is a stub: it reveals a supportive, seeded MERCY-MESSAGE-style line (`HS-069`), nothing more.

**Tech Stack:** TypeScript, React, Vitest, `@testing-library/react` (use `fireEvent` — no new deps).

---

## Scope

**In scope**
- A local seed list of micro-tasks (`focusSprintSeed.ts`)
- Show one current micro-task at a time (title + gentle hint)
- Primary action: "Mark this done" → advance to the next seeded task
- Calm completion state when all seeded tasks are done (stays on the same screen)
- "I'm stuck" rescue stub → toggles a supportive, non-guilt message
- Keep the "Powered by these skills" panel rendering `screenSkillLoadout.focus`

**Out of scope** (unchanged from the war-room guardrails)
- Capture / Plan / Win as separate screens or routes
- Persistence (state resets on reload — fine for a seeded demo)
- AI integration, timers, streaks, attention scoring
- Any guilt, shaming, or surveillance copy
- Real task capture or editing

## Guardrails (must hold)
- One screen only; `/focus` stays the single route.
- Calm over clever: one task visible at a time, no countdowns or scores.
- Rescue is mercy, not metrics: supportive language, no "you failed" framing.
- Non-clinical: supportive tool, not medical advice.

## Behavior Change Note
Phase 1b's test asserts the literal text `"Current micro-task placeholder"`. Phase 1c **replaces** that placeholder with real seeded task content, so that assertion is intentionally updated in Task 1 — this is expected, not a regression.

---

## File Structure

- Create: `src/modules/hyperfocus/focus/focusSprintSeed.ts`
  - Seeded micro-tasks + the rescue message. Local source of truth for the demo.
- Modify: `src/modules/hyperfocus/focus/FocusSprintPage.test.tsx`
  - Replace the placeholder assertion; add tests for advancing, completion, and rescue toggle.
- Modify: `src/modules/hyperfocus/focus/FocusSprintPage.tsx`
  - Add local state, the done/advance action, completion state, and the rescue stub.
- Modify: `src/styles/globals.css`
  - Minimal calm styles for the task panel, buttons, and rescue message.

---

### Task 1: Seed Data + Failing Tests (Red)

**Files:**
- Create: `src/modules/hyperfocus/focus/focusSprintSeed.ts`
- Modify: `src/modules/hyperfocus/focus/FocusSprintPage.test.tsx`

- [ ] **Step 1: Create the seed module**

```ts
export interface MicroTask {
  id: string;
  title: string;
  hint: string;
}

export const focusSprintSeed: MicroTask[] = [
  {
    id: "t1",
    title: "Open the one thing you were avoiding",
    hint: "Just open it. Nothing else counts right now.",
  },
  {
    id: "t2",
    title: "Do the smallest visible version",
    hint: "A rough first pass beats a blank screen.",
  },
  {
    id: "t3",
    title: "Look at the result once",
    hint: "You are only looking, not fixing.",
  },
];

export const rescueMessage =
  "No rush. Shrink the step until it feels almost too small, then do that. You are not behind.";
```

- [ ] **Step 2: Rewrite the test file (red)**

Replace the contents of `FocusSprintPage.test.tsx` with:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FocusSprintPage } from "./FocusSprintPage";
import { focusSprintSeed, rescueMessage } from "./focusSprintSeed";

describe("FocusSprintPage", () => {
  it("renders the heading and the first seeded micro-task", () => {
    render(<FocusSprintPage />);

    expect(
      screen.getByRole("heading", { name: "Focus Sprint" }),
    ).toBeInTheDocument();
    expect(screen.getByText(focusSprintSeed[0].title)).toBeInTheDocument();
    expect(screen.getByText(focusSprintSeed[0].hint)).toBeInTheDocument();
  });

  it("advances to the next task when the current one is marked done", () => {
    render(<FocusSprintPage />);

    fireEvent.click(screen.getByRole("button", { name: "Mark this done" }));

    expect(screen.getByText(focusSprintSeed[1].title)).toBeInTheDocument();
    expect(
      screen.queryByText(focusSprintSeed[0].title),
    ).not.toBeInTheDocument();
  });

  it("shows a calm completion state after the last task", () => {
    render(<FocusSprintPage />);

    focusSprintSeed.forEach(() => {
      fireEvent.click(screen.getByRole("button", { name: "Mark this done" }));
    });

    expect(
      screen.getByRole("heading", { name: "Sprint complete" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Mark this done" }),
    ).not.toBeInTheDocument();
  });

  it("keeps the rescue message hidden until 'I'm stuck' is pressed", () => {
    render(<FocusSprintPage />);

    expect(screen.queryByText(rescueMessage)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "I'm stuck" }));

    expect(screen.getByText(rescueMessage)).toBeInTheDocument();
  });

  it("renders the focus skill stack from config", () => {
    render(<FocusSprintPage />);

    expect(screen.getByText("Powered by these skills")).toBeInTheDocument();
    expect(screen.getByText("HS-078")).toBeInTheDocument();
    expect(screen.getByText("HS-010")).toBeInTheDocument();
    expect(screen.getByText("HS-069")).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run tests — expect FAIL**

```bash
npm test -- src/modules/hyperfocus/focus/FocusSprintPage.test.tsx
```

Expected: FAIL because the component still renders the old placeholder and has no buttons.

### Task 2: Implement The Calm Micro-Task Flow (Green)

**Files:**
- Modify: `src/modules/hyperfocus/focus/FocusSprintPage.tsx`

- [ ] **Step 1: Replace the component body**

```tsx
import { useState } from "react";

import { screenSkillLoadout } from "../../../config/hyperfocus_skill_stack";
import { focusSprintSeed, rescueMessage } from "./focusSprintSeed";

export function FocusSprintPage() {
  const focusSkills = screenSkillLoadout.focus;
  const [taskIndex, setTaskIndex] = useState(0);
  const [showRescue, setShowRescue] = useState(false);

  const currentTask = focusSprintSeed[taskIndex] ?? null;

  function markDone() {
    setShowRescue(false);
    setTaskIndex((index) => index + 1);
  }

  return (
    <main className="focus-page">
      <section className="focus-card">
        <p className="eyebrow">HyperFocus OS</p>
        <h1>Focus Sprint</h1>
        <p className="supporting-copy">
          One calm slice of work, powered by the Focus screen skill stack.
        </p>

        {currentTask ? (
          <div className="task-panel">
            <h2>Current micro-task</h2>
            <p className="task-title">{currentTask.title}</p>
            <p className="task-hint">{currentTask.hint}</p>

            <div className="task-actions">
              <button type="button" className="primary" onClick={markDone}>
                Mark this done
              </button>
              <button
                type="button"
                className="ghost"
                onClick={() => setShowRescue((value) => !value)}
              >
                I'm stuck
              </button>
            </div>

            {showRescue ? (
              <p className="rescue-message" role="status">
                {rescueMessage}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="task-panel task-panel--complete">
            <h2>Sprint complete</h2>
            <p>You moved through every step. That counts.</p>
          </div>
        )}

        <section aria-labelledby="focus-skills-title" className="skill-panel">
          <h2 id="focus-skills-title">Powered by these skills</h2>
          <ul>
            {focusSkills.map((skillId) => (
              <li key={skillId}>{skillId}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Run the focused test — expect PASS (5 tests)**

```bash
npm test -- src/modules/hyperfocus/focus/FocusSprintPage.test.tsx
```

### Task 3: Calm Styling For The New Elements

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Append styles for the task panel, buttons, and rescue message**

```css
.task-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #f8fafc;
}

.task-hint {
  color: #cbd5e1;
}

.task-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.task-actions button {
  border-radius: 0.65rem;
  padding: 0.6rem 1.1rem;
  font: inherit;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease;
}

.task-actions .primary {
  border: 1px solid transparent;
  background: #2563eb;
  color: #f8fafc;
}

.task-actions .primary:hover {
  background: #1d4ed8;
}

.task-actions .ghost {
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: transparent;
  color: #cbd5e1;
}

.task-actions .ghost:hover {
  border-color: rgba(148, 163, 184, 0.6);
}

.rescue-message {
  margin-top: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 0.65rem;
  border: 1px solid rgba(147, 197, 253, 0.35);
  background: rgba(30, 58, 138, 0.35);
  color: #dbeafe;
}

.task-panel--complete p {
  color: #cbd5e1;
}
```

Note: `.task-panel` reuses the existing `.task-placeholder, .skill-panel` block styling — rename that selector's `.task-placeholder` to `.task-panel` so the card background still applies, or add `.task-panel` alongside it. Keep one shared rule; do not duplicate the background.

### Task 4: Full Verification

- [ ] **Step 1: Full test suite green**

```bash
npm test
```

Expected: Phase 1a skill-stack suite (5) + Focus Sprint suite (5) all pass.

- [ ] **Step 2: Production build compiles**

```bash
npx vite build
```

- [ ] **Step 3: Drive the flow in the browser**

```bash
npm run dev
```

Open `http://localhost:5173/focus` and confirm:
- The first seeded task and its hint render.
- "Mark this done" advances through all seeded tasks, then shows "Sprint complete".
- "I'm stuck" reveals the rescue message; pressing again hides it.
- The skill list still shows `HS-078`, `HS-010`, `HS-069`.

- [ ] **Step 4: Commit (suggested cadence)**

```bash
git add src/modules/hyperfocus/focus/focusSprintSeed.ts \
        src/modules/hyperfocus/focus/FocusSprintPage.test.tsx \
        src/modules/hyperfocus/focus/FocusSprintPage.tsx \
        src/styles/globals.css
git commit -m "feat: add calm micro-task flow and rescue stub to focus sprint"
```

## Verification Summary
- `npm test` → 10 tests green (5 config + 5 Focus Sprint).
- `vite build` clean.
- Browser: advance through seeded tasks → completion state; rescue toggles; skills still render.

## Self-Review
- Scope: one screen, seeded + local only, no persistence/AI/timers/scoring — matches the war-room guardrails.
- Behavior change: the Phase 1b placeholder assertion is intentionally replaced (documented above), not silently dropped.
- Reuse: consumes existing `screenSkillLoadout.focus`; adds no new dependencies (`fireEvent` ships with `@testing-library/react`).
- Rescue copy embodies `HS-069 MERCY MESSAGE`: supportive, non-guilt, non-clinical.
