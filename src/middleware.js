import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(req) {
  const res = intlMiddleware(req); // Run i18n middleware first
  const url = req.nextUrl.clone(); // Clone to manipulate
  const locale = url.pathname.split("/")[1]; // e.g., 'en' from /en/admin

  // Remove locale from pathname to check clean path
  const pathWithoutLocale = url.pathname.replace(`/${locale}`, "");

  // Try getting session token
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

  // Define public admin paths (without hardcoding locale)
  const publicAdminPaths = ["/admin/login", "/admin/signup"];

  const isAdminPath = pathWithoutLocale.startsWith("/admin");
  const isPublicAdmin = publicAdminPaths.includes(pathWithoutLocale);

  if (isAdminPath) {
    if (!token && !isPublicAdmin) {
      url.pathname = `/${locale}/admin/login`;
      return NextResponse.redirect(url);
    }

    if (token && pathWithoutLocale === "/admin/login") {
      url.pathname = `/${locale}/admin/dashboard`;
      return NextResponse.redirect(url);
    }
  }

  // Return response from i18n middleware
  return res;
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/login",
    "/signup",
    "/admin/:path*",
  ],
};
