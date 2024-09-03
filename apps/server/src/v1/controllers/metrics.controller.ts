import { Elysia, t } from "elysia";
import { auth } from "../plugins/auth";
import * as MetricsService from "../services/metrics.service";

export const MetricsController = new Elysia({ prefix: "/metrics" })
  .get("/general", () => MetricsService.getGeneralMetrics())
  .group("/:application", (app) =>
    app
      .use(auth)
      .guard({ params: t.Object({ application: t.Numeric() }) })
      .get("/", ({ params, user }) =>
        MetricsService.getApplicationMetrics(params.application, user.id),
      )
      .get("/total", ({ params, user }) =>
        MetricsService.getTotalMetrics(params.application, user.id),
      ),
  );
