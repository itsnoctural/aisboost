import { Elysia, t } from "elysia";

export const ApplicationModel = new Elysia().model({
  application: t.Object({
    name: t.String({ minLength: 2, maxLength: 32 }),
    duration: t.Number({ minimum: 1 }),
    checkpoints: t.Number({ minimum: 1, maximum: 5 }),
    keyPrefix: t.String({ minLength: 1, maxLength: 5 }),
    keyLength: t.Number({ minimum: 6, maximum: 24 }),
    webhook: t.Optional(
      t.Union([
        t.RegExp(/^https:\/\/discord\.com\/api\/webhooks\/\d+\/[\w-]+$/),
        t.Null(),
      ]),
    ),
    webhookContent: t.Optional(
      t.Union([t.String({ maxLength: 1024 }), t.Null()]),
    ),
  }),
});
