'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { verifyJwt } from '@/lib/jwt';

export default function Home() {
  const session = useSession();

  const { status, data } = session;

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {status === 'loading' && <div>Loading....</div>}

      {status === 'unauthenticated' && (
        <Link href='/api/auth/signin'>Login</Link>
      )}
      {status === 'authenticated' && (
        <>
          <p> {`Bem vindo ${data.user?.name}!`}</p>
          <Image src={data.user?.image!} alt='foto' width={40} height={40} />
          <Link href='/api/auth/signout'>Logout</Link>
        </>
      )}

      <Button
        onClick={async () => {
          await fetch('/api/contents', {
            headers: { authorization: data?.user.accessToken! },
          });
        }}
      >
        teste
      </Button>
    </main>
  );
}
