/**
 * Opt into React Router v7 behavior early so the console stays free of the
 * v7 future-flag warnings. Shared by the app entrypoint and the test routers.
 */
export const routerFutureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
} as const;
