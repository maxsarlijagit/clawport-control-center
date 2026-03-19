import "next-auth";
import { UserRole } from "./permissions";

declare module "next-auth" {
  interface User {
    role?: UserRole;
  }
  
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: UserRole;
    } & DefaultSession["user"];
  }
}
