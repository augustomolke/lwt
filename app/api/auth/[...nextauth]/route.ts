import NextAuth, { NextAuthOptions } from 'next-auth';
import Email from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { sendLoginEmail } from '@/services/auth';
import { firestore, auth } from '@/lib/firebase-server';
import { auth as clientAuth } from '@/lib/firebase-client';
import { signJwtAccessToken } from '@/lib/jwt';
import { signOut, signInWithCustomToken } from 'firebase/auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

export const adapter = FirestoreAdapter(firestore);

export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'email', placeholder: 'name@email.com' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials) {
    //     const user = await adapter.getUserByEmail(credentials?.email!);

    //     if (user) {
    //       return credentials?.password &&
    //         (await bcrypt.compare(credentials?.password!, user.hashedPassword))
    //         ? user
    //         : null;
    //     }

    //     return null;
    //   },
    // }),
    Email({
      async sendVerificationRequest({ identifier, url }) {
        await sendLoginEmail(identifier, url);
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, profile }) {
      if (trigger === 'signIn') {
        const firebaseToken = await auth.createCustomToken(user.id);

        await signInWithCustomToken(clientAuth, firebaseToken);

        const { hashedPassword, ...userWithoutPassword } = user;
        const newAccessToken = signJwtAccessToken(userWithoutPassword);
        token.accessToken = newAccessToken;
        token.name = profile?.given_name || profile?.name;
        token.picture = profile?.picture || profile?.image;
      }

      return token;
    },

    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
  adapter,
  events: {
    // async signIn(message) {
    //   console.log('🚀 ~ file: route.ts:47 ~ signIn ~ message:', message);
    //   const result = await signInAnonymously(clientAuth);
    //   console.log('🚀 ~ file: route.ts:79 ~ signIn ~ result:', result);
    // },
    async signOut() {
      await signOut(clientAuth);
    },
    // async session(message) {
    //   console.log('🚀 ~ file: route.ts:35 ~ session ~ message:', message);
    // },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === 'development',
};
const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
