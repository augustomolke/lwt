'use client';

import { onAuthChanged } from '@/services/auth';
import { User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<User | null>(null);

export const Authprovider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(
    () =>
      onAuthChanged((user) => {
        console.log('CHANGEEEEDDD', user);
        setUser(user);
      }),
    []
  );

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
