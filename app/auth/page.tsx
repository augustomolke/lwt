'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Page = () => {
  const [email, setEmail] = useState('');
  return (
    <section>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Button>Login</Button>
    </section>
  );
};

export default Page;
