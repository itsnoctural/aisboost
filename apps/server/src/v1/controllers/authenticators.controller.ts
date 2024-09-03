import { Elysia, t } from "elysia";
import * as AuthenticatorsService from "../services/authenticators.service";

export const AuthenticatorsController = new Elysia({
  prefix: "/authenticators",
}).get(
  "/:application/redeem",
  ({ params, query }) =>
    AuthenticatorsService.redeem(params.application, query.hwid, query.key),
  {
    params: t.Object({ application: t.Numeric() }),
    query: t.Object({ hwid: t.String(), key: t.String() }),
  },
);
