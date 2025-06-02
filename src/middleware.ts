import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const privatePaths = ["/profile"]
const authPaths = ["/login", "/register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get("sessionToken")?.value

  const isPrivateRoute = privatePaths.some((path) => pathname.startsWith(path))
  const isAuthRoute = authPaths.some((path) => pathname.startsWith(path))

  if (isPrivateRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthRoute && sessionToken) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}
export const config = {
  matcher: ["/profile", "/login", "/register"]
}
