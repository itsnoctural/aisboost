import Elysia, { t } from "elysia";
import { auth } from "../plugins/auth";
import * as KeysService from "../services/keys.service";

export const KeysController = new Elysia({ prefix: "/keys" })
  .use(auth)
  .guard({ params: t.Object({ application: t.Numeric() }) }, (app) =>
    app.group("/:application", (app) =>
      app.get("/", ({ params, user }) =>
        KeysService.getAll(params.application, user.id),
      ),
    ),
  );
