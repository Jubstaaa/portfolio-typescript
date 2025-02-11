import { User, Prisma } from "@prisma/client";
import {
  User as PrismaUser,
  Prisma,
  Skill,
  Education,
  Experience,
} from "@prisma/client";
import { BaseService } from "./base.service";
import { prisma } from "../prisma";
import { GetUser, User } from "@/types/User";
import { GetEducation } from "@/types/Education";
type UserWithRelations = PrismaUser & {
  skills?: Skill[];
  experiences?: Experience[];
  educations?: GetEducation[];
};

const userMapper = (user: UserWithRelations): GetUser => ({
  ...user,
  name: user.firstName + " " + user.lastName,
  skills: user.skills || [],
  experiences: user.experiences || [],
  educations: user.educations || [],
});

export class UserService extends BaseService<
  User,
  Prisma.UserWhereInput,
  Prisma.UserOrderByWithRelationInput,
  Prisma.UserWhereUniqueInput,
  Prisma.UserInclude,
  Prisma.UserSelect,
  GetUser
> {
  constructor() {
    super(prisma.user, userMapper);
  }

  async findMany() {
    try {
      const data = await this.model.findMany({
        select: {
          firstName: true,
          lastName: true,
          experiences: true,
          skills: true,
          image: true,
          location: true,
          educations: true,
          title: true,
          bio: true,
        },
      });
      return data.map((item) => userMapper(item));
    } catch (error) {
      console.error(`Error in findMany for model:`, error);
      throw error;
    }
  }
}
