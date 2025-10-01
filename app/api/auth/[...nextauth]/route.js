import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { slugify } from  "../../../utils"

const prisma = new PrismaClient()

export const { handlers: { GET, POST }, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Runs once when user signs in
      if (user) {
        token.slug = slugify(user.name || user.email)
      }
      return token
    },
    async session({ session, token }) {
      // Make slug available in client session
      if (session.user) {
        session.user.slug = token.slug
      }
      return session
    },
  },
})
