import { prisma } from "@aisboost/db";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { GitHub, Google } from "arctic";
import { Lucia } from "lucia";

const adapter = new PrismaAdapter(prisma.identity, prisma.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "aisboost.auth",
    attributes: {
      secure: Bun.env.NODE_ENV === "production",
      domain:
        Bun.env.NODE_ENV === "production" ? Bun.env.AUTH_DOMAIN : "localhost",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    UserId: number;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
}

export const github = new GitHub(
  Bun.env.GITHUB_CLIENT_ID,
  Bun.env.GITHUB_CLIENT_SECRET,
  { redirectURI: Bun.env.GITHUB_REDIRECT_URI },
);

export const google = new Google(
  Bun.env.GOOGLE_CLIENT_ID,
  Bun.env.GOOGLE_CLIENT_SECRET,
  Bun.env.GOOGLE_REDIRECT_URI,
);
