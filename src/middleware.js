import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(req) {
  const url = req.nextUrl;

  let token;
  try {
    token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: req.headers.get("x-forwarded-proto") === "https",
    });
  } catch (error) {
    console.error("Error retrieving token:", error);
  }

  if (
    !token &&
    url.pathname.startsWith("/en/admin") &&
    url.pathname !== "/en/admin/login"
  ) {
    console.log(true)
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (token && url.pathname.startsWith("/en/admin/login")) {
    return NextResponse.redirect(new URL("/en/admin/dashboard", req.url));
  }

  return intlMiddleware(req);
}
export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/login",
    "/signup",
    "/admin/:path*",
  ],
};
