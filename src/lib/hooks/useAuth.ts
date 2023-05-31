import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { User } from 'firebase/auth';

export function useAuth() {
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

  return [user, loading];
}
