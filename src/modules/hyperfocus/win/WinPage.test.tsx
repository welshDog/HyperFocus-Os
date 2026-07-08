import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { heroIdeaSeed } from "../../../content/heroIdeaSeed";
import { routerFutureFlags } from "../../../routerFutureFlags";
import { WinPage } from "./WinPage";

function renderPage() {
  return render(
    <MemoryRouter future={routerFutureFlags}>
      <WinPage />
    </MemoryRouter>,
  );
}

describe("WinPage", () => {
  it("renders the calm win headline and note", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: heroIdeaSeed.win.headline }),
    ).toBeInTheDocument();
    expect(screen.getByText(heroIdeaSeed.win.note)).toBeInTheDocument();
  });

  it("offers a calm way to start again", () => {
    renderPage();

    expect(
      screen.getByRole("button", { name: "Start again" }),
    ).toBeInTheDocument();
  });
});
