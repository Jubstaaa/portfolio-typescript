export interface GetProjectCategory {
  id: string;
  name: string;
}

export interface ProjectCategoryCreateInput {
  url: string;
}

export interface ProjectCategoryUpdateInput {
  url: string;
}

export interface ProjectCategoryWhereInput {
  id?: string;
  url: string;
}

export interface ProjectCategoryOrderByInput {
  url: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
