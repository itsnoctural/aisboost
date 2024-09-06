import type { App } from "@aisboost/server";
import { treaty } from "@elysiajs/eden";

// @ts-ignore
export const api = treaty<App>(process.env.NEXT_PUBLIC_API, {
  fetch: { credentials: "include" },
});
