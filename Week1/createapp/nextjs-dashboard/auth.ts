import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import prisma from '@/app/lib/prisma'; // Import prisma thay vì thư viện postgres
import type { User } from '@/app/lib/definitions'; // Đảm bảo bạn có type User

// Hàm lấy user từ DB bằng Prisma
async function getUser(email: string): Promise<User | null> {
  try {
    // Dùng prisma.user.findUnique thay vì viết câu lệnh SELECT SQL
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return user as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validate dữ liệu đầu vào bằng Zod
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // Lấy user bằng hàm getUser đã viết lại ở trên
          const user = await getUser(email);
          if (!user) return null;
          
          // So sánh mật khẩu (bcrypt vẫn cần thiết)
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});