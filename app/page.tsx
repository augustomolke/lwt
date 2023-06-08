'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const { data, status } = useSession();

  const [text, setText] = useState('');

  // const getText = useCallback(async () => {
  //   console.log('não passou');

  // if (!user?.uid) return;

  // console.log('PASSOU', user.uid);
  // const q = query(
  //   collection(firestore, 'contents'),
  //   where('user', '==', user.uid)
  // );

  // const teste = await getDoc(
  //   doc(firestore, 'contents', 'OgcC7swI6XA76YUdHO81')
  // );
  // console.log('🚀 ~ file: page.tsx:21 ~ getText ~ teste:', teste);

  // setText(teste.data()?.content);

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log('ASDSDFASD', doc);
  //     setText(doc.data().content);
  //     console.log(doc.id, ' => ', doc.data());
  //   });
  // }, [user]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {status === 'loading' && <div>Loading....</div>}

      {status === 'unauthenticated' && (
        <Link href='/api/auth/signin'>Login</Link>
      )}
      {status === 'authenticated' && (
        <Link href='/api/auth/signout'>Logout</Link>
      )}
    </main>
  );
}
