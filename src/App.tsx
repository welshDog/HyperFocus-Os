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
