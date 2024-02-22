import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization:
        "https://www.facebook.com/v11.0/dialog/oauth?client_id=2058177371209814&config_id=932801108430824&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Ffacebook&state=NbgoptpJDEDmA3ZELtX7sm5Nyiegv1oxCxKM3hUAX0Q",
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
