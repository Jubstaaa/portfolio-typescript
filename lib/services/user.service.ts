import { User, Prisma, Skill, Education, Experience } from "@prisma/client";
import { BaseService } from "./base.service";
import { prisma } from "../prisma";

interface UserWithRelations extends User {
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
}

const userMapper = (user: User): UserWithRelations => ({
  ...user,
  skills: (user as UserWithRelations).skills || [],
  experiences: (user as UserWithRelations).experiences || [],
  educations: (user as UserWithRelations).educations || [],
});

export class UserService extends BaseService<
  User,
  Prisma.UserWhereInput,
  Prisma.UserOrderByWithRelationInput,
  Prisma.UserInclude,
  UserWithRelations
> {
  constructor() {
    super(prisma.user, userMapper);
  }
}
