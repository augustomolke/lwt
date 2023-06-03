'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { sendLoginEmail, login, onAuthChanged, logout } from '@/services/auth';

const Page = () => {
  const [email, setEmail] = useState(
    window.localStorage.getItem('emailForSignIn') || ''
  );
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsub = onAuthChanged((user) => setUser(!!user));

    return unsub;
  }, []);

  useEffect(() => {
    login(email);
  }, [email]);

  return (
    <section>
      {user ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          <Button onClick={() => sendLoginEmail(email)}>Login</Button>
        </>
      )}
    </section>
  );
};

export default Page;
