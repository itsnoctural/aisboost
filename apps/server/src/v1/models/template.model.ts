import { Elysia, t } from "elysia";

export const TemplateModel = new Elysia().model({
  template: t.Object({
    type: t.Union([
      t.Literal("linkvertise"),
      t.Literal("lootlabs"),
      t.Literal("workink"),
    ]),
    apiKey: t.String(),
    apiUrl: t.String(),
  }),
});
