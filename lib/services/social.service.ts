import { Social, Prisma } from "@prisma/client";
import { BaseService } from "./base.service";
import { prisma } from "../prisma";

export class SocialService extends BaseService<
  Social,
  Prisma.SocialWhereInput,
  Prisma.SocialOrderByWithRelationInput
> {
  constructor() {
    super(prisma.social);
  }
}
