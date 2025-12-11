Week 1: 
Day 1:
  - Đọc docs: “Introduction” và “Getting Started” → hiểu Next.js là gì, so sánh với React thuần.
  - Cài đặt Node.js, VSCode, tạo project Next.js
  - Tìm hiểu cấu trúc thư mục mặc định (pages, public, styles).
  - CSS styling
  - Optimizing Fonts and Images
  - Creating Layouts and Pages
    + Next.js tự động:
      render layout.tsx
      nhét page.tsx vào {children}
      không gọi Page() thủ công
      không import Page vào Layout
      (đặt layout và page cùng cấp trong folder)
  - Server Component (mặc định)
    + chạy ở server
    + ko có access DOM
    + ko dùng được hooks
    + ko dùng event onClick
    + SEO tốt
    + bundle JS ít
  - Client Component (`'use client'`)
    +  chạy ở browser
    +  có access DOM
    +  dùng được hooks
    +  dùng event onClick
    +  ko SEO tốt
    +  bundle JS nhiều

Day 2:
  - Setup db trên vercel (dùng prisma v5)
    + Deploy backend
    + Tạo db trên vercel
    + vercel link
    + vercel env pull .env.development.local
    + kiểm tra url trong .env (DATABASE_URL="postgres://postgres_xxx...")
    + Generated Prisma Client: npx prisma generate
    + Apply migrations vào Database Vercel: npx prisma migrate deploy
    + Seed database: npx prisma db seed
    + local dev:
        -> npx prisma migrate dev,
        -> npx prisma db seed
    + sau khi deploy
        -> vercel link,
        -> vercel env pull .env.local,
        -> npx prisma migrate deploy,
        -> npx prisma db seed,
    + mỗi lần sửa schema:
        -> local: npx prisma migrate dev,
        -> deployment: vercel deploy,
                       npx prisma migrate deploy
   
Day 3:
 - Adding Search and Pagination:
   + Tìm hiểu cách sử dụng các API của Next.js: useSearchParams, usePathname, và useRouter
   + Triển khai chức năng tìm kiếm và phân trang bằng cách sử dụng các tham số tìm kiếm 
trong URL.
   + use-debounce để optimized
 - Mutating Data:
   + React Server Actions: cho phép chạy mã bất đồng bộ trực tiếp trên máy chủ, loại bỏ endpoint API, 
viết các hàm bất đồng bộ có thể được gọi từ các thành phần Client hoặc Server.
   + Hướng dẫn cách làm việc với form và các thành phần máy chủ. (Create User)
 - Handling Errors
   + Sử dụng error.tsx tập tin đặc biệt để bắt lỗi
 - Improving Accessibility











