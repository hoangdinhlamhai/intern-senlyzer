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
  - Fetch data: Next + Prisma
    + Prisma: Prisma = ORM (Object Relational Mapper) giúp truy vấn db không cần viết sql thủ công (như JPA bên Spring)











