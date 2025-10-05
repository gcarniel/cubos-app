import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { routesMap } from './routes'

const publicRoutes = [
  {
    path: routesMap.login,
    whenAuthenticated: 'redirect',
  },
  {
    path: routesMap.register,
    whenAuthenticated: 'redirect',
  },
  {
    path: routesMap.forgot,
    whenAuthenticated: 'redirect',
  },
  {
    path: routesMap.recoverPassword,
    whenAuthenticated: 'redirect',
  },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = routesMap.login

export default async function auth(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find((route) => route.path === path)

  const authToken = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
    cookieName: 'authjs.session-token',
  })

  const redirectUrl = request.nextUrl.clone()

  if (
    authToken &&
    authToken.exp &&
    new Date(authToken.exp * 1000) < new Date()
  ) {
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }
  if (!authToken && !publicRoute) {
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE
    return NextResponse.redirect(redirectUrl)
  }

  if (
    authToken &&
    publicRoute &&
    publicRoute.whenAuthenticated === 'redirect'
  ) {
    redirectUrl.pathname = routesMap.root
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api/auth|api/whatsapp|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
  runtime: 'nodejs',
}
