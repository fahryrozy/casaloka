import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
  ],
  debug: true,
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET ?? "",
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Do NOT include accessToken in the session to keep it secure
      return session;
    },
  },
};

// Export NextAuth handlers
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);

// Custom Error for Invalid Credentials
class InvalidLoginError extends CredentialsSignin {
  code: string;
  constructor(message?: string) {
    super(message || "Invalid credentials");
    this.code = message || "Invalid credentials";
    Object.setPrototypeOf(this, InvalidLoginError.prototype);
  }
}
