import { screenSkillLoadout } from "../../../config/hyperfocus_skill_stack";

export function FocusSprintPage() {
  const focusSkills = screenSkillLoadout.focus;

  return (
    <main className="focus-page">
      <section className="focus-card">
        <p className="eyebrow">HyperFocus OS</p>
        <h1>Focus Sprint</h1>
        <p className="supporting-copy">
          One calm slice of work, powered by the Focus screen skill stack.
        </p>

        <div className="task-placeholder">
          <h2>Current micro-task</h2>
          <p>Current micro-task placeholder</p>
        </div>

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
