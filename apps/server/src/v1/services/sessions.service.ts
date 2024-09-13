import { prisma } from "@aisboost/db";
import { error } from "elysia";
import { nanoid } from "../lib/nanoid";
import { platforms } from "../platforms";
import * as ApplicationsService from "./applications.service";
import * as AuthenticatorsService from "./authenticators.service";
import * as MetricsService from "./metrics.service";
import * as TemplatesService from "./templates.service";

const select = {
  id: true,
  createdAt: true,
  checkpoint: true,
};

export async function findSession(applicationId: number, hwid: string) {
  return await prisma.session.findFirst({
    where: { hwid, applicationId },
    include: { application: true, key: true },
  });
}

export async function getSession(
  applicationId: number,
  hwid: string,
  templateId?: number,
) {
  const session = await findSession(applicationId, hwid);
  if (!session) throw error(404);
  if (session.key) {
    if (+session.key.expiresAt <= +new Date()) {
      await prisma.session.delete({
        where: {
          id: session.id,
        },
      });
      throw error(404);
    }

    return { key: session.key };
  }

  if (templateId) {
    const template = await TemplatesService.getById(templateId);

    const platform = platforms[template.type];
    if (!platform) throw error(400);

    return {
      checkpoint: session.checkpoint,
      next: await platform(
        `${Bun.env.GATEWAY_URL}/a/${applicationId}?hwid=${hwid}&tk=${session.tk}`,
        template.apiKey,
        template.apiUrl,
      ),
    };
  }

  return {
    checkpoint: session.checkpoint,
  };
}

export async function processSession(
  applicationId: number,
  hwid: string,
  tk?: string,
) {
  const application = await ApplicationsService.getById(applicationId);

  const session = await findSession(applicationId, hwid);
  if (session) {
    if (session.key) return { key: session.key.id };
    if (session.tk !== tk) throw error(400);

    MetricsService.updateApplicationMetrics(
      session.applicationId,
      "checkpoints",
    );

    if (session.checkpoint < session.application.checkpoints) {
      return await prisma.session.update({
        where: { id: session.id },
        data: { tk: nanoid(4), checkpoint: { increment: 1 } },
        select,
      });
    }

    const key = await AuthenticatorsService.whitelist(
      application,
      session.id,
      { url: application.webhook, content: application.webhookContent },
      hwid,
    );

    return { key: key.id };
  }

  return await prisma.session.create({
    data: {
      applicationId,
      hwid,
      tk: nanoid(4),
    },
    select,
  });
}

export async function deleteByKey(
  applicationId: number,
  userId: number,
  id: string,
) {
  const session = await prisma.session.findFirst({
    where: {
      applicationId,
      application: { userId },
      key: { id },
    },
  });

  if (!session) throw error(404);

  return await prisma.session.delete({
    where: {
      id: session.id,
    },
  });
}
