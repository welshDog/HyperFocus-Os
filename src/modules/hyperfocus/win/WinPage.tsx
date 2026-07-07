import { useNavigate } from "react-router-dom";

import { heroIdeaSeed } from "../../../content/heroIdeaSeed";

export function WinPage() {
  const navigate = useNavigate();
  const { headline, note } = heroIdeaSeed.win;

  return (
    <main className="focus-page">
      <section className="focus-card">
        <p className="eyebrow">HyperFocus OS</p>
        <h1>{headline}</h1>
        <p className="supporting-copy">{note}</p>

        <div className="task-actions">
          <button
            type="button"
            className="ghost"
            onClick={() => navigate("/")}
          >
            Start again
          </button>
        </div>
      </section>
    </main>
  );
}
