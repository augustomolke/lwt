import { auth } from '@/lib/firebase-client';
import {
  ActionCodeSettings,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  User,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const actionCodeSettings: ActionCodeSettings = {
  url: process.env.NEXT_PUBLIC_BASE_URL || '',
  handleCodeInApp: true,
};

export const sendLoginEmail = async (email: string) => {
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);

  window.localStorage.setItem('emailForSignIn', email);
};

export const loginUrl = (): boolean => {
  return isSignInWithEmailLink(auth, window.location.href);
};

export const login = async (
  email: string,
  password?: string
): Promise<User | void> => {
  if (password) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
  }

  if (!loginUrl || !email) return;

  const { user } = await signInWithEmailLink(auth, email, window.location.href);

  window.localStorage.removeItem('emailForSignIn');

  return user;
};

export const onAuthChanged = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const logout = () => {
  signOut(auth);
};
