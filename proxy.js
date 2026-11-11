import { NextResponse } from 'next/server';
// Note: We cannot import constants directly if they are outside of the Edge runtime context
// but since config/roles.js is a simple constants file, it usually works.
// However, to be perfectly safe in Edge runtime, you can also define simple constants directly here.
import { ROLES } from './config/roles';

// Define the paths that are publicly accessible
const PUBLIC_PATHS = ['/login', '/register', '/forgot-password'];

export default function proxy(request) {
    const { pathname } = request.nextUrl;
    
    // 1. Let public paths bypass the middleware
    // Also ignore static files, _next, API routes if you don't want to protect them here
    if (
        PUBLIC_PATHS.some(path => pathname.startsWith(path)) || 
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // 2. Check for token in cookies
    const accessToken = request.cookies.get('accessToken')?.value;
    
    // If there's no token, redirect to login
    if (!accessToken) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(url);
    }

    // 3. Optional: Role-based route protection
    // Let's say you want to protect /admin/* so only SUPER_ADMIN can access it
    const userRole = request.cookies.get('userRole')?.value;

    if (pathname.startsWith('/admin') && userRole !== ROLES.SUPER_ADMIN && userRole !== ROLES.ORGANIZATION_ADMIN) {
        const url = request.nextUrl.clone();
        url.pathname = '/unauthorized'; // You can create an /unauthorized page
        return NextResponse.redirect(url);
    }

    // Allow request to proceed
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
