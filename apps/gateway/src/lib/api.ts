import type { App } from "@aisboost/server";
import { treaty } from "@elysiajs/eden";

export const api = treaty<App>(import.meta.env.VITE_API);
