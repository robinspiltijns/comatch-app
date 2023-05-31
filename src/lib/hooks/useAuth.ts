import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';

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

type AuthStatus = AuthLoading | Unauthenticated | Authenticated

export function useAuth(): AuthStatus {
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
