import { prisma } from "@aisboost/db";
import { error } from "elysia";
import { select as templates } from "./templates.service";

interface IApplication {
  name: string;
  duration: number;
  checkpoints: number;
  keyPrefix: string;
  keyLength: number;
}

const select = {
  id: true,
  name: true,

  duration: true,
  checkpoints: true,
  keyPrefix: true,
  keyLength: true,
};

export async function findAll(userId: number) {
  return await prisma.application.findMany({
    where: { userId },
    select,
  });
}

export async function findByIdWithTemplates(id: number) {
  return await prisma.application.findUnique({
    where: { id },
    select: {
      ...select,
      templates: {
        select: templates,
      },
    },
  });
}

export async function getById(id: number, userId?: number) {
  const app = await prisma.application.findUnique({
    where: { id, userId },
    select: {
      ...select,
      webhook: true,
      webhookContent: true,
    },
  });

  if (!app) throw error(404);

  return app;
}

export async function create(userId: number, data: IApplication) {
  return await prisma.application.create({
    data: { ...data, userId },
    select,
  });
}

export async function updateById(
  userId: number,
  id: number,
  data: IApplication,
) {
  try {
    return await prisma.application.update({
      where: { id, userId },
      data,
      select,
    });
  } catch {
    throw error(404);
  }
}

export async function deleteById(userId: number, id: number) {
  try {
    return await prisma.application.delete({
      where: { id, userId },
      select,
    });
  } catch {
    throw error(404);
  }
}
