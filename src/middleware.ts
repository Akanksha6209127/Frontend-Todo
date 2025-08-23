import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // If not logged in, redirect to login page
  if (!token && request.nextUrl.pathname.startsWith("/api/todos")) {
    return NextResponse.redirect(new URL("/api/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/todo/:path*", "/todo" , "/lists/:path*", "/lists"], // Protect /todo and subroutes
};
