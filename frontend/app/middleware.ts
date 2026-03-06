import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the token from the cookies
  const token = request.cookies.get('token')?.value;

  // If there's no token and the user is trying to access a protected route
  if (!token && request.nextUrl.pathname.startsWith('/app/admin')) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/app/admin/login', request.url));
  }

  // If there's a token and the user is trying to access login page
  if (token && request.nextUrl.pathname === '/app/admin/login') {
    // Redirect to admin dashboard
    return NextResponse.redirect(new URL('/app/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
