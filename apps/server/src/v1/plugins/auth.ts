import { Elysia, t } from "elysia";
import { verifyRequestOrigin } from "lucia";
import { lucia } from "../lib/lucia";

export const auth = new Elysia()
  .guard({
    as: "scoped",
    cookie: t.Cookie({
      "aisboost.auth": t.String(),
    }),
  })
  .resolve({ as: "scoped" }, async ({ request, error, cookie }) => {
    if (request.method !== "GET") {
      const origin = request.headers.get("Origin");

      if (!origin || !verifyRequestOrigin(origin, [Bun.env.HOME_URL]))
        throw error(403);
    }

    if (!cookie["aisboost.auth"].value) {
      throw error(422);
    } // REFACTOR: types after guard doesn't work after Elysia 1.2

    const { session, user } = await lucia.validateSession(
      cookie["aisboost.auth"].value,
    );

    if (!user) throw error(401);

    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookie[sessionCookie.name].set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookie[sessionCookie.name].set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });
    }

    return {
      user,
      session,
    };
  });
