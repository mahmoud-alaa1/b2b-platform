import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside

const PROTECTED_ROUTES = ['/dashboard', '/profile'];
const AUTH_ROUTES = ['/login', '/register']

export async function middleware(request: NextRequest) {


    const isProtectedRoute = PROTECTED_ROUTES.some(route => request.nextUrl.pathname.startsWith(route));
    const token = request.cookies.get('token')?.value;
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    if (AUTH_ROUTES.some(route => request.nextUrl.pathname.startsWith(route)) && token) {
        return NextResponse.redirect(new URL('/', request.url));
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
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}