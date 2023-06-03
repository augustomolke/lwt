'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import {
  sendLoginEmail,
  login,
  onAuthChanged,
  logout,
  loginUrl,
} from '@/services/auth';

const Page = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState(false);
  const [passwordInput, setPasswordInput] = useState(false);
  const [password, setPassword] = useState('');

  const [user, setUser] = useState(false);

  useEffect(() => {
    if (loginUrl()) {
      const storedEmail = window.localStorage.getItem('emailForSignIn');

      if (storedEmail) {
        login(storedEmail);
      } else {
        setConfirmEmail(true);
      }
    }
    const unsub = onAuthChanged((user) => {
      console.log(user);
      setUser(!!user);
    });

    return unsub;
  }, []);

  return (
    <section>
      {user ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          {passwordInput && (
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <Button onClick={() => sendLoginEmail(email)}>Login por email</Button>
          <Button
            onClick={() =>
              !password ? setPasswordInput(true) : login(email, password)
            }
          >
            Login com senha
          </Button>
          {confirmEmail && loginUrl() && (
            <Button onClick={() => login(email)}>Confirmar email</Button>
          )}
        </>
      )}
    </section>
  );
};

export default Page;
