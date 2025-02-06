import type { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma";

// Base delegate type for Prisma models
type PrismaModelDelegate<T, WhereInput, OrderByInput> = {
  findMany: (params?: {
    skip?: number;
    take?: number;
    where?: WhereInput;
    orderBy?: OrderByInput;
  }) => Promise<T[]>;

  findUnique: (params: { where: { id: string } }) => Promise<T | null>;

  create: (params: { data: Omit<T, "id"> }) => Promise<T>;

  update: (params: {
    where: { id: string };
    data: Partial<Omit<T, "id">>;
  }) => Promise<T>;

  delete: (params: { where: { id: string } }) => Promise<T>;
};

export class BaseService<T, WhereInput, OrderByInput> {
  protected prisma: PrismaClient;
  protected model: PrismaModelDelegate<T, WhereInput, OrderByInput>;

  constructor(model: PrismaModelDelegate<T, WhereInput, OrderByInput>) {
    this.prisma = prisma;
    this.model = model;
  }

  async findMany(params?: {
    skip?: number;
    take?: number;
    where?: WhereInput;
    orderBy?: OrderByInput;
  }): Promise<T[]> {
    try {
      return await this.model.findMany(params);
    } catch (error) {
      console.error(`Error in findMany for model:`, error);
      throw error;
    }
  }

  async findUnique(where: { id: string }): Promise<T | null> {
    return this.model.findUnique({ where });
  }

  async create(data: Omit<T, "id">): Promise<T> {
    return this.model.create({ data });
  }

  async update(params: {
    where: { id: string };
    data: Partial<Omit<T, "id">>;
  }): Promise<T> {
    return this.model.update(params);
  }

  async delete(where: { id: string }): Promise<T> {
    return this.model.delete({ where });
  }
}
