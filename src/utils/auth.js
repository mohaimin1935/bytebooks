import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./connect";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      profile(profile) {
        const userProfile = {
          id: profile.sub,
          email: profile.email,
          image: profile.picture,
          name: profile.name,
          role: profile.role ?? "reader",
        };
        return userProfile;
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const foundUser = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!foundUser || !foundUser?.hashedPassword) {
          throw new Error("No user found");
        }

        const credHash = await bcrypt.hash(credentials.password, 10);
        console.log(credentials.password, credHash, foundUser.hashedPassword);

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          foundUser.hashedPassword
        );
        console.log("pass:"+credentials.password);
        console.log("hash:"+foundUser.hashedPassword);
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return foundUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user?.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token?.role;
        session.user.id = token?.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
};

export const getAuthSession = () => getServerSession(authOptions);
