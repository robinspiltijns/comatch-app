'use client'

import { ReactNode, createContext, useContext } from "react";
import { AuthStatus, useAuth } from "./hooks/useAuth";

export const AuthContext = createContext<AuthStatus>({type: "LOADING"});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider ({ children }: AuthProviderProps) {
    const authStatus = useAuth()
  
    return (
      <AuthContext.Provider value={authStatus}>
        {children}
      </AuthContext.Provider>
    );
  };