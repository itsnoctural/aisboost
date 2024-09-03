import { prisma } from "@aisboost/db";
import { error } from "elysia";
import * as ApplicationsService from "./applications.service";

export interface ITemplate {
  type: string;
  apiKey: string;
  apiUrl: string;
}

export const select = {
  id: true,
  type: true,
  createdAt: true,
  applicationId: true,
};

export async function findAll(applicationId: number, userId: number) {
  await ApplicationsService.getById(applicationId, userId);

  return await prisma.template.findMany({
    where: { application: { id: applicationId, userId } },
    select,
  });
}

export async function findById(id: number, userId?: number) {
  return await prisma.template.findUnique({
    where: {
      id,
      application: { userId },
    },
  });
}

export async function getById(id: number, userId?: number) {
  const template = await findById(id, userId);

  if (!template) throw error(404);

  return template;
}

export async function create(
  userId: number,
  applicationId: number,
  data: ITemplate,
) {
  await ApplicationsService.getById(applicationId, userId);

  return await prisma.template.create({
    data: {
      ...data,
      applicationId,
    },
    select,
  });
}

export async function updateById(
  userId: number,
  applicationId: number,
  id: number,
  data: ITemplate,
) {
  try {
    return await prisma.template.update({
      where: {
        id,
        applicationId,
        application: { userId },
      },
      data,
      select,
    });
  } catch {
    throw error(404);
  }
}

export async function deleteById(
  userId: number,
  applicationId: number,
  id: number,
) {
  try {
    return await prisma.template.delete({
      where: { id, applicationId, application: { userId } },
      select,
    });
  } catch {
    throw error(404);
  }
}
