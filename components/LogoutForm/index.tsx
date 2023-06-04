'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/services/auth';
import { useRouter } from 'next/navigation';

const LoginForm: React.FunctionComponent = () => {
  const router = useRouter();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await logout();

        router.replace('/');
      }}
    >
      <Button type='submit'>Logout</Button>
    </form>
  );
};

export default LoginForm;
