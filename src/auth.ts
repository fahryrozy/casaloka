import NextAuth, { CredentialsSignin, NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { submitLogin } from "@/app/utils/api/services/authService";
import { ILoginRequest } from "./app/utils/api/interfaces/IAuth";

// Define JWT Type
interface AuthJWT extends JWT {
  id?: string;
  accessToken?: string;
}

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        user_type: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials || typeof credentials !== "object") {
          throw new InvalidLoginError("Invalid credentials format");
        }

        const { username, password } = credentials as ILoginRequest;

        if (!username || !password) {
          throw new InvalidLoginError("Username and password are required");
        }

        try {
          console.log("📩 Sending login request with:", credentials);
          const response = await submitLogin({
            username,
            password,
            user_type: "",
          });

          if (response.status !== 200) {
            console.log("🔴 Login error with non-200 status:", response);
            throw new InvalidLoginError("Login failed with non-200 status");
          }

          const user = response.data;
          console.log("🔑 Login response:", user);
          if (!user.token) {
            throw new InvalidLoginError(response.message || "Login failed");
          }

          return {
            id: user.log_number,
            token: user.token,
            email: user.email,
            name: `${user.first_name} ${user.last_name}`.trim(),
          };
        } catch (error: any) {
          console.error("🚨 Login error:", error?.response?.data);
          throw new InvalidLoginError(
            error?.response?.data?.message || "Invalid credentials"
          );
        }
      },
    }),
  ],
  debug: true,
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET ?? "",
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      console.log("🔑 JWT:", token);
      console.log("👤 User:", user);
      if (user) {
        token.id = user.id;
        // token.accessToken = (user as AuthUser).token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: AuthJWT }) {
      console.log("🔑 Session:", session);
      console.log("👤 Token:", token);
      // if (session.user) {
      //   session.user.id = token.id;
      // }
      console.log("🔐 Session:", session);

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
