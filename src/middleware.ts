import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./lib/verifyToken";


const PROTECTED_ROUTES = ["/clients-dashboard", "/suppliers-dashboard"];
const AUTH_ROUTES = ["/login", "/register", "/forgot-password","/reset-password"];

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

function isAuthorizedRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const isProtected = isProtectedRoute(request.nextUrl.pathname);
  const token = request.cookies.get("token")?.value;
  const verifiedToken = await verifyToken(token);
  console.log("here\n");
  console.log(verifiedToken);
  if (isProtected && !verifiedToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (isAuthorizedRoute(request.nextUrl.pathname) && verifiedToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
