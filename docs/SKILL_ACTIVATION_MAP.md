# HyperFocus OS Skill Activation Map

## Purpose
This file turns the HYPER-SILLs vault research into an execution map for `HyperFocus OS`.

Use it to answer three questions fast:
- Which skills stay on by default?
- Which skills matter for each war-room doc?
- Which skills matter for each core screen and build phase?

## Always-On Skill Stack
1. `HS-125 THE GRAND CODEX`
   - Job: ecosystem context, sacred rules, architecture snapshot
   - Use when: starting any new `HyperFocus OS` session or resetting project truth
2. `HS-030 HYPERFOCUS MASTER CONSTITUTION`
   - Job: guardrails, principles, anti-sprawl checks
   - Use when: adding features, changing claims, or touching sensitive product framing
3. `HS-123 GODFLOW`
   - Job: ND-first workflow, momentum chunking, execution loop design
   - Use when: planning sprints, breaking work into wins, or shaping daily flow
4. `HS-078 FLOW KEEPER`
   - Job: anti-interruption defaults, flow-state preservation, rescue logic
   - Use when: designing stuck states, focus mode, or low-friction actions
5. `HS-010 THE AESTHETE`
   - Job: calm UX, visual tone, readability, ND-friendly design choices
   - Use when: building screens, choosing hierarchy, or polishing the hero flow
6. `HS-069 MERCY MESSAGE`
   - Job: non-shaming copy, gentle recovery cues, empathy-first errors
   - Use when: writing validation, empty states, error states, or recovery messages
7. `HS-007 SWARM CROWN`
   - Job: swarm coordination, task delegation, multi-agent pattern
   - Use when: the project moves from single-agent routing to parallel specialist work
8. `HS-099 SIX-ORGAN HEART`
   - Job: agent anatomy, role clarity, build checklist for new agents
   - Use when: defining specialist agents, new roles, or MCP-facing agent structure

## Load Order
1. `HS-125 THE GRAND CODEX`
2. `HS-030 HYPERFOCUS MASTER CONSTITUTION`
3. `HS-123 GODFLOW`
4. `HS-078 FLOW KEEPER`
5. `HS-010 THE AESTHETE`
6. `HS-069 MERCY MESSAGE`
7. `HS-007 SWARM CROWN`
8. `HS-099 SIX-ORGAN HEART`

## By War-Room Doc
- [WAR_ROOM_LATEST.md](war-room/../WAR_ROOM_LATEST.md)
  - Skills: `HS-125`, `HS-030`
  - Why: stable project truth and session boot
- [01_MASTER_BRIEF.md](war-room/01_MASTER_BRIEF.md)
  - Skills: `HS-125`, `HS-030`
  - Why: protects the core story and prevents drift
- [02_JUDGE_PITCH.md](war-room/02_JUDGE_PITCH.md)
  - Skills: `HS-125`, `HS-069`
  - Why: keeps the story aligned and language human
- [03_PRODUCT_SHAPE.md](war-room/03_PRODUCT_SHAPE.md)
  - Skills: `HS-125`, `HS-030`, `HS-078`
  - Why: protects scope and rescue-first UX behavior
- [04_AGENT_COMMAND.md](war-room/04_AGENT_COMMAND.md)
  - Skills: `HS-007`, `HS-099`, `HS-125`
  - Why: maps routing, role clarity, and orchestration patterns
- [05_BUILD_SYSTEM.md](war-room/05_BUILD_SYSTEM.md)
  - Skills: `HS-125`, `HS-030`, `HS-099`
  - Why: keeps architecture aligned with system rules and later agent growth
- [06_SPRINT_PLAN.md](war-room/06_SPRINT_PLAN.md)
  - Skills: `HS-123`, `HS-078`
  - Why: turns work into ND-safe momentum loops
- [07_RISK_SECURITY_QA.md](war-room/07_RISK_SECURITY_QA.md)
  - Skills: `HS-030`, `HS-069`
  - Why: safe claims, humane failures, and non-clinical boundaries
- [08_SUBMISSION_CHECKLIST.md](war-room/08_SUBMISSION_CHECKLIST.md)
  - Skills: `HS-125`, `HS-069`
  - Why: keeps the pitch truthful and the tone clean under pressure

## By Screen
- Capture
  - Skills: `HS-010`, `HS-069`
  - Goal: calm entry, clear prompt, no shame
- Plan
  - Skills: `HS-123`, `HS-010`
  - Goal: visible order, low cognitive load, obvious next action
- Focus
  - Skills: `HS-078`, `HS-010`
  - Goal: protect flow, reduce noise, support starting
- Win
  - Skills: `HS-069`, `HS-010`
  - Goal: gentle success, no pressure spiral, next small step
- Behind The Scenes
  - Skills: `HS-007`, `HS-099`, `HS-125`
  - Goal: keep agent and system logic structured without leaking complexity into the user experience

## By Build Phase
- Session boot
  - Load: `HS-125`, `HS-030`
- Scope and sprint planning
  - Load: `HS-123`, `HS-078`
- Hero flow design
  - Load: `HS-010`, `HS-078`, `HS-069`
- Agent and orchestration design
  - Load: `HS-007`, `HS-099`, `HS-125`
- Safety and QA review
  - Load: `HS-030`, `HS-069`

## Default Rule
- Start with context skills first.
- Add flow and UX skills for any user-facing work.
- Add swarm skills only when the project genuinely needs more agent complexity.
- If a skill does not clearly improve the current task, do not load it just because it exists.
