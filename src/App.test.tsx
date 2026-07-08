import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { App } from "./App";
import { heroIdeaSeed } from "./content/heroIdeaSeed";
import { routerFutureFlags } from "./routerFutureFlags";

describe("App hero flow", () => {
  it("walks Dump -> Plan -> Focus -> Win for the hero idea", () => {
    render(
      <MemoryRouter initialEntries={["/"]} future={routerFutureFlags}>
        <App />
      </MemoryRouter>,
    );

    // Dump
    expect(
      screen.getByRole("heading", { name: "What's on your mind?" }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Make this calm" }));

    // Plan
    expect(
      screen.getByRole("heading", { name: "Your calm plan" }),
    ).toBeInTheDocument();
    expect(screen.getByText(heroIdeaSeed.distilled)).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Start a focus sprint" }),
    );

    // Focus
    expect(
      screen.getByRole("heading", { name: "Focus Sprint" }),
    ).toBeInTheDocument();
    heroIdeaSeed.focusSprint.microTasks.forEach(() => {
      fireEvent.click(screen.getByRole("button", { name: "Mark this done" }));
    });
    fireEvent.click(screen.getByRole("button", { name: "See your win" }));

    // Win
    expect(
      screen.getByRole("heading", { name: heroIdeaSeed.win.headline }),
    ).toBeInTheDocument();
  });
});
