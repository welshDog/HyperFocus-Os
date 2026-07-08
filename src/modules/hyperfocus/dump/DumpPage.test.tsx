import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { heroIdeaSeed } from "../../../content/heroIdeaSeed";
import { routerFutureFlags } from "../../../routerFutureFlags";
import { DumpPage } from "./DumpPage";

function renderPage() {
  return render(
    <MemoryRouter future={routerFutureFlags}>
      <DumpPage />
    </MemoryRouter>,
  );
}

describe("DumpPage", () => {
  it("renders the calm dump prompt", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: "What's on your mind?" }),
    ).toBeInTheDocument();
  });

  it("pre-fills the brain dump with the hero seed", () => {
    renderPage();

    expect(screen.getByLabelText("Brain dump")).toHaveValue(
      heroIdeaSeed.rawDump,
    );
  });

  it("offers the 'Make this calm' action", () => {
    renderPage();

    expect(
      screen.getByRole("button", { name: "Make this calm" }),
    ).toBeInTheDocument();
  });
});
