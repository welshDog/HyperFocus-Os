import { Route, Routes } from "react-router-dom";

import { DumpPage } from "./modules/hyperfocus/dump/DumpPage";
import { FocusSprintPage } from "./modules/hyperfocus/focus/FocusSprintPage";
import { PlanPage } from "./modules/hyperfocus/plan/PlanPage";
import { WinPage } from "./modules/hyperfocus/win/WinPage";
import { HeroFlowProvider } from "./state/HeroFlowContext";

export function App() {
  return (
    <HeroFlowProvider>
      <Routes>
        <Route path="/" element={<DumpPage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/focus" element={<FocusSprintPage />} />
        <Route path="/win" element={<WinPage />} />
      </Routes>
    </HeroFlowProvider>
  );
}
