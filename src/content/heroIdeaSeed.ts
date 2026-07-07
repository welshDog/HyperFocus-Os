/**
 * Hero demo seed for HyperFocus OS.
 *
 * One neurodivergent-founder idea, modeled end-to-end through the hero flow:
 *   Dump -> Plan (research + launch plan) -> Focus Sprint -> Win
 *
 * This is the canonical, deterministic demo content. It doubles as the
 * offline / demo-mode fallback so a live demo never depends on a network
 * call. Any AI generation (Phase 1d) must render into these same shapes.
 *
 * Guardrails honored: calm copy, no guilt, no clinical claims, one idea.
 */

export interface ResearchPoint {
  id: string;
  question: string;
  insight: string;
}

export interface LaunchStep {
  id: string;
  title: string;
  detail: string;
}

export interface MicroTask {
  id: string;
  title: string;
  hint: string;
}

export interface HeroIdea {
  persona: string;
  /** The raw, messy brain-dump the user actually types. */
  rawDump: string;
  /** One calm, shrunk-down reframe of the idea. The first relief moment. */
  distilled: string;
  research: ResearchPoint[];
  launchPlan: LaunchStep[];
  focusSprint: {
    microTasks: MicroTask[];
    rescueMessage: string;
  };
  win: {
    headline: string;
    note: string;
  };
}

export const heroIdeaSeed: HeroIdea = {
  persona: "Solo founder, ADHD, avoids starting because everything feels huge",

  rawDump:
    "ok so i keep thinking i should start a newsletter for adhd devs because " +
    "i never see one that actually gets how our brains work, but every time i " +
    "sit down i open twelve tabs and panic and close the laptop. i don't even " +
    "know if people want this, or where you'd even put it, or if i'm just " +
    "avoiding my actual work lol",

  distilled:
    "Launch a small newsletter for ADHD developers — starting with one issue, " +
    "not a whole media empire.",

  research: [
    {
      id: "r1",
      question: "Do ADHD developers actually want this?",
      insight:
        "Communities like r/ADHD_Programmers and neurodiversity dev Slacks are " +
        "active and underserved. Validate with 5 real replies before building anything.",
    },
    {
      id: "r2",
      question: "Where would it live?",
      insight:
        "Start on a zero-setup platform (Substack, Beehiiv, or Buttondown). Pick " +
        "one today; you can always migrate. The platform is not the project.",
    },
    {
      id: "r3",
      question: "What's the angle no one else has?",
      insight:
        "Not 'productivity tips' — 'tools and workflows that survive an ADHD brain.' " +
        "Specific and honest beats broad and generic.",
    },
    {
      id: "r4",
      question: "How do you get the first readers?",
      insight:
        "You don't need 1,000. You need 20 people who reply 'finally.' Share one " +
        "draft in one community you already belong to.",
    },
  ],

  launchPlan: [
    {
      id: "l1",
      title: "Name it and claim one platform",
      detail: "Pick a working title and create the account. 15 minutes. Done is the goal.",
    },
    {
      id: "l2",
      title: "Outline your first 3 issues",
      detail: "Just titles plus one line each. Issue 1 can be the one you most want to read.",
    },
    {
      id: "l3",
      title: "Write issue 1 badly",
      detail: "A rough draft that ships beats a perfect one that doesn't. Edit tomorrow.",
    },
    {
      id: "l4",
      title: "Seed 20 readers",
      detail:
        "Post a two-line 'I'm starting this, want in?' in one community you already belong to.",
    },
    {
      id: "l5",
      title: "Publish and tell 3 people",
      detail: "Hit send. Message three friends. That's a launch.",
    },
  ],

  focusSprint: {
    microTasks: [
      {
        id: "t1",
        title: "Open a new doc and title it 'Issue 1'",
        hint: "Just the title. That's the whole task right now.",
      },
      {
        id: "t2",
        title: "Write one sentence you wish someone had told you",
        hint: "One sentence. It can be messy.",
      },
      {
        id: "t3",
        title: "Open the signup tab for one platform",
        hint: "Opening the tab counts. You don't have to finish signup.",
      },
    ],
    rescueMessage:
      "No rush. Shrink the step until it feels almost too small, then do that. " +
      "You are not behind.",
  },

  win: {
    headline: "That's a real start.",
    note:
      "You turned a spiral into three done things and a plan you can see. " +
      "Come back when you're ready for the next slice.",
  },
};
