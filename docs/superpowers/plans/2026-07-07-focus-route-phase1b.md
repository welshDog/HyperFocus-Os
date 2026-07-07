# HyperFocus Focus Route Phase 1b Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `.gitignore` and build one minimal `/focus` route that visibly renders `screenSkillLoadout.focus` as the first UI consumer of the HyperFocus skill stack.

**Architecture:** This phase uses the smallest working React app shell that can host a real `/focus` route without dragging the repo into full multi-screen scaffolding. The route stays focused on one screen, one import from the config layer, and one visible output so the product can refine the Focus Sprint experience before expanding breadth.

**Tech Stack:** TypeScript, Vitest, Vite, React, React Router

---

## File Structure

- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\.gitignore`
  - Ignore dependency folders, build output, coverage output, and local tool artifacts.
- Modify: `h:\HYPERFOCUSZONE\HyperFocus-Os\package.json`
  - Add app runtime dependencies, Vite scripts, and React testing dependencies.
- Modify: `h:\HYPERFOCUSZONE\HyperFocus-Os\tsconfig.json`
  - Enable JSX and DOM libs for the React route slice.
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\vite.config.ts`
  - Add React plugin and Vitest `jsdom` test environment.
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\index.html`
  - Host the Vite app root.
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\test\setup.ts`
  - Register `@testing-library/jest-dom` for component tests.
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\modules\hyperfocus\focus\FocusSprintPage.test.tsx`
  - Failing-first tests for the Focus Sprint route component.
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\modules\hyperfocus\focus\FocusSprintPage.tsx`
  - Minimal screen component that renders the heading, placeholder task area, and focus skill list.
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\App.tsx`
  - Route wiring for `/` and `/focus`.
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\main.tsx`
  - App entrypoint.
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\styles\globals.css`
  - Minimal readable styles for the first route.

### Task 1: Add Repo Hygiene And Minimal App Tooling

**Files:**
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\.gitignore`
- Modify: `h:\HYPERFOCUSZONE\HyperFocus-Os\package.json`
- Modify: `h:\HYPERFOCUSZONE\HyperFocus-Os\tsconfig.json`
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\vite.config.ts`
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\index.html`
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\test\setup.ts`

- [ ] **Step 1: Create `.gitignore`**

```gitignore
node_modules/
dist/
build/
coverage/
.trae/
*.log
```

- [ ] **Step 2: Replace `package.json` with the minimal app-and-test setup**

```json
{
  "name": "hyperfocus-os",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.0.1",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "jsdom": "^25.0.1",
    "typescript": "^5.5.4",
    "vite": "^5.4.10",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 3: Replace `tsconfig.json` with React-friendly settings**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vitest/globals"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "vite.config.ts"]
}
```

- [ ] **Step 4: Create `vite.config.ts`**

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});
```

- [ ] **Step 5: Create `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HyperFocus OS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create the test setup file**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 7: Install dependencies**

Run:

```bash
npm install
```

Expected: npm updates `package-lock.json` and completes without fatal errors.

- [ ] **Step 8: Run the existing tests before adding the new route test**

Run:

```bash
npm test
```

Expected: the Phase 1a skill-stack test still passes and no app test exists yet.

- [ ] **Step 9: Commit the hygiene and tooling setup**

```bash
git add .gitignore package.json package-lock.json tsconfig.json vite.config.ts index.html src/test/setup.ts
git commit -m "chore: scaffold focus route app shell"
```

### Task 2: Write The Failing Focus Route Test

**Files:**
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\modules\hyperfocus\focus\FocusSprintPage.test.tsx`

- [ ] **Step 1: Create the failing test file**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FocusSprintPage } from "./FocusSprintPage";

describe("FocusSprintPage", () => {
  it("renders the Focus Sprint heading and task placeholder", () => {
    render(<FocusSprintPage />);

    expect(
      screen.getByRole("heading", { name: "Focus Sprint" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Current micro-task placeholder"),
    ).toBeInTheDocument();
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

- [ ] **Step 2: Run the test to verify it fails for the right reason**

Run:

```bash
npm test -- src/modules/hyperfocus/focus/FocusSprintPage.test.tsx
```

Expected: FAIL because `./FocusSprintPage` does not exist yet.

- [ ] **Step 3: Commit the red test**

```bash
git add src/modules/hyperfocus/focus/FocusSprintPage.test.tsx
git commit -m "test: add failing focus sprint page spec"
```

### Task 3: Implement The Focus Sprint Component

**Files:**
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\modules\hyperfocus\focus\FocusSprintPage.tsx`

- [ ] **Step 1: Create the minimal component implementation**

```tsx
import { screenSkillLoadout } from "../../../config/hyperfocus_skill_stack";

export function FocusSprintPage() {
  const focusSkills = screenSkillLoadout.focus;

  return (
    <main className="focus-page">
      <section className="focus-card">
        <p className="eyebrow">HyperFocus OS</p>
        <h1>Focus Sprint</h1>
        <p className="supporting-copy">
          One calm slice of work, powered by the Focus screen skill stack.
        </p>

        <div className="task-placeholder">
          <h2>Current micro-task</h2>
          <p>Current micro-task placeholder</p>
        </div>

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

- [ ] **Step 2: Run the focused test again**

Run:

```bash
npm test -- src/modules/hyperfocus/focus/FocusSprintPage.test.tsx
```

Expected: PASS with 2 tests passing.

- [ ] **Step 3: Commit the green component**

```bash
git add src/modules/hyperfocus/focus/FocusSprintPage.tsx
git commit -m "feat: add focus sprint page component"
```

### Task 4: Wire The `/focus` Route Into A Minimal App Shell

**Files:**
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\App.tsx`
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\main.tsx`
- Create: `h:\HYPERFOCUSZONE\HyperFocus-Os\src\styles\globals.css`

- [ ] **Step 1: Create `src/App.tsx`**

```tsx
import { Navigate, Route, Routes } from "react-router-dom";

import { FocusSprintPage } from "./modules/hyperfocus/focus/FocusSprintPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/focus" replace />} />
      <Route path="/focus" element={<FocusSprintPage />} />
    </Routes>
  );
}
```

- [ ] **Step 2: Create `src/main.tsx`**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

- [ ] **Step 3: Create `src/styles/globals.css`**

```css
:root {
  color-scheme: dark;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  background: #0f172a;
  color: #e2e8f0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
}

#root {
  min-height: 100vh;
}

.focus-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
}

.focus-card {
  width: min(42rem, 100%);
  padding: 2rem;
  border-radius: 1rem;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.45);
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: #93c5fd;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h1,
h2,
p,
ul {
  margin-top: 0;
}

.supporting-copy {
  color: #cbd5e1;
}

.task-placeholder,
.skill-panel {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: rgba(30, 41, 59, 0.9);
}

ul {
  padding-left: 1.25rem;
  margin-bottom: 0;
}
```

- [ ] **Step 4: Run the full test suite**

Run:

```bash
npm test
```

Expected: the Phase 1a skill-stack test and the new Focus Sprint component test both pass.

- [ ] **Step 5: Start the local app and verify the route**

Run:

```bash
npm run dev
```

Expected: Vite starts and prints a local URL such as `http://localhost:5173/`.

- [ ] **Step 6: Open `/focus` in the browser**

Use this URL once the dev server is running:

```text
http://localhost:5173/focus
```

Expected: the page shows `Focus Sprint`, the placeholder task area, and the rendered skill list `HS-078`, `HS-010`, `HS-069`.

- [ ] **Step 7: Commit the route wiring**

```bash
git add src/App.tsx src/main.tsx src/styles/globals.css
git commit -m "feat: wire focus route into app shell"
```

### Task 5: Record The Phase 1b Outcome

**Files:**
- Modify: `h:\HYPERFOCUSZONE\HyperFocus-Os\docs\superpowers\specs\2026-07-07-focus-route-phase1b-design.md` (only if the implementation deviates)

- [ ] **Step 1: Record the final handoff note**

Use this text in the next status update or implementation summary:

```text
Phase 1b complete: the repo now ignores local dependency noise, boots a minimal React app shell, and exposes `/focus` as the first visible runtime consumer of screenSkillLoadout.focus.
```

- [ ] **Step 2: Commit any final cleanup**

```bash
git add .gitignore package.json package-lock.json tsconfig.json vite.config.ts index.html src/test/setup.ts src/modules/hyperfocus/focus/FocusSprintPage.test.tsx src/modules/hyperfocus/focus/FocusSprintPage.tsx src/App.tsx src/main.tsx src/styles/globals.css
git commit -m "chore: finalize phase 1b focus route slice"
```

## Self-Review

- Spec coverage: This plan covers the approved Phase 1b slice only: `.gitignore`, minimal app shell, and `/focus` as the first visible runtime consumer.
- Placeholder scan: No `TBD`, deferred behavior, or vague testing instructions remain.
- Type consistency: The plan consistently uses `screenSkillLoadout.focus`, `FocusSprintPage`, and `/focus` throughout.
