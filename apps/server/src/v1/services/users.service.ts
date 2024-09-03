import { prisma } from "@aisboost/db";

export async function findOrCreate(
  providerId: string,
  provider: string,
  email: string,
) {
  const user = await prisma.user.findUnique({ where: { providerId } });

  if (!user)
    return await prisma.user.create({
      data: { providerId, provider, email },
    });

  return user;
}
