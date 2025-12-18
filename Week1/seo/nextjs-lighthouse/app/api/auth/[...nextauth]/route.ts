import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/app/lib/prisma";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // khi user login thành công
    async signIn(params) {
      const { user } = params; // user: User | AdapterUser
      if (!user.email) return false;

      try {
        // kiểm tra user đã tồn tại chưa
        const existing = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existing) {
          // tạo user mới với quota = 10
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "",
              quota: 10,
              password: "", // nếu login Google
            },
          });
        }

        return true;
      } catch (err) {
        console.error("Error saving user:", err);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
