import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { heroIdeaSeed } from "../../../content/heroIdeaSeed";
import { useHeroFlow } from "../../../state/HeroFlowContext";

export function DumpPage() {
  const navigate = useNavigate();
  const { runPlanner } = useHeroFlow();
  const dumpRef = useRef<HTMLTextAreaElement>(null);

  function makeCalm() {
    runPlanner(dumpRef.current?.value ?? "");
    navigate("/plan");
  }

  return (
    <main className="focus-page">
      <section className="focus-card">
        <p className="eyebrow">HyperFocus OS</p>
        <h1>What's on your mind?</h1>
        <p className="supporting-copy">
          Dump the messy version. No structure needed — turning it calm is our job.
        </p>

        <textarea
          ref={dumpRef}
          className="dump-input"
          aria-label="Brain dump"
          rows={6}
          defaultValue={heroIdeaSeed.rawDump}
        />

        <div className="task-actions">
          <button type="button" className="primary" onClick={makeCalm}>
            Make this calm
          </button>
        </div>
      </section>
    </main>
  );
}
