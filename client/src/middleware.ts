import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/main', '/survey', '/surveyStatistics', '/profile'];
const authRoutes = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  const token = request.cookies.get('accessToken')?.value;

  if (!token && isProtectedRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/main/:path*',
    '/survey/:path*',
    '/surveyStatistics/:path*',
    '/auth/:path*',
  ],
};