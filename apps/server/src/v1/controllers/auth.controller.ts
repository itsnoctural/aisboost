import { generateCodeVerifier, generateState } from "arctic";
import { Elysia, error, t } from "elysia";
import { github, google, lucia } from "../lib/lucia";
import { auth } from "../plugins/auth";
import * as AuthService from "../services/auth.service";
import * as UsersService from "../services/users.service";

export const AuthController = new Elysia({ prefix: "/auth" })
  .group("/link", (app) =>
    app
      .get("/github", async ({ cookie, redirect }) => {
        const state = generateState();
        const url = await github.createAuthorizationURL(state, ["user:email"]);

        cookie.github_state.set({
          value: state,
          path: "/",
          secure: Bun.env.NODE_ENV === "production",
          httpOnly: true,
          maxAge: 60 * 10,
          sameSite: "lax",
        });

        return redirect(url.href);
      })
      .get("/google", async ({ cookie, redirect }) => {
        const state = generateState();
        const codeVerifier = generateCodeVerifier();

        const url = await google.createAuthorizationURL(state, codeVerifier, [
          "email",
        ]);

        cookie.google_state.set({
          value: state,
          path: "/",
          secure: Bun.env.NODE_ENV === "production",
          httpOnly: true,
          maxAge: 60 * 10,
          sameSite: "lax",
        });

        cookie.code_verifier.set({
          value: codeVerifier,
          path: "/",
          secure: Bun.env.NODE_ENV === "production",
          httpOnly: true,
          maxAge: 60 * 10,
          sameSite: "lax",
        });

        return redirect(url.href);
      }),
  )
  .guard(
    {
      query: t.Object({
        code: t.String(),
        state: t.String(),
      }),
      cookie: t.Partial(
        t.Cookie({
          github_state: t.String(),
          google_state: t.String(),
          code_verifier: t.String(),
        }),
      ),
    },
    (app) =>
      app
        .get("/github", async ({ cookie, query, redirect }) => {
          if (cookie.github_state.value !== query.state)
            throw error(400, "Incorrect state.");

          const tokens = await github.validateAuthorizationCode(query.code);
          const { id, email } = await AuthService.getUserGithub(
            tokens.accessToken(),
          );

          const user = await UsersService.findOrCreate(
            `${id}`,
            "github",
            email,
          );

          const session = await lucia.createSession(user.id, {});
          const sessionCookie = lucia.createSessionCookie(session.id);

          cookie[sessionCookie.name].set({
            value: sessionCookie.value,
            ...sessionCookie.attributes,
          });

          return redirect(Bun.env.DASHBOARD_URL);
        })
        .get("/google", async ({ cookie, query, redirect }) => {
          if (
            !cookie.code_verifier.value ||
            cookie.google_state.value !== query.state
          )
            throw error(400, "Incorrect state.");

          const tokens = await google.validateAuthorizationCode(
            query.code,
            cookie.code_verifier.value,
          );

          const { sub, email } = await AuthService.getUserGoogle(
            tokens.accessToken(),
          );

          const user = await UsersService.findOrCreate(
            `${sub}`,
            "google",
            email,
          );

          const session = await lucia.createSession(user.id, {});
          const sessionCookie = lucia.createSessionCookie(session.id);

          cookie[sessionCookie.name].set({
            value: sessionCookie.value,
            ...sessionCookie.attributes,
          });

          return redirect(Bun.env.DASHBOARD_URL);
        }),
  )
  .guard((app) =>
    app.use(auth).get("/logout", async ({ session, redirect, cookie }) => {
      await lucia.invalidateSession(session.id);

      const sessionCookie = lucia.createBlankSessionCookie();
      cookie[sessionCookie.name].set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });

      return redirect(Bun.env.DASHBOARD_URL);
    }),
  );
