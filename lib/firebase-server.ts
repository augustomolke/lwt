'use server';

import { getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { firebaseConfig } from './firebase-client';
import { cookies } from 'next/headers';
import admin, { credential } from 'firebase-admin';

const app = !getApps().length
  ? initializeApp({
      credential: credential.applicationDefault(),
    })
  : getApp();

const auth = getAuth(app);

export const teste = async (token: string) => {
  const result = await auth.verifyIdToken(token);
  const session = await auth.createSessionCookie(token, {
    expiresIn: 60 * 10 * 1000,
  });
  cookies().set('__session', session);
  console.log('🚀 ~ file: tests.ts:16 ~ teste ~ result:', result);
};
