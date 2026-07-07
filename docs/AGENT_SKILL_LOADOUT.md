# HyperFocus OS Agent Skill Loadout

## Purpose
This file maps project agents to the canonical `HyperFocus OS` skill stack so session startup and specialist routing stay consistent.

## Core Loadout Table
| Agent | Core Responsibility | Skills To Load | Why |
|---|---|---|---|
| `broski-orchestrator` | Project routing, sequencing, multi-agent coordination | `HS-125`, `HS-030`, `HS-007`, `HS-099` | Holds context, guardrails, and swarm structure together |
| `project-strategist` | Scope control, sprint shaping, priority calls | `HS-125`, `HS-030`, `HS-123` | Protects the wedge and keeps work in small wins |
| `cto-system-architect` | System shape, module boundaries, technical direction | `HS-125`, `HS-030`, `HS-099` | Aligns architecture with the constitution and clear role anatomy |
| `frontend-craftsman` | Hero flow UI, layout, calm visual polish | `HS-010`, `HS-078`, `HS-069` | Keeps screens readable, supportive, and flow-safe |
| `ux-flow-guardian` | Rescue UX, low-cognitive-load flow, user-state transitions | `HS-078`, `HS-010`, `HS-069` | Ensures every path has a gentle next move |
| `backend-architect` | Service shape, APIs, state logic, implementation path | `HS-125`, `HS-030`, `HS-123` | Connects system truth to momentum-friendly implementation |
| `security-auditor` | Privacy posture, safe claims, sensitive-boundary review | `HS-030`, `HS-069` | Enforces non-clinical, trust-first product language and behavior |
| `qa-test-engineer` | Demo-path testing, failures, release gates | `HS-069`, `HS-078`, `HS-030` | Makes failure states humane and keeps the live path safe |
| `hyper-narrator` | Product story, deck tone, recovery copy, demo narrative | `HS-069`, `HS-125`, `HS-010` | Keeps the story aligned, warm, and visually coherent |
| `deep-dive-analyst` | Positioning, differentiation, crowding checks | `HS-125`, `HS-030` | Re-checks the product against its own truth and market shape |
| `manifest-enforcer` | ND-first, privacy-focused, performance-aligned review | `HS-030`, `HS-078`, `HS-069` | Catches overload, surveillance drift, and harmful tone |

## By Work Mode
- Strategy mode
  - Lead: `project-strategist`
  - Support: `deep-dive-analyst`, `hyper-narrator`
  - Skills: `HS-125`, `HS-030`, `HS-123`
- Product mode
  - Lead: `ux-flow-guardian`
  - Support: `frontend-craftsman`
  - Skills: `HS-010`, `HS-078`, `HS-069`
- System mode
  - Lead: `cto-system-architect`
  - Support: `backend-architect`, `security-auditor`
  - Skills: `HS-125`, `HS-030`, `HS-099`
- Swarm mode
  - Lead: `broski-orchestrator`
  - Support: specialist agents as needed
  - Skills: `HS-007`, `HS-099`, `HS-125`
- Launch mode
  - Lead: `qa-test-engineer`
  - Support: `security-auditor`, `hyper-narrator`
  - Skills: `HS-069`, `HS-078`, `HS-030`

## Screen Responsibility Map
- Capture
  - Lead: `frontend-craftsman`
  - Support: `ux-flow-guardian`
  - Skills: `HS-010`, `HS-069`
- Plan
  - Lead: `ux-flow-guardian`
  - Support: `project-strategist`
  - Skills: `HS-123`, `HS-010`
- Focus
  - Lead: `ux-flow-guardian`
  - Support: `frontend-craftsman`
  - Skills: `HS-078`, `HS-010`, `HS-069`
- Win
  - Lead: `hyper-narrator`
  - Support: `frontend-craftsman`
  - Skills: `HS-069`, `HS-010`
- Behind The Scenes
  - Lead: `cto-system-architect`
  - Support: `broski-orchestrator`
  - Skills: `HS-007`, `HS-099`, `HS-125`

## Startup Rule
- A new `HyperFocus OS` session should always start by loading `HS-125` and `HS-030`.
- Add only the next layer needed for the current task.
- Do not load swarm skills for solo UI polish work.
- Do not skip mercy and flow skills when touching user-facing interactions.
