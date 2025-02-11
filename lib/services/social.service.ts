import { Social, Prisma } from "@prisma/client";
import { BaseService } from "./base.service";
import { prisma } from "../prisma";
import { GetSocial } from "@/types/Social";

export class SocialService extends BaseService<
  Social,
  Prisma.SocialWhereInput,
  Prisma.SocialOrderByWithRelationInput,
  Prisma.SocialWhereUniqueInput,
  Prisma.Social,
  GetSocial
> {
  constructor() {
    super(prisma.social);
  }

  public toViewModel(social: Social): GetSocial {
    return social;
  }
}
