/**
 * App-level runtime configuration.
 *
 * demoMode is ON by default. In demo mode the app is fully seeded and
 * deterministic — the Dump -> Plan step returns heroIdeaSeed instead of
 * calling a live model, so the demo runs with no network. Set
 * VITE_DEMO_MODE=false to opt into the live-AI path (which still falls back
 * to the seed if the request fails).
 */
export function isDemoMode(): boolean {
  return import.meta.env.VITE_DEMO_MODE !== "false";
}
