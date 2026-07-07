# HyperFocus OS War Room: Risk, Security, and QA

## Risk Call
The biggest project risk is not lack of ideas. It is building something broad, fragile, or trust-breaking before the core flow is solid.

## Product Risks
- Scope sprawl
- Generic AI-wrapper feeling
- Noisy UI
- Weak demo transformation
- Too many integrations too early

## Privacy Risks
- Collecting more behavioral data than needed
- Presenting the product like a medical tool
- Weak deletion or export expectations
- Fuzzy language around sensitive user state

## Safe Claim Rules
- Say: supports ADHD-friendly workflows
- Say: helps with planning, focus, and next-step clarity
- Say: AI-assisted
- Do not say: treats ADHD
- Do not say: clinically proven
- Do not say: fully autonomous

## Trust Rules
- Minimize collection
- Default private
- Make retention and deletion clear
- Keep the user in control
- Avoid guilt loops, scores, or shaming mechanics

## QA Priority Order
1. Hero flow works end to end
2. Seeded demo mode works
3. Error and empty states are human-readable
4. Refresh and retry do not break the path
5. Live demo timing stays tight

## Demo Failure Paths
- AI output fails
  - Use seeded example output
- Network is slow
  - Use cached or mock demo path
- User input is messy
  - Validate and recover gracefully
- Presenter gets lost
  - Use a known-good scripted flow

## Release Gates
- No blocker bugs on the hero path
- One backup mode exists for every critical dependency
- No raw technical errors in the UI
- Demo can be run repeatedly without corruption
- The team can explain the product simply

## Testing Checklist
- Empty input
- Huge input
- Retry after failure
- Refresh during flow
- Duplicate click on primary action
- Seeded mode only
- Laptop-screen rehearsal

## Final Command
If a feature is unstable and not essential to the demo, disable it.
