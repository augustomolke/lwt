import { auth } from '@/lib/firebase';
import {
  ActionCodeSettings,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  User,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';

const actionCodeSettings: ActionCodeSettings = {
  url: process.env.NEXT_PUBLIC_BASE_URL || '',
  handleCodeInApp: true,
};

export const sendLoginEmail = async (email: string) => {
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);

  window.localStorage.setItem('emailForSignIn', email);
};

export const login = async (email: string): Promise<User | void> => {
  if (!isSignInWithEmailLink(auth, window.location.href) || !email) return;

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
