import { type DefaultSession, type NextAuthConfig } from "next-auth";
import { type UserRole } from "@prisma/client";
import { type Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/server/db";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { loginSchema } from "@/schemas/auth-schemas";

/** * @see https://next-auth.js.org/getting-started/typescript#module-augmentation */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

/** * @see https://next-auth.js.org/configuration/options */
export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);
        if (!success) {
          return null;
        }

        const user = await db.user.findUnique({ where: { email: data.email } });
        if (!user) {
          throw new Error("User not found.");
        }

        if (!user.hashedPassword) {
          return null;
        }

        const isMatch = bcrypt.compareSync(data.password, user.hashedPassword);
        if (!isMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        // id: token.id,
      },
    }),
  },
} satisfies NextAuthConfig;
