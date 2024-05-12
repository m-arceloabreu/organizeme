import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {

    if (request.nextUrl.pathname.startsWith('/admin') &&
        request.nextauth.token?.role !== "ADMIN") {

      return NextResponse.rewrite(new URL('/denied', request.url));
    }

    if(request.nextUrl.pathname.startsWith('/user') &&
       request.nextauth.token?.role !== "ADMIN" &&
       request.nextauth.token?.role !== "USER"){
      
        return NextResponse.rewrite(new URL('/denied', request.url))
       }
    if(request.nextUrl.pathname.startsWith('/user') &&
       !request.nextauth.token){
        return NextResponse.rewrite(new URL('/denied', request.url))
       }

  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  } 
);
export const config = { matcher: ['/dashboard', '/profile', '/account'] };
