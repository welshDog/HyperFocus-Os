import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { heroIdeaSeed } from "../../../content/heroIdeaSeed";
import { FocusSprintPage } from "./FocusSprintPage";

const { microTasks, rescueMessage } = heroIdeaSeed.focusSprint;

describe("FocusSprintPage", () => {
  it("renders the heading and the first seeded micro-task", () => {
    render(<FocusSprintPage />);

    expect(
      screen.getByRole("heading", { name: "Focus Sprint" }),
    ).toBeInTheDocument();
    expect(screen.getByText(microTasks[0].title)).toBeInTheDocument();
    expect(screen.getByText(microTasks[0].hint)).toBeInTheDocument();
  });

  it("advances to the next task when the current one is marked done", () => {
    render(<FocusSprintPage />);

    fireEvent.click(screen.getByRole("button", { name: "Mark this done" }));

    expect(screen.getByText(microTasks[1].title)).toBeInTheDocument();
    expect(screen.queryByText(microTasks[0].title)).not.toBeInTheDocument();
  });

  it("shows a calm completion state after the last task", () => {
    render(<FocusSprintPage />);

    microTasks.forEach(() => {
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
