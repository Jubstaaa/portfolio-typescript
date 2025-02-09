import { Stack, Prisma } from "@prisma/client";
import { BaseService } from "./base.service";
import { prisma } from "../prisma";

export class StackService extends BaseService<
  Stack,
  Prisma.StackWhereInput,
  Prisma.StackOrderByWithRelationInput,
  Prisma.StackWhereUniqueInput
> {
  constructor() {
    super(prisma.stack);
  }
}
