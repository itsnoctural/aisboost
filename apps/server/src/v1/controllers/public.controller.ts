import { Elysia, t } from "elysia";
import * as ApplicationsService from "../services/applications.service";

export const PublicController = new Elysia({ prefix: "/public" }).get(
  "/application/:id",
  ({ params }) => ApplicationsService.findByIdWithTemplates(params.id),
  {
    params: t.Object({
      id: t.Numeric(),
    }),
  },
);
