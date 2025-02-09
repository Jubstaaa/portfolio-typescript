import { Project, Prisma, ProjectCategory } from "@prisma/client";
import { BaseService } from "./base.service";
import { prisma } from "../prisma";

interface ProjectWithRelations extends Project {
  projectCategory: ProjectCategory;
}

const projectMapper = (project: Project): ProjectWithRelations => ({
  ...project,
  projectCategory: (project as ProjectWithRelations).projectCategory || null,
});

export class ProjectService extends BaseService<
  Project,
  Prisma.ProjectWhereInput,
  Prisma.ProjectOrderByWithRelationInput,
  Prisma.ProjectWhereUniqueInput,
  Prisma.ProjectInclude,
  ProjectWithRelations
> {
  constructor() {
    super(prisma.project, projectMapper);
  }
}
