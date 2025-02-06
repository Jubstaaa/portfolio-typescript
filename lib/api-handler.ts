import { NextRequest } from 'next/server'
import { ApiResponse } from './api-response'

type Handler = (req: NextRequest) => Promise<Response>

export function createHandler(handler: Handler): Handler {
  return async (req: NextRequest) => {
    try {
      return await handler(req)
    } catch (error) {
      console.error(error)
      return ApiResponse.error(
        error instanceof Error ? error.message : 'Internal server error'
      )
    }
  }
}