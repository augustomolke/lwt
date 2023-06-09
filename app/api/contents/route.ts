import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { firestore } from '@/lib/firebase-client';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]/route';
import { headers } from 'next/headers';
import { verifyJwt } from '@/lib/jwt';

export const GET = async (req: NextRequest, res: any) => {
  const session = await getServerSession(nextAuthOptions);

  const accessToken = headers().get('authorization');

  if (!accessToken) return NextResponse.json({ status: 400 });

  const user = verifyJwt(accessToken);

  if (!user) return NextResponse.json({ status: 400 });

  const q = query(
    collection(firestore, 'contents'),
    where('user', '==', user.id)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log('ASDSDFASD', doc);
    console.log(doc.id, ' => ', doc.data());
  });

  return NextResponse.json({});
};
