import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { firestore } from '@/lib/firebase-client';
import { firestore as fsServer } from '@/lib/firebase-server';
import {
  query,
  collection,
  where,
  getDocs,
  DocumentData,
  deleteDoc,
  arrayUnion,
  doc,
  runTransaction,
} from 'firebase/firestore';
import { headers } from 'next/headers';
import { verifyJwt } from '@/lib/jwt';
import Tokenizr from 'tokenizr';
import slug from 'slug';

export const GET = async (req: NextRequest, res: any) => {
  const accessToken = headers().get('authorization');

  if (!accessToken) return NextResponse.json({ status: 400 });

  const user = verifyJwt(accessToken);

  if (!user) return NextResponse.json({ status: 400 });

  const q = query(
    collection(firestore, 'contents'),
    where('user', '==', user.id)
  );

  const contents: { id: string; data: DocumentData }[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    contents.push({ id: doc.id, data: doc.data() });
  });

  return NextResponse.json({ contents });
};

export const POST = async (req: NextRequest) => {
  const accessToken = headers().get('authorization');

  if (!accessToken) return NextResponse.json({ status: 400 });

  const user = verifyJwt(accessToken);

  if (!user) return NextResponse.json({ status: 400 });

  const text: { title: string; content: string } = await req.json();

  let lexer = new Tokenizr();

  lexer.rule(/[a-zA-Z\u00C0-\u00ff]+/g, (ctx, match) => {
    ctx.accept('word', match[0].toLowerCase());
  });
  lexer.rule(/[+-]?[0-9]+/, (ctx, match) => {
    ctx.accept('number', parseInt(match[0]));
  });
  lexer.rule(/\/\/[^\r\n]*\r?\n/, (ctx, match) => {
    ctx.ignore();
  });
  lexer.rule(/[ \t\r\n]+/, (ctx, match) => {
    ctx.ignore();
  });
  lexer.rule(/./, (ctx, match) => {
    ctx.accept('char');
  });

  const terms = lexer.input(text.content).tokens();
  const contentId = slug(text.title);

  await runTransaction(firestore, async (transaction) => {
    terms.forEach(async ({ value, type }) => {
      if (type === 'word') {
        const docRef = doc(firestore, 'users', user.id, 'terms', value);

        transaction.set(docRef, { level: 7 }, { merge: true });

        transaction.set(
          doc(firestore, docRef.path, 'contents', contentId),
          { context: 'to-do' },
          { merge: true }
        );
      }
    });

    transaction.set(doc(firestore, 'contents', contentId), {
      content: terms.map(({ type, value, text, pos }) => ({
        type,
        value,
        text,
        pos,
      })),
      title: text.title,
      type: 'text',
      user: user.id,
    });
  });

  return NextResponse.json({ slug: contentId });
};
