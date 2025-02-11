import { Project, Prisma, ProjectCategory } from "@prisma/client";
import { BaseService } from "./base.service";
import { prisma } from "../prisma";
import { GetProject } from "@/types/Project";

type ProjectWithRelations = Project & {
  projectCategory: ProjectCategory;
};

const projectMapper = (project: ProjectWithRelations): GetProject => ({
  ...project,
  projectCategory: project.projectCategory || null,
});

export class ProjectService extends BaseService<
  Project,
  Prisma.ProjectWhereInput,
  Prisma.ProjectOrderByWithRelationInput,
  Prisma.ProjectWhereUniqueInput,
  Prisma.ProjectInclude,
  GetProject
> {
  constructor() {
    super(prisma.project, projectMapper);
  }
}
