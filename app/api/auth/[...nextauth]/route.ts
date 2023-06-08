import NextAuth from 'next-auth';
import Email from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { sendLoginEmail } from '@/services/auth';
import { firestore } from '@/lib/firebase-server';

const adapter = FirestoreAdapter(firestore);

const handler = NextAuth({
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
    //       return user;
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
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  adapter,
  events: {
    //   async signIn(message) {
    //     console.log('🚀 ~ file: route.ts:47 ~ signIn ~ message:', message);
    //   },
    //   async signOut(message) {
    //     console.log('🚀 ~ file: route.ts:47 ~ signOut ~ message:', message);
    //   },
    // async session(message) {
    //   console.log('🚀 ~ file: route.ts:35 ~ session ~ message:', message);
    // },
  },
});

export { handler as GET, handler as POST };
