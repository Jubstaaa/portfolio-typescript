import { BaseModel } from "./BaseModel";
import { ProjectCategory } from "./ProjectCategory";

export interface Project extends BaseModel {
  name: string;
  description?: string | null;
  slug: string;
  content?: string | null;
  image?: string | null;
  projectCategory: ProjectCategory;
}

export interface ProjectCreateInput {
  url: string;
}

export interface ProjectUpdateInput {
  url: string;
}

export interface ProjectWhereInput {
  id?: string;
  slug?: string;
}

export interface ProjectOrderByInput {
  url: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
