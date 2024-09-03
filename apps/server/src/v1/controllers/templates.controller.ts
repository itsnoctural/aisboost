import { Elysia, t } from "elysia";
import { TemplateModel } from "../models/template.model";
import { auth } from "../plugins/auth";
import * as TemplatesService from "../services/templates.service";

export const TemplatesController = new Elysia({ prefix: "/templates" })
  .use(TemplateModel)
  .use(auth)
  .guard({ params: t.Object({ application: t.Numeric() }) }, (app) =>
    app.group("/:application", (app) =>
      app
        .get("/", ({ user, params }) =>
          TemplatesService.findAll(params.application, user.id),
        )
        .post(
          "/",
          ({ user, params, body }) =>
            TemplatesService.create(user.id, params.application, body),
          { body: "template" },
        )
        .guard(
          { params: t.Object({ application: t.Numeric(), id: t.Numeric() }) },
          (app) =>
            app.group("/:id", (app) =>
              app
                .get("/", ({ user, params }) =>
                  TemplatesService.getById(params.id, user.id),
                )
                .patch(
                  "/",
                  ({ user, params, body }) =>
                    TemplatesService.updateById(
                      user.id,
                      params.application,
                      params.id,
                      body,
                    ),
                  { body: "template" },
                )
                .delete("/", ({ user, params }) =>
                  TemplatesService.deleteById(
                    user.id,
                    params.application,
                    params.id,
                  ),
                ),
            ),
        ),
    ),
  );
