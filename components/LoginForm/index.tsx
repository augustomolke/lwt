'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from '@/services/auth';
import { useRouter } from 'next/navigation';

const LoginForm: React.FunctionComponent = () => {
  const router = useRouter();
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = (data.get('email')?.valueOf() as string) || '';
        const password = (data.get('password')?.valueOf() as string) || '';

        console.log('SDSFSDAFDSFADS', email, password);

        const user = await login(email, password);
        console.log('🚀 ~ file: index.tsx:18 ~ onSubmit={ ~ user:', user);

        router.replace('/');
      }}
    >
      <Input name='email' type='email' />
      <Input name='password' type='password' />
      <Button type='submit'>Login</Button>
    </form>
  );
};

export default LoginForm;
