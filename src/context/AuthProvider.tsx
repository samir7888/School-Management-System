import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { login } from "../api/auth";

import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  accessToken: string | null;
  currentUser: User | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  handleLogin: (params: {
    email: string;
    password: string;
    rememberme: boolean;
  }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // Decode JWT and set the user
  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode<User>(accessToken);
        console.log(decoded);
        setCurrentUser(decoded);
      } catch (error) {
        console.error("Failed to decode JWT:", error);
        setCurrentUser(null);
      }
    } else {
      setCurrentUser(null);
    }
  }, [accessToken]);



  // Login function
  async function handleLogin({
    email,
    password,
    rememberme,
  }: {
    email: string;
    password: string;
    rememberme: boolean;
  }) {
    try {
      const res = await login({ email, password, remember: rememberme });
      setAccessToken(res.access_token);
    } catch (error) {
      console.error("Login failed:", error);
      setAccessToken(null);
      setCurrentUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, currentUser, handleLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside of an AuthProvider");
  }
  return context;
}
