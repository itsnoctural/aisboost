import { prisma } from "@aisboost/db";
import * as ApplicationsService from "./applications.service";

const select = {
  id: true,
  expiresAt: true,
  session: { select: { hwid: true } },
};

export async function getAll(applicationId: number, userId: number) {
  await ApplicationsService.getById(applicationId, userId);

  const keys = await prisma.key.findMany({
    where: { session: { applicationId } },
    select,
  });

  return keys.map((key) => ({
    id: key.id,
    expiresAt: key.expiresAt,
    hwid: key.session.hwid,
  }));
}
