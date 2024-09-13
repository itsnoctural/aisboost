import { Elysia, t } from "elysia";

export const TemplateModel = new Elysia().model({
  template: t.Object({
    type: t.Union([
      t.Literal("linkvertise"),
      t.Literal("lootlabs"),
      t.Literal("workink"),
      t.Literal("shrtfly"),
    ]),
    apiKey: t.String({ maxLength: 128 }),
    apiUrl: t.String({ maxLength: 64 }),
  }),
});
