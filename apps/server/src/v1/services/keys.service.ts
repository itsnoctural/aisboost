import { prisma } from "@aisboost/db";
import { nanoid } from "../lib/nanoid";
import * as ApplicationsService from "./applications.service";

const select = {
  id: true,
  expiresAt: true,
  session: { select: { hwid: true, applicationId: true } },
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
    applicationId: key.session.applicationId,
  }));
}

export async function create(
  applicationId: number,
  userId: number,
  hwid: string,
  duration: number,
) {
  const application = await ApplicationsService.getById(applicationId, userId);

  return await prisma.key.create({
    data: {
      id: `${application.keyPrefix}_${nanoid(application.keyLength)}`,
      expiresAt: new Date(
        new Date().getTime() + duration * 3600000,
      ).toISOString(),
      session: {
        create: {
          hwid,
          tk: "0",
          applicationId,
        },
      },
    },
  });
}
