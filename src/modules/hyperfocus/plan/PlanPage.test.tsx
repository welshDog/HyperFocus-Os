import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { heroIdeaSeed } from "../../../content/heroIdeaSeed";
import { PlanPage } from "./PlanPage";

function renderPage() {
  return render(
    <MemoryRouter>
      <PlanPage />
    </MemoryRouter>,
  );
}

describe("PlanPage", () => {
  it("shows the distilled reframe of the idea", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: "Your calm plan" }),
    ).toBeInTheDocument();
    expect(screen.getByText(heroIdeaSeed.distilled)).toBeInTheDocument();
  });

  it("renders the research points and launch steps from the seed", () => {
    renderPage();

    expect(
      screen.getByText(heroIdeaSeed.research[0].question),
    ).toBeInTheDocument();
    expect(
      screen.getByText(heroIdeaSeed.launchPlan[0].title),
    ).toBeInTheDocument();
  });

  it("offers the 'Start a focus sprint' action", () => {
    renderPage();

    expect(
      screen.getByRole("button", { name: "Start a focus sprint" }),
    ).toBeInTheDocument();
  });
});
