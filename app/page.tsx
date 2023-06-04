'use client';
import LoginForm from '@/components/LoginForm';
import LogoutForm from '@/components/LogoutForm';
import { useAuth } from '@/contexts/Authcontext';
import { Button } from '@/components/ui/button';
import { useCallback, useState } from 'react';
import { firestore } from '@/lib/firebase';
import {
  query,
  collection,
  getDocs,
  getDoc,
  doc,
  where,
} from 'firebase/firestore';

export default function Home() {
  const user = useAuth();

  const [text, setText] = useState('');

  const getText = useCallback(async () => {
    console.log('não passou');

    if (!user?.uid) return;

    console.log('PASSOU', user.uid);
    const q = query(
      collection(firestore, 'contents'),
      where('user', '==', user.uid)
    );

    // const teste = await getDoc(
    //   doc(firestore, 'contents', 'OgcC7swI6XA76YUdHO81')
    // );
    // console.log('🚀 ~ file: page.tsx:21 ~ getText ~ teste:', teste);

    // setText(teste.data()?.content);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log('ASDSDFASD', doc);
      setText(doc.data().content);
      console.log(doc.id, ' => ', doc.data());
    });
  }, [user]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {user ? (
        <div>
          {`Bem vindo ${user.email}!`}
          <LogoutForm />

          <Button onClick={getText}>fetch contents</Button>

          {text && <span>{text}</span>}
        </div>
      ) : (
        <LoginForm />
      )}
    </main>
  );
}
