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






