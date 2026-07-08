import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { generatePlan, seedPlan, type GeneratedPlan } from "../services/planner";

interface HeroFlowValue {
  /** The current plan shown on the Plan screen. Defaults to the seed. */
  plan: GeneratedPlan;
  /** Kick off planning from a raw dump (seed in demo mode, live otherwise). */
  runPlanner: (rawDump: string) => void;
}

const HeroFlowContext = createContext<HeroFlowValue>({
  plan: seedPlan,
  runPlanner: () => {},
});

export function HeroFlowProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<GeneratedPlan>(seedPlan);

  const runPlanner = useCallback((rawDump: string) => {
    // Never rejects: generatePlan falls back to the seed on any failure.
    generatePlan(rawDump).then(setPlan);
  }, []);

  return (
    <HeroFlowContext.Provider value={{ plan, runPlanner }}>
      {children}
    </HeroFlowContext.Provider>
  );
}

export function useHeroFlow(): HeroFlowValue {
  return useContext(HeroFlowContext);
}
