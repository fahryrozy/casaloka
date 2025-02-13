import NextAuth from "next-auth";
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
      //   name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        user_type: { label: "User Type", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          console.log("📩 Received credentials:", credentials);
          const { username, password } = credentials;
          const response = await submitLogin({
            username,
            user_type: "",
            password,
          });
          console.log("Login successful:", response);

          console.log("📡 API Response Status:", response.status);

          if (response.status !== 200) {
            throw new Error(`API error: ${response.message}`);
          }

          const user = response.data;
          console.log("👤 User from API:", user);

          if (!user.token) {
            throw new Error("Token not received");
          }

          // Return user data with token
          return {
            id: user.log_number, // You can use log_number as the user ID
            token: user.token,
            email: user.email,
            name: `${user.first_name} ${user.last_name}`.trim(),
          };
        } catch (error) {
          console.error("🚨 Login error:", error);
          return null; // Return `null` instead of throwing to prevent NextAuth from failing completely
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.token; // Store JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.token = token.accessToken; // Store JWT in session
      }
      return session;
    },
  },
});
