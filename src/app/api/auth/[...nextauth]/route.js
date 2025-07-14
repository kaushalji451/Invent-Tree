
import NextAuth from "next-auth";
import { authOptions } from "./authOptions"; // adjust to match your actual path

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

