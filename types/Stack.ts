import { BaseModel } from "./BaseModel"

export interface Stack extends BaseModel {
  name: string
  icon: string
  color: string
}

export interface StackCreateInput {
  name: string
  icon: string
  color: string
}

export interface StackUpdateInput {
  name?: string
  icon?: string
  color?: string
}

export interface StackWhereInput {
  id?: string
  name?: string
  icon?: string
  color?: string
}

export interface StackOrderByInput {
  id?: 'asc' | 'desc'
  name?: 'asc' | 'desc'
  icon?: 'asc' | 'desc'
  color?: 'asc' | 'desc'
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  error?: string
}