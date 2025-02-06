import { Stack, Prisma } from "@prisma/client";
import { BaseService } from "./base.service";
import { prisma } from "../prisma";

export class StackService extends BaseService<
  Stack,
  Prisma.StackWhereInput,
  Prisma.StackOrderByWithRelationInput
> {
  constructor() {
    super(prisma.stack);
  }
}
