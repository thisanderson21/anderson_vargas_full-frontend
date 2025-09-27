import NextAuth, { Account, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";


export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      authorization: {
        url: process.env.NEXT_PUBLIC_SPOTIFY_AUTHORIZE_URL,
        params: {
          scope: process.env.NEXT_PUBLIC_SPOTIFY_SCOPE
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",  
    signOut: "/logout",
    error: "/auth/error",
  },

  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: Account | null }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
    async redirect({ baseUrl }: { baseUrl:string }) {
      return `${baseUrl}/search`; // 🔥 siempre redirige aquí
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
