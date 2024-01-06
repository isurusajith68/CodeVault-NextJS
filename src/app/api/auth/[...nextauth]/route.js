import User from "@/model/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import connectDB from "@/util/db/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    await connectDB()
                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (!passwordsMatch) {
                        return null;
                    }

                    return user
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user._id;
            if (user) token.role = user.isAdmin;
            if (user) token.name = user.username;
            return token;
        },
        async session({ session, token }) {
            if (session?.user) session.user.id = token.id;
            if (session?.user) session.user.role = token.role;
            if (session?.user) session.user.name = token.name;
            return session;
        },
        callbacks: {
            async redirect({ url, baseUrl }) {
                // Allows relative callback URLs
                if (url.startsWith("/")) return `${baseUrl}${url}`
                // Allows callback URLs on the same origin
                else if (new URL(url).origin === baseUrl) return url
                return baseUrl
            }
        }
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };