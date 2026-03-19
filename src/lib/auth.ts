import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Admin credentials from env or default
        const adminUser = process.env.ADMIN_USERNAME || "admin";
        const adminPass = process.env.ADMIN_PASSWORD || "admin123";
        
        // Student credentials from env or default
        const studentUser = process.env.STUDENT_USERNAME || "student";
        const studentPass = process.env.STUDENT_PASSWORD || "student123";
        
        // Check admin
        if (credentials?.username === adminUser && credentials?.password === adminPass) {
          return {
            id: "1",
            name: "Administrador",
            email: "admin@framelab.com",
            role: "ADMIN",
          };
        }
        
        // Check student
        if (credentials?.username === studentUser && credentials?.password === studentPass) {
          return {
            id: "2",
            name: "Estudiante",
            email: "student@framelab.com",
            role: "STUDENT",
          };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token.role) {
        session.user = {
          ...session.user,
          role: token.role as string,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    }
  }
};
