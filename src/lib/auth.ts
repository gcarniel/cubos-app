import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { routesMap } from '@/routes'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password,
              confirmPassword: password,
            }),
          },
        )
        const data = await res.json()

        if (res.ok && data.token) {
          return { ...data.user, accessToken: data.token }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ trigger, session, token, user }) {
      if (trigger === 'update' && session) {
        token.name = session.name
      }

      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.accessToken = user.accessToken
      }

      return token
    },
    async session({ session, token }) {
      const user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
      }

      return {
        ...session,
        user: {
          ...session.user,
          ...user,
        },
        accessToken: token.accessToken as string,
      }
    },
  },
  pages: {
    signIn: routesMap.login,
    signOut: routesMap.login,
    newUser: routesMap.register,
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days,
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days,
  },
})

declare module 'next-auth' {
  interface User {
    accessToken?: string
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}
