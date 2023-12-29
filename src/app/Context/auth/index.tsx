"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase/auth";

type User = { uid: string };

type AuthContextType = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      setUser(userData as User | undefined);
    });

    
    return () => unsubscribe();
  }, []);

  const contextValue: AuthContextType = {
    user,
    setUser,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
}
