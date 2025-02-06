import { Image, Prisma } from "@prisma/client";
import { BaseService } from "./base.service";
import { prisma } from "../prisma";

export class ImageService extends BaseService<
  Image,
  Prisma.ImageWhereInput,
  Prisma.ImageOrderByWithRelationInput
> {
  constructor() {
    super(prisma.image);
  }
}
