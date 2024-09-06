import type { App } from "@aisboost/server";
import { treaty } from "@elysiajs/eden";
import { headers } from "next/headers";

// @ts-ignore
export const api = treaty<App>(process.env.NEXT_PUBLIC_API, {
  headers: () => {
    return { Cookie: headers().get("Cookie") || "" };
  },
});
