"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from "cookies-next";

interface AuthContextType {
  user: any;
  token: string | null;
  email: string;
  isAuthenticated: boolean;
  logout: () => void;
  checkAuth: () => { isAuthenticated: boolean; isNextAuth: boolean };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = getCookie("token");
    const storedUser = getCookie("user")
      ? JSON.parse(getCookie("user") as string)
      : null;
    const storedEmail = getCookie("email");

    if (storedToken && storedUser && storedEmail) {
      setToken(storedToken as string);
      setUser(storedUser);
      setEmail(storedEmail as string);
    }
  }, []);

  const logout = () => {
    setToken(null);
    setUser(null);
    setEmail("");
    deleteCookie("token");
    deleteCookie("user");
    deleteCookie("email");
  };

  const checkAuth = () => {
    const storedToken = getCookie("token");
    const storedUser = getCookie("user")
      ? JSON.parse(getCookie("user") as string)
      : null;
    const isNextAuth = !storedUser;

    return {
      isAuthenticated: !!storedToken,
      isNextAuth,
    };
  };

  return (
    <AuthContext.Provider
      value={{ user, token, email, isAuthenticated, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
