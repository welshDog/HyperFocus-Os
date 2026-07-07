# HyperFocus OS — Submission Pack Checklist

Half of hackathon projects have a working demo and a weak submission. This is where we flip that. Work top to bottom; check items off as they land.

## 1. The Pitch (write these first — everything else flows from them)
- [ ] **One-liner** (memorize it):
  > Every productivity tool yells at you. HyperFocus OS gives neurodivergent founders one calm next step — it turns the mess in your head into research, a launch plan, and the smallest possible thing to do next.
- [ ] **Elevator pitch (2–3 sentences)** — problem → who it's for → the calm difference.
- [ ] **"Why this matters" paragraph** — the neurodivergent-builder angle. Judges respond to mission; lead with the human, not the tech.

## 2. Demo Video (60–90s — the single highest-leverage asset)
- [ ] **Hook in the first 10 seconds:** the messy brain-dump (`heroIdeaSeed.rawDump`) becoming a calm, structured plan. Lead with the transformation, not a feature tour.
- [ ] Show the **"I'm stuck" rescue** — this is your most differentiated 5 seconds. Let it breathe.
- [ ] End on the calm **Win** state.
- [ ] Narrate the **why** (ADHD founders, anti-guilt), not the stack.
- [ ] Keep it under 90s. Captions on (many judges watch muted).

## 3. Screenshots (3 key states)
- [ ] **Dump** — the raw idea in the calm textarea.
- [ ] **Plan** — distilled reframe + research + launch steps, revealed calmly.
- [ ] **Focus + rescue** — one micro-task and the "I'm stuck" message visible.

## 4. README as a Landing Page
- [ ] Problem statement (1–2 lines).
- [ ] The one-liner.
- [ ] The demo GIF/video embed near the top.
- [ ] "How it works" — the Dump → Plan → Focus → Win flow.
- [ ] Tech stack + run instructions (`npm install`, `npm run dev`, `/focus`).
- [ ] Link to `docs/AGENT_START.md` and `docs/WAR_ROOM_LATEST.md`.
  *(README skeleton already exists — expand it into a sell.)*

## 5. Architecture One-Pager
- [ ] Tell the "we built this thoughtfully" story: **war-room truth docs → machine-readable skill stack → tests as first consumer → `/focus` as first visible consumer → seeded hero flow.**
- [ ] One diagram or a short bullet chain. Judges reward intentionality.

## 6. Live-Demo Runbook (rehearse this)
- [ ] **Enable `demoMode`** so Dump → Plan returns the seed deterministically.
- [ ] **Test with the network disabled** — confirm the whole path still completes.
- [ ] Write the **exact click-path** you'll perform on stage and rehearse it twice:
      Dump (seeded) → "Make this calm" → Plan → "Start a focus sprint" → complete a task → "I'm stuck" → finish → Win.
- [ ] Have a **backup**: the recorded video, in case live fails entirely.

## 7. Submission Form Fields (Devpost / platform)
- [ ] Project title + tagline (the one-liner).
- [ ] What it does / how we built it / challenges / what's next.
- [ ] Category/tracks selected (lean into accessibility / neurodiversity if available).
- [ ] Repo link, demo link, video link.
- [ ] Team + built-with tags (React, TypeScript, Vite, [AI provider if used]).

## 8. Pre-Submission QA
- [ ] `npm test` green.
- [ ] `vite build` clean.
- [ ] Full click-path works with network off.
- [ ] No guilt/clinical/surveillance copy anywhere (re-read every string).
- [ ] All links in README + submission resolve.
- [ ] Video is public / unlisted and plays without login.

## Scope Reminder
If it isn't on the hero click-path or in this pack, it's post-hackathon. Depth on one story wins.
