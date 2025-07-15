import connectMongo from "../../../../lib/db";
import AdminModel from "../../../../models/Admin";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongo();
        const { username, password } = credentials;
        const userExist = await AdminModel.findOne({ username });

        if (!userExist) {
          throw new Error("No user found with this username");
        }

        if (userExist.password !== password) {
          throw new Error("Invalid password");
        }

        return {
          _id: userExist._id.toString(),
          username: userExist.username,
          role: userExist.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session._id = token._id;
        session.username = token.username;
        session.role = token.role;
      }
      return session; // ✅ This line was missing
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;