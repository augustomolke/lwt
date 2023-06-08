'use client';
import { SessionProvider } from 'next-auth/react';

export const Authprovider = ({ children }: { children: React.ReactNode }) => {
  // isLoginUrl(pathName.forEach)

  // signIn('email', {email})

  return <SessionProvider>{children}</SessionProvider>;
};
