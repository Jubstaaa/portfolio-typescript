import { BaseModel } from "./BaseModel";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Skill } from "./Skill";

export interface User extends BaseModel {
  name: string;
  email: string;
  bio: string;
  title: string;
  location: string;
  image?: string | null;
  isAvailable: boolean;
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
}

export interface UserCreateInput {
  url: string;
}

export interface UserUpdateInput {
  url: string;
}

export interface UserWhereInput {
  id?: string;
  url: string;
}

export interface UserOrderByInput {
  url: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
