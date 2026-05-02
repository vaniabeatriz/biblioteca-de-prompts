import { NextResponse } from "next/server";

export interface ApiError {
  code: string;
  message: string;
  fieldErrors?: Record<string, string>;
}

export function jsonOk<T>(body: T, status = 200) {
  return NextResponse.json(body, { status });
}

export function jsonError(error: ApiError, status = 400) {
  return NextResponse.json(error, { status });
}
