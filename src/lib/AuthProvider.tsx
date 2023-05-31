'use client'

import { ReactNode, createContext, useContext } from "react";
import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from "./firebase";

type AuthLoading = {
    type: "LOADING"
}

type Unauthenticated = {
    type: "UNAUTHENTICATED"
}

type Authenticated = {
    type: "AUTHENTICATED"
    user: User
}

export type AuthStatus = AuthLoading | Unauthenticated | Authenticated


interface AuthProviderProps {
    children: ReactNode;
}

function useAuth(): AuthStatus {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // this is the observer function Firebase auth provides for detecting auth state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });

    // cleanup function
    return () => unsubscribe();
  }, []);

  if (loading) {
    return { type: "LOADING"}
  } else {
    return user == null ? { type: "UNAUTHENTICATED" } : { type: "AUTHENTICATED", user: user}
  }
}

export const AuthContext = createContext<AuthStatus>({type: "LOADING"});

export function AuthProvider ({ children }: AuthProviderProps) {
    const authStatus = useAuth()
  
    return (
      <AuthContext.Provider value={authStatus}>
        {children}
      </AuthContext.Provider>
    );
  };