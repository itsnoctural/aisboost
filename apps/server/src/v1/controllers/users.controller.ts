import { Elysia } from "elysia";
import { auth } from "../plugins/auth";

export const UsersController = new Elysia({ prefix: "/users" })
  .use(auth)
  .get("/@me", ({ user }) => user);
