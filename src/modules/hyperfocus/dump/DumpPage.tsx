import { useNavigate } from "react-router-dom";

import { heroIdeaSeed } from "../../../content/heroIdeaSeed";

export function DumpPage() {
  const navigate = useNavigate();

  return (
    <main className="focus-page">
      <section className="focus-card">
        <p className="eyebrow">HyperFocus OS</p>
        <h1>What's on your mind?</h1>
        <p className="supporting-copy">
          Dump the messy version. No structure needed — turning it calm is our job.
        </p>

        <textarea
          className="dump-input"
          aria-label="Brain dump"
          rows={6}
          defaultValue={heroIdeaSeed.rawDump}
        />

        <div className="task-actions">
          <button
            type="button"
            className="primary"
            onClick={() => navigate("/plan")}
          >
            Make this calm
          </button>
        </div>
      </section>
    </main>
  );
}
