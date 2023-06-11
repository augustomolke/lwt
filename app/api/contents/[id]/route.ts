import { verifyJwt } from '@/lib/jwt';
import { firestore } from '@/lib/firebase-client';
import { DocumentData } from 'firebase-admin/firestore';
import { getDoc, doc } from 'firebase/firestore';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface Context {
  params: { id: string };
}

export const GET = async (req: NextRequest, { params: { id } }: Context) => {
  const accessToken = headers().get('authorization');

  if (!accessToken) return NextResponse.json({ status: 400 });

  const user = verifyJwt(accessToken);

  if (!user) return NextResponse.json({ status: 400 });

  const docRef = doc(firestore, 'contents', id);
  const docSnap = await getDoc(docRef);

  return NextResponse.json({ content: docSnap.data() });
};
