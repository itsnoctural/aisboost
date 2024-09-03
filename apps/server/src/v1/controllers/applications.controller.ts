import { Elysia, t } from "elysia";
import { ApplicationModel } from "../models/application.model";
import { auth } from "../plugins/auth";
import * as ApplicationsService from "../services/applications.service";

export const ApplicationsController = new Elysia({ prefix: "/applications" })
  .use(ApplicationModel)
  .use(auth)
  .get("/", ({ user }) => ApplicationsService.findAll(user.id))
  .post("/", ({ user, body }) => ApplicationsService.create(user.id, body), {
    body: "application",
  })
  .guard({ params: t.Object({ id: t.Numeric() }) }, (app) =>
    app.group("/:id", (app) =>
      app
        .get("/", ({ user, params }) =>
          ApplicationsService.getById(params.id, user.id),
        )
        .patch(
          "/",
          ({ user, params, body }) =>
            ApplicationsService.updateById(user.id, params.id, body),
          {
            body: "application",
          },
        )
        .delete("/", ({ user, params }) =>
          ApplicationsService.deleteById(user.id, params.id),
        ),
    ),
  );
