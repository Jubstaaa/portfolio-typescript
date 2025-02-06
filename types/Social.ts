import { BaseModel } from "./BaseModel";

export interface Social extends BaseModel {
  name: string;
  icon: string;
  color: string;
  url: string;
  username?: string | null;
}

export interface SocialCreateInput {
  name: string;
  icon: string;
  color: string;
}

export interface SocialUpdateInput {
  name?: string;
  icon?: string;
  color?: string;
}

export interface SocialWhereInput {
  id?: string;
  name?: string;
  icon?: string;
  color?: string;
}

export interface SocialOrderByInput {
  id?: "asc" | "desc";
  name?: "asc" | "desc";
  icon?: "asc" | "desc";
  color?: "asc" | "desc";
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
