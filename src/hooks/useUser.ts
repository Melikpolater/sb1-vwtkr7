import { useState, useEffect } from 'react';
import { getUserProfile } from '../lib/services/userService';
import { useAuth } from '../contexts/AuthContext';
import type { User } from '../types';

export function useUser() {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!authUser?.uid) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const userData = await getUserProfile(authUser.uid);
        setUser(userData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [authUser]);

  return { user, loading, error };
}