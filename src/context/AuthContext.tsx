import React, { createContext, useContext, useEffect, useState } from "react";
import type { CurrentUser } from "../types/user.type";
import Cookies from "js-cookie";
import { baseUrl } from "../lib/api";

interface AuthContextType {
  user: CurrentUser | null;
  loading: boolean;
  userLogin: (email: string, password: string) => Promise<void>;
  UserLogout: () => Promise<void>;
  token: string | null;
}

type TokenData = {
  message: string;
  token: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    Cookies.get("token") || null
  );
  console.log(token);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchcurrentUser = async () => {
    if (token) {
      try {
        const res = await fetch(`${baseUrl}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (!result) {
          console.log("User Not Found");
        }
        console.log(result);
        setCurrentUser(result);
        setLoading(false);
      } catch (error) {
        console.log(
          "Catch block executed while authenticating the user",
          error
        );
      }
    }
  };

  const userLogin = async (email: string, password: string) => {
    const res = await fetch(`${baseUrl}/api/member/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("userLogin failed");

    const data: TokenData = await res.json();
    console.log("data", data.token);
    const k = Cookies.set("token", data.token, { expires: 1 / 24 });
    console.log(k);

    setToken(data.token); // 7 days
    await fetchcurrentUser();
  };

  const UserLogout = async () => {
    Cookies.remove("token");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        loading,
        userLogin,
        UserLogout,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
