import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Dynamically import to avoid module-level DB connection at build time
        const { getDb } = await import("@/lib/db")
        const { users } = await import("@/lib/db/schema")
        const { eq } = await import("drizzle-orm")
        const bcrypt = await import("bcryptjs")

        const db = getDb()
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string))
          .limit(1)

        if (!user || !user.passwordHash) return null

        const valid = await bcrypt.compare(credentials.password as string, user.passwordHash)
        if (!valid) return null

        return { id: user.id, email: user.email, name: user.name, image: user.image }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // For Google OAuth, create user in DB if not exists
      if (account?.provider === "google" && user.email) {
        const { getDb } = await import("@/lib/db")
        const { users, organizations, organizationMembers } = await import("@/lib/db/schema")
        const { eq } = await import("drizzle-orm")

        const db = getDb()
        const [existing] = await db.select().from(users).where(eq(users.email, user.email)).limit(1)

        if (!existing) {
          const userId = crypto.randomUUID()
          await db.insert(users).values({
            id: userId,
            email: user.email,
            name: user.name,
            image: user.image,
            emailVerified: new Date(),
          })

          const orgName = `${user.name || user.email}'s Store`
          const orgId = crypto.randomUUID()
          await db.insert(organizations).values({
            id: orgId,
            name: orgName,
            slug: orgId.slice(0, 8),
            ownerId: userId,
            plan: "free",
            competitorLimit: 2,
            productLimit: 20,
            alertLimit: 5,
          })
          await db.insert(organizationMembers).values({
            organizationId: orgId,
            userId,
            role: "owner",
          })
          user.id = userId
        } else {
          user.id = existing.id
        }
      }
      return true
    },
    jwt({ token, user }) {
      if (user?.id) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (token.id) session.user.id = token.id as string
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    newUser: "/onboarding",
  },
})
