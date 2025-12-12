import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // Chuyển hướng người dùng đến trang login tùy chỉnh thay vì trang mặc định của NextAuth [4]
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isHome = nextUrl.pathname === '/'; // Xác định trang chủ
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Chuyển hướng người dùng chưa đăng nhập về trang login [5]
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      } else if (isHome) {
         // Nếu đang ở trang chủ (/) và CHƯA đăng nhập 
         return false; // Lập tức đá về trang /login
      }
      return true;
    },
  },
  providers: [], // Để trống mảng này tạm thời [5, 6]
} satisfies NextAuthConfig;