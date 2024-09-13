import { prisma } from "@aisboost/db";
import { nanoid } from "../lib/nanoid";
import * as MetricsService from "./metrics.service";
import * as WebhookService from "./webhook.service";

export async function whitelist(
  application: {
    id: number;
    keyPrefix: string;
    keyLength: number;
    duration: number;
  },
  sessionId: string,
  webhook: { url: string | null; content: string | null },
  hwid: string,
) {
  const key = `${application.keyPrefix}_${nanoid(application.keyLength)}`;
  const expire = new Date(
    new Date().getTime() + application.duration * 3600000,
  );

  if (webhook.url && webhook.content) {
    WebhookService.send(webhook.url, webhook.content, {
      key,
      hwid,
      expiresAt: expire,
    });
  }
  MetricsService.updateApplicationMetrics(application.id, "generated");

  return await prisma.key.create({
    data: {
      id: key,
      sessionId,
      expiresAt: expire.toISOString(),
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
