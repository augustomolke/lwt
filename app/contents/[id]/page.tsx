import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';
import { verifyJwt } from '@/lib/jwt';
import { auth, firestore } from '@/lib/firebase-client';
import { DocumentData } from 'firebase-admin/firestore';
import { getDoc, doc } from 'firebase/firestore';
import { getServerSession } from 'next-auth';

interface ContentPageProps {
  params: { id: string };
}

const fetchContent: (id: string) => Promise<DocumentData | undefined> = async (
  id: string
) => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) return undefined;

  const user = verifyJwt(session.user.accessToken);

  if (!user) return undefined;

  const docRef = doc(firestore, 'contents', id);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
};

const Page: React.FunctionComponent<ContentPageProps> = async ({ params }) => {
  const content = await fetchContent(params.id);

  if (!content) return null;

  return (
    <section>
      <div>{content.title}</div>
      <div>
        {content.content.map((term: any) => (
          <div key={`${term.value}-${term.pos}`}>{term.text}</div>
        ))}
      </div>
    </section>
  );
};

export default Page;
