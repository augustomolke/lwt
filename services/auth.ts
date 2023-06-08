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

const actionCodeSettings: (url?: string) => ActionCodeSettings = (url) => ({
  url: url || process.env.NEXT_PUBLIC_BASE_URL!,
  handleCodeInApp: true,
});

export const sendLoginEmail = async (email: string, url?: string) => {
  await sendSignInLinkToEmail(auth, email, actionCodeSettings(url));
};

export const isLoginUrl = (url: string): boolean => {
  return isSignInWithEmailLink(auth, url);
};

export const login = async (
  email: string,
  password?: string
): Promise<User | void> => {
  if (password) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
  }

  if (!isLoginUrl || !email) return;

  const { user } = await signInWithEmailLink(auth, email, window.location.href);

  return user;
};

export const signInEmail = async (email: string, url: string) =>
  await signInWithEmailLink(auth, email, url);

export const onAuthChanged = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const logout = () => {
  signOut(auth);
};
