"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
  setUser: (user: any, token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = !!token;

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user")
      ? JSON.parse(Cookies.get("user")!)
      : null;

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUserState(storedUser);
    }
  }, []);

  const setUser = (userData: any, userToken: string) => {
    Cookies.set("token", userToken, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    Cookies.set("user", JSON.stringify(userData), {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    setToken(userToken);
    setUserState(userData);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken(null);
    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated, logout, setUser }}
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
