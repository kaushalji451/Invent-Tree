import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req) {
  const url = req.nextUrl;
  let token;
  try {
    token = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: req.headers.get("x-forwarded-proto") === "https",
    });
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
  if (
    !token &&
    url.pathname.startsWith("/admin") &&
    url.pathname !== "/admin/login"
  ) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  } else if (token && url.pathname.startsWith("/admin/login")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
}

export const config = {
  matcher: ["/login", "/signup", "/", "/admin/:path*"],
};
