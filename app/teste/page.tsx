'use client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/Authcontext';
import { teste } from '@/lib/firebase-server';
import { useTransition } from 'react';

const Page = () => {
  const user = useAuth();

  const [loading, startTransition] = useTransition();

  return (
    <div>
      <Button
        onClick={() =>
          startTransition(async () => teste((await user?.getIdToken()) || ''))
        }
      >
        testarrr
      </Button>
    </div>
  );
};

export default Page;
