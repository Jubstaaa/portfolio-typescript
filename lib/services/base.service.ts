import type { PrismaClient } from "@prisma/client";
import { prisma } from "../prisma";

// Base delegate type for Prisma models
type PrismaModelDelegate<
  T,
  WhereInput,
  OrderByInput,
  IncludeInput = undefined
> = {
  findMany: (params?: {
    skip?: number;
    take?: number;
    where?: WhereInput;
    orderBy?: OrderByInput;
    include?: IncludeInput;
  }) => Promise<T[]>;

  findUnique: (params: {
    where: { id: string };
    include?: IncludeInput;
  }) => Promise<T | null>;

  create: (params: {
    data: Omit<T, "id">;
    include?: IncludeInput;
  }) => Promise<T>;

  update: (params: {
    where: { id: string };
    data: Partial<Omit<T, "id">>;
    include?: IncludeInput;
  }) => Promise<T>;

  delete: (params: {
    where: { id: string };
    include?: IncludeInput;
  }) => Promise<T>;
};

export class BaseService<
  T,
  WhereInput,
  OrderByInput,
  IncludeInput = undefined,
  ViewModel = T
> {
  protected prisma: PrismaClient;
  protected model: PrismaModelDelegate<
    T,
    WhereInput,
    OrderByInput,
    IncludeInput
  >;
  protected mapper?: (data: T) => ViewModel;

  constructor(
    model: PrismaModelDelegate<T, WhereInput, OrderByInput, IncludeInput>,
    mapper?: (data: T) => ViewModel
  ) {
    this.prisma = prisma;
    this.model = model;
    this.mapper = mapper;
  }

  private mapData(data: T): ViewModel {
    return this.mapper ? this.mapper(data) : (data as unknown as ViewModel);
  }

  async findMany(params?: {
    skip?: number;
    take?: number;
    where?: WhereInput;
    orderBy?: OrderByInput;
    include?: IncludeInput;
  }): Promise<ViewModel[]> {
    try {
      const data = await this.model.findMany(params);
      return data.map((item) => this.mapData(item));
    } catch (error) {
      console.error(`Error in findMany for model:`, error);
      throw error;
    }
  }

  async findUnique(params: {
    where: { id: string };
    include?: IncludeInput;
  }): Promise<ViewModel | null> {
    const data = await this.model.findUnique(params);
    return data ? this.mapData(data) : null;
  }

  async create(
    data: Omit<T, "id">,
    include?: IncludeInput
  ): Promise<ViewModel> {
    const created = await this.model.create({ data, include });
    return this.mapData(created);
  }

  async update(params: {
    where: { id: string };
    data: Partial<Omit<T, "id">>;
    include?: IncludeInput;
  }): Promise<ViewModel> {
    const updated = await this.model.update(params);
    return this.mapData(updated);
  }

  async delete(params: {
    where: { id: string };
    include?: IncludeInput;
  }): Promise<ViewModel> {
    const deleted = await this.model.delete(params);
    return this.mapData(deleted);
  }
}
