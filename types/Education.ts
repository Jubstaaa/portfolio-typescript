import { BaseModel } from "./BaseModel";

export interface Education extends BaseModel {
  name: string;
  department: string;
  location: string;
  startDate: Date;
  endDate: Date;
  description?: string | null;
  logo?: string | null;
}

export interface EducationCreateInput {
  url: string;
}

export interface EducationUpdateInput {
  url: string;
}

export interface EducationWhereInput {
  id?: string;
  url: string;
}

export interface EducationOrderByInput {
  url: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
