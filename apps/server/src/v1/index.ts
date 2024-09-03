import { Elysia } from "elysia";
import { ApplicationsController } from "./controllers/applications.controller";
import { AuthController } from "./controllers/auth.controller";
import { AuthenticatorsController } from "./controllers/authenticators.controller";
import { MetricsController } from "./controllers/metrics.controller";
import { PublicController } from "./controllers/public.controller";
import { SessionsController } from "./controllers/sessions.controller";
import { TemplatesController } from "./controllers/templates.controller";
import { UsersController } from "./controllers/users.controller";

export const api = new Elysia({ prefix: "/v1" })
  .use(AuthController)
  .use(UsersController)
  .use(ApplicationsController)
  .use(TemplatesController)
  .use(SessionsController)
  .use(AuthenticatorsController)
  .use(MetricsController)
  .use(PublicController);
