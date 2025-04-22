import type { App } from "@aisboost/server";
import { treaty } from "@elysiajs/eden";
import { headers } from "next/headers";

export const api = treaty<App>(process.env.NEXT_PUBLIC_API, {
  headers: async () => {
    return {
      Cookie:
        (await headers()).get("Cookie") || "",
    };
  },
});
