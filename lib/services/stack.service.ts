import { Stack, Prisma } from "@prisma/client";
import { BaseService } from "./base.service";
import { prisma } from "../prisma";
import { GetStack } from "@/types/Stack";

export class StackService extends BaseService<
  Stack,
  Prisma.StackWhereInput,
  Prisma.StackOrderByWithRelationInput,
  Prisma.StackWhereUniqueInput,
  undefined,
  GetStack
> {
  constructor() {
    super(prisma.stack);
  }
}
