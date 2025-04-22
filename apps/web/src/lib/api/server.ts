import type { App } from "@aisboost/server";
import { treaty } from "@elysiajs/eden";
import { headers, type UnsafeUnwrappedHeaders } from "next/headers";

export const api = treaty<App>(process.env.NEXT_PUBLIC_API, {
  headers: () => {
    return {
      Cookie:
        (headers() as unknown as UnsafeUnwrappedHeaders).get("Cookie") || "",
    };
  },
});
