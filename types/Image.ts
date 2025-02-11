export interface Image {
  id: string;
  url: string;
}

export interface ImageCreateInput {
  url: string;
}

export interface ImageUpdateInput {
  url: string;
}

export interface ImageWhereInput {
  id?: string;
  url: string;
}

export interface ImageOrderByInput {
  url: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}
