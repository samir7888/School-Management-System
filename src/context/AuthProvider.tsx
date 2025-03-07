import { createContext, useContext, useState } from "react";
import { IUser } from "../types/user";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  accessToken: string | null;
  // loading: boolean;
  // error: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  // handleLogin: (params: {
  //   email: string;
  //   password: string;
  //   rememberMe: boolean;
  // }) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // // Decode JWT and set the user
  // useEffect(() => {
  //   if (accessToken) {
  //     try {
  //       const decoded = jwtDecode<IUser>(accessToken);
  //       setCurrentUser(decoded);
  //     } catch (error) {
  //       console.error("Failed to decode JWT:", error);
  //       setCurrentUser(null);
  //     }
  //   } else {
  //     setCurrentUser(null);
  //   }
  //   setLoading(false);
  // }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
      }}
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

  const accessToken = context.accessToken;

  const currentUser = accessToken ? (jwtDecode(accessToken) as IUser) : null;

  return {
    ...context,
    currentUser,
  };
}
