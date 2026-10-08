import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si intenta entrar a cualquier ruta que empiece por /admin
  if (pathname.startsWith('/admin')) {
    // Buscamos la cookie de sesión
    const sessionCookie = request.cookies.get('admin_session');

    // Si NO existe la cookie, redirigimos inmediatamente al login
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Configuración global para que se aplique a toda la aplicación
export const config = {
  matcher: '/admin/:path*',
};