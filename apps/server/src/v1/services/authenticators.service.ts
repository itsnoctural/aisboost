import { prisma } from "@aisboost/db";
import { nanoid } from "../lib/nanoid";
import * as MetricsService from "./metrics.service";

export async function whitelist(
  applicationId: number,
  sessionId: string,
  prefix: string,
  length: number,
  duration: number,
) {
  const key = `${prefix}_${nanoid(length)}`;

  MetricsService.updateApplicationMetrics(applicationId, "generated");

  return await prisma.key.create({
    data: {
      id: key,
      sessionId,
      expiresAt: new Date(
        new Date().getTime() + duration * 3600000,
      ).toISOString(),
    },
  });
}

export async function redeem(applicationId: number, hwid: string, id: string) {
  const key = await prisma.key.findUnique({
    where: {
      id,
      session: { hwid, applicationId },
      expiresAt: { gte: new Date() },
    },
  });

  MetricsService.updateApplicationMetrics(
    applicationId,
    key ? "verified" : "rejected",
  );

  return {
    valid: !!key,
  };
}
