import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
  }

  return NextResponse.next(); // Allow access
}

// Protect specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Protect these routes
};
