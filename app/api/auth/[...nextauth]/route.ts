import NextAuth, { NextAuthOptions } from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        email: { label: 'Password', type: 'password' },
        password: { label: 'Email', type: 'email' }
      },
      async authorize (credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user?.findUnique({
          where: {
            email: credentials?.email
          }
        })

        if (!user) {
          return null
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password!
        )

        if (!isPasswordMatch) {
          return null
        }

        return user
      }
    })
  ],
  // callbacks: {
  //   async jwt ({ token }) {
  //     return token
  //   },
  //   async session ({ session }) {
  //     return session
  //   }
  // },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
}

const authHandler = NextAuth(authOptions)

export { authHandler as GET, authHandler as POST }
