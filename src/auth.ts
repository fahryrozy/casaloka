import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { submitLogin } from "./app/utils/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        user_type: { label: "User Type", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = credentials;
          console.log("📩 Sending login request with:", credentials);
          const response = await submitLogin({
            username,
            user_type: "",
            password,
          });

          if (!response || response.status !== 200) {
            console.log("🔴 Login error with not 200:", response);
            return null;
          }

          const user = response.data;

          if (!user.token) {
            throw new Error(user.response?.data?.message || "Login failed");
          }

          return {
            id: user.log_number,
            token: user.token,
            email: user.email,
            name: `${user.first_name} ${user.last_name}`.trim(),
          };
        } catch (error) {
          console.error("🚨 Login error this:", error.response?.data);

          throw new InvalidLoginError(error.response?.data?.message);
          // throw error;
          // throw new CustomAuthError(error.response?.data?.message);
          // throw new Error(error.response?.data?.message || "Login failed");
        }
      },
    }),
  ],
  debug: true,
  trustHost: true,

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.token = token.accessToken;
      }
      return session;
    },
  },
});

class InvalidLoginError extends CredentialsSignin {
  // code = "Invalid identifier or password";
  static code: string;

  constructor(message?: any) {
    super();

    this.code = message;
  }
}

import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super();

    this.type = message;
  }
}
