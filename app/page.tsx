import Link from 'next/link';

import { getServerSession } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]/route';
import { verifyJwt } from '@/lib/jwt';
import { firestore } from '@/lib/firebase-client';
import { DocumentData } from 'firebase-admin/firestore';
import { query, collection, where, getDocs } from 'firebase/firestore';

const fetchContents = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) return [];

  const user = verifyJwt(session.user.accessToken);

  if (!user) return [];

  const q = query(
    collection(firestore, 'contents'),
    where('user', '==', user.id)
  );

  const contents: { id: string; data: DocumentData }[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    contents.push({ id: doc.id, data: doc.data() });
  });

  return contents;
};

export default async function Home() {
  const contents = await fetchContents();

  if (!contents) return null;

  return (
    <section className='flex min-h-screen flex-col items-center justify-between p-24'>
      {contents.map((content) => (
        <Link key={content.id} href={`/contents/${content.id}`}>
          {content.data.title}
        </Link>
      ))}
    </section>
  );
}
