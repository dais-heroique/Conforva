import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { getDb } from "@/lib/db"
import { users, organizations, organizationMembers, sentEmails } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { sendEmail } from "@/lib/email/send"
import { welcomeEmail } from "@/lib/email/templates"

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

        try {
          const db = getDb()
          const [user] = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email as string))
            .limit(1)

          if (!user) {
            console.error("[auth][authorize] user not found:", credentials.email)
            return null
          }
          if (!user.passwordHash) {
            console.error("[auth][authorize] no password hash for:", credentials.email)
            return null
          }

          const valid = await bcrypt.compare(credentials.password as string, user.passwordHash)
          if (!valid) {
            console.error("[auth][authorize] wrong password for:", credentials.email)
            return null
          }

          return { id: user.id, email: user.email, name: user.name, image: user.image }
        } catch (err) {
          console.error("[auth][authorize] exception:", err)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        try {
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

            const orgId = crypto.randomUUID()
            await db.insert(organizations).values({
              id: orgId,
              name: `${user.name || user.email}'s Store`,
              slug: orgId.slice(0, 8),
              ownerId: userId,
              plan: "free",
              competitorLimit: 2,
              productLimit: 20,
              alertLimit: 5,
            })
            await db.insert(organizationMembers).values({
              id: crypto.randomUUID(),
              organizationId: orgId,
              userId,
              role: "owner",
            })

            try {
              const { subject, html, text } = welcomeEmail((user.name || user.email).split(" ")[0])
              await sendEmail({ to: user.email, subject, html, text })
              await db.insert(sentEmails).values({ userId, emailType: "welcome" }).onConflictDoNothing()
            } catch (err) {
              console.error("[auth][signIn/google] welcome email failed:", err)
            }

            user.id = userId
          } else {
            user.id = existing.id
          }
        } catch (err) {
          console.error("[auth][signIn/google]", err)
          return false
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
