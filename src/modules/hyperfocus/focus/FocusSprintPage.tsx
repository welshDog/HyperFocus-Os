import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { screenSkillLoadout } from "../../../config/hyperfocus_skill_stack";
import { heroIdeaSeed } from "../../../content/heroIdeaSeed";

export function FocusSprintPage() {
  const navigate = useNavigate();
  const focusSkills = screenSkillLoadout.focus;
  const { microTasks, rescueMessage } = heroIdeaSeed.focusSprint;

  const [taskIndex, setTaskIndex] = useState(0);
  const [showRescue, setShowRescue] = useState(false);

  const currentTask = microTasks[taskIndex] ?? null;

  function markDone() {
    setShowRescue(false);
    setTaskIndex((index) => index + 1);
  }

  return (
    <main className="focus-page">
      <section className="focus-card">
        <p className="eyebrow">HyperFocus OS</p>
        <h1>Focus Sprint</h1>
        <p className="supporting-copy">
          One calm slice of work, powered by the Focus screen skill stack.
        </p>

        {currentTask ? (
          <div className="task-panel">
            <h2>Current micro-task</h2>
            <p className="task-title">{currentTask.title}</p>
            <p className="task-hint">{currentTask.hint}</p>

            <div className="task-actions">
              <button type="button" className="primary" onClick={markDone}>
                Mark this done
              </button>
              <button
                type="button"
                className="ghost"
                onClick={() => setShowRescue((value) => !value)}
              >
                I'm stuck
              </button>
            </div>

            {showRescue ? (
              <p className="rescue-message" role="status">
                {rescueMessage}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="task-panel task-panel--complete">
            <h2>Sprint complete</h2>
            <p>You moved through every step. That counts.</p>
            <div className="task-actions">
              <button
                type="button"
                className="primary"
                onClick={() => navigate("/win")}
              >
                See your win
              </button>
            </div>
          </div>
        )}

        <section aria-labelledby="focus-skills-title" className="skill-panel">
          <h2 id="focus-skills-title">Powered by these skills</h2>
          <ul>
            {focusSkills.map((skillId) => (
              <li key={skillId}>{skillId}</li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
