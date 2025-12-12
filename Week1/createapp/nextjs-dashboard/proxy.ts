import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export const config = {
  // Cấu hình matcher để middleware chạy trên các route cụ thể, trừ file tĩnh và api
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};