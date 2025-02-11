import { GetEducation } from "./Education";
import { GetExperience } from "./Experience";
import { GetSkill } from "./Skill";

export interface GetUser {
  id: string;
  name: string;
  email: string;
  bio: string;
  title: string;
  location: string;
  image?: string | null;
  isAvailable: boolean;
  skills: GetSkill[];
  experiences: GetExperience[];
  educations: GetEducation[];
}
