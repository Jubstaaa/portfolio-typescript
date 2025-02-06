import { NextResponse } from 'next/server'

export class ApiResponse {
  static success<T>(data: T, status = 200) {
    return NextResponse.json<{data: T, success: true}>({
      data,
      success: true
    }, { status })
  }

  static error(message: string, status = 500) {
    return NextResponse.json<{error: string, success: false}>({
      error: message,
      success: false
    }, { status })
  }
}
