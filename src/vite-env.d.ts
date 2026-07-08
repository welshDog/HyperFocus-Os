/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Set to "false" to enable the live-AI plan path; anything else = demo mode. */
  readonly VITE_DEMO_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
