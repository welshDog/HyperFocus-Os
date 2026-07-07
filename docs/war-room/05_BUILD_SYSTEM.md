# HyperFocus OS War Room: Build System

## Build Call
- Architecture: modular monolith
- App shape: one codebase, one deployable app, clear domain boundaries
- Delivery bias: ship fast now, preserve extractable boundaries later

## Preferred Stack
- `Next.js`
- `TypeScript`
- `React`
- `Tailwind CSS`
- `Supabase`
- `Prisma`
- `Zod`
- `Resend`
- `Sentry`

## Why This Stack
- Fast to scaffold
- Strong for one polished web product
- Good auth and data defaults
- Easy to demo
- Easy to evolve without early microservice pain

## Shared Core
- Auth
- Users
- Workspaces
- Event log
- Tasks
- Notes
- Notifications
- AI request logging
- Prompt templates
- Common UI and validation

## Domain Modules
- `hyperfocus`
  - Capture
  - Prioritization
  - Focus sessions
  - Rescue flow
  - Recap
- `relay`
  - Input normalization
  - Triage logic
  - Step generation
  - Action handoff
- `noc`
  - Future founder command layer
  - Future operating signals
  - Future decision and risk view

## Data Principle
- Durable state in `Supabase Postgres`
- Simple attachments in storage
- Avoid deep integrations before the hero flow is stable
- Keep AI outputs structured and replayable where possible

## Repo Shape
```text
HyperFocus-Os/
├─ docs/
│  └─ war-room/
├─ public/
├─ src/
│  ├─ app/
│  ├─ modules/
│  │  ├─ core/
│  │  ├─ hyperfocus/
│  │  ├─ relay/
│  │  └─ noc/
│  ├─ components/
│  ├─ lib/
│  └─ styles/
└─ skills/
```

## Build Rules
- One hero route first
- One strong demo path before extra features
- Seeded sample data before live integrations
- Server-first rendering where it keeps the app fast and simple
- Explicit validation at all write boundaries

## First Technical Milestones
1. App shell and route structure
2. Capture and plan flow
3. Focus sprint and rescue flow
4. Seeded demo mode
5. Basic persistence and session support
6. Polished live demo path

## Do Not Do
- Do not split into microservices yet.
- Do not add many connectors first.
- Do not build NOC-heavy surfaces before HyperFocus works.
- Do not let architecture get ahead of the demo.
