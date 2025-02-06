import { BaseModel } from "./BaseModel";

export interface Skill extends BaseModel {
  name: string;
}

export interface SkillCreateInput {
  url: string;
}

export interface SkillUpdateInput {
  url: string;
}

export interface SkillWhereInput {
  id?: string;
  url: string;
}

export interface SkillOrderByInput {
  url: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
