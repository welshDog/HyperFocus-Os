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
