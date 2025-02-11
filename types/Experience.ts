export interface GetExperience {
  id: string;
  name: string;
  title: string;
  location: string;
  startDate: Date;
  endDate?: Date | null;
  description?: string | null;
  logo?: string | null;
}

export interface ExperienceCreateInput {
  url: string;
}

export interface ExperienceUpdateInput {
  url: string;
}

export interface ExperienceWhereInput {
  id?: string;
  url: string;
}

export interface ExperienceOrderByInput {
  url: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
