import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { routesMap } from '@/routes'
import { TOKEN_EXPIRATION_IN_DAY } from './constants'

type CustomUser = {
  id: string
  name: string
  email: string
  imageUrl: string | null
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      authorize: async (credentials) => {
        // TODO: implementar autenticação

        return {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          imageUrl: null,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ trigger, session, token, user }) {
      if (trigger === 'update' && session) {
        token.image = session.image
        token.name = session.name
      }

      if (user) {
        const customUser = user as {
          id: string
          name: string
          email: string
          imageUrl: string | null
        } as CustomUser

        token.id = customUser.id
        token.name = customUser.name
        token.email = customUser.email
        token.image = customUser.imageUrl
      }

      return token
    },
    async session({ session, token }) {
      const user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        image: token.image as string | null,
      }

      return {
        ...session,
        user: {
          ...session.user,
          ...user,
        },
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
    maxAge: Number(TOKEN_EXPIRATION_IN_DAY),
  },
  jwt: {
    maxAge: Number(TOKEN_EXPIRATION_IN_DAY),
  },
})

declare module 'next-auth' {
  interface Session {
    error?: 'RefreshTokenError'
  }
}

// declare module 'next-auth' {
//   /**
//    * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       id: string
//       name: string
//       email: string
//       imageUrl: string | null
//     } & DefaultSession['user']
//   }
// }
