import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // 1️⃣ Check for NextAuth session (Google/Facebook logins)
  const nextAuthToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 2️⃣ Check if Custom JWT exists in cookies
  const jwtToken = req.cookies.get("token")?.value;

  // 3️⃣ Redirect if neither token is present
  if (!nextAuthToken && !jwtToken && url.pathname.startsWith("/product/")) {
    if (!url.searchParams.has("nl")) {
      url.searchParams.set("nl", "true");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// 🔒 Protect these routes
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/product/:path*"],
};
