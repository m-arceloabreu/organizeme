import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        const response = await fetch(
          'http://localhost:8080/api/v1/auth/signin',
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );
        const user = await response.json();
        if (user && response.ok) {
          return user;
        } else {
          throw new Error("User name or password is not correct");
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signIn',
    error: '/denied',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as User;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user = token.user
      }

      return session;
    },
  },
};
