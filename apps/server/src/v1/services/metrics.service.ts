import { prisma } from "@aisboost/db";
import * as ApplicationsService from "./applications.service";

async function getTodayMidnight() {
  return new Date(new Date().setUTCHours(0, 0, 0, 0));
}

async function getMidnight(startDate: Date, days: number) {
  return new Date(new Date(+startDate - 8.64e7 * days).setUTCHours(0, 0, 0, 0));
}

export async function getGeneralMetrics() {
  const { _sum } = await prisma.metrics.aggregate({
    _sum: {
      checkpoints: true,
    },
  });
  const applications = await prisma.application.count();
  const users = await prisma.user.count();

  return {
    checkpoints: _sum.checkpoints || 0,
    applications,
    users,
  };
}

export async function getTotalMetrics(applicationId: number, userId: number) {
  await ApplicationsService.getById(applicationId, userId);

  const { _sum } = await prisma.metrics.aggregate({
    where: { applicationId, application: { userId } },
    _sum: {
      generated: true,
      checkpoints: true,
      verified: true,
      rejected: true,
    },
  });

  return _sum;
}

export async function getApplicationMetrics(
  applicationId: number,
  userId: number,
) {
  await ApplicationsService.getById(applicationId, userId);

  const metrics = await prisma.metrics.findMany({
    where: { applicationId },
    select: {
      date: true,
      generated: true,
      checkpoints: true,
      verified: true,
      rejected: true,
    },
  });

  for (let i = 0; i < 31; i++) {
    const midnight = await getMidnight(new Date(), i);

    if (!metrics.find(({ date }) => +date === +midnight)) {
      metrics.push({
        date: midnight,
        generated: 0,
        checkpoints: 0,
        verified: 0,
        rejected: 0,
      });
    }
  }

  metrics.sort((a, b) => {
    return +a.date - +b.date;
  });

  return metrics;
}

async function findMetrics(applicationId: number, date: Date) {
  return await prisma.metrics.findFirst({
    where: {
      applicationId,
      date,
    },
  });
}

export async function updateApplicationMetrics(
  applicationId: number,
  type: "generated" | "checkpoints" | "verified" | "rejected",
) {
  await ApplicationsService.getById(applicationId);

  const date = await getTodayMidnight();
  const metrics = await findMetrics(applicationId, date);
  if (metrics) {
    return await prisma.metrics.update({
      where: {
        id: metrics.id,
      },
      data: {
        [type]: { increment: 1 },
      },
    });
  }

  return await prisma.metrics.create({
    data: {
      applicationId,
      date,
      [type]: 1,
    },
  });
}
