import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type UserRole } from "@prisma/client";
import { type Adapter } from "next-auth/adapters";
import { loginSchema } from "@/schemas/auth-schemas";
import { db } from "@/server/db";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        role: token.role,
      },
    }),
  },
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
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
};

export const getServerAuthSession = () => getServerSession(authOptions);
