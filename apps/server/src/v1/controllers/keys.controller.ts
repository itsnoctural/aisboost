import Elysia, { t } from "elysia";
import { auth } from "../plugins/auth";
import * as KeysService from "../services/keys.service";
import * as SessionsService from "../services/sessions.service";

export const KeysController = new Elysia({ prefix: "/keys" })
  .use(auth)
  .guard({ params: t.Object({ application: t.Numeric() }) }, (app) =>
    app.group("/:application", (app) =>
      app
        .get("/", ({ params, user }) =>
          KeysService.getAll(params.application, user.id),
        )
        .post(
          "/",
          ({ params, user, body }) =>
            KeysService.create(
              params.application,
              user.id,
              body.hwid,
              body.duration,
            ),
          {
            body: t.Object({
              hwid: t.String({ maxLength: 96 }), // TODO: shared model?
              duration: t.Numeric({ minimum: 1 }),
            }),
          },
        )
        .delete(
          "/:id",
          ({ params, user }) =>
            SessionsService.deleteByKey(params.application, user.id, params.id),
          { params: t.Object({ application: t.Numeric(), id: t.String() }) },
        ),
    ),
  );
