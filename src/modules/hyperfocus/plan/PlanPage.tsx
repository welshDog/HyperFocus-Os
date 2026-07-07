import { useNavigate } from "react-router-dom";

import { heroIdeaSeed } from "../../../content/heroIdeaSeed";

export function PlanPage() {
  const navigate = useNavigate();
  const { distilled, research, launchPlan } = heroIdeaSeed;

  return (
    <main className="focus-page">
      <section className="focus-card">
        <p className="eyebrow">HyperFocus OS</p>
        <h1>Your calm plan</h1>
        <p className="distilled">{distilled}</p>

        <section aria-labelledby="research-title" className="task-panel">
          <h2 id="research-title">What to check first</h2>
          <ul className="plan-list">
            {research.map((point) => (
              <li key={point.id}>
                <p className="plan-item-title">{point.question}</p>
                <p className="plan-item-detail">{point.insight}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="launch-title" className="task-panel">
          <h2 id="launch-title">Launch plan</h2>
          <ol className="plan-list">
            {launchPlan.map((step) => (
              <li key={step.id}>
                <p className="plan-item-title">{step.title}</p>
                <p className="plan-item-detail">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="task-actions">
          <button
            type="button"
            className="primary"
            onClick={() => navigate("/focus")}
          >
            Start a focus sprint
          </button>
        </div>
      </section>
    </main>
  );
}
