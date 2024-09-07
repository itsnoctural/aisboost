import { Elysia, t } from "elysia";
import * as SessionsService from "../services/sessions.service";

export const SessionsController = new Elysia({ prefix: "/sessions" }).guard(
  {
    params: t.Object({ application: t.Numeric() }),
    query: t.Object({
      template: t.Optional(t.Numeric()),
      hwid: t.String({ maxLength: 96 }),
      tk: t.Optional(t.String()),
    }),
  },
  (app) =>
    app.group("/:application", (app) =>
      app
        .get("/", ({ params, query }) =>
          SessionsService.getSession(
            params.application,
            query.hwid,
            query.template,
          ),
        )
        .post("/", ({ params, query }) =>
          SessionsService.processSession(
            params.application,
            query.hwid,
            query.tk,
          ),
        ),
    ),
);
