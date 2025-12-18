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
   

Day 4:
 - Adding Authentication
    + Thiết lập Cấu hình (auth.config.ts): Tạo file cấu hình chứa các quy tắc điều hướng (như trang đăng nhập tùy chỉnh) 
và logic phân quyền truy cập (authorized)
    + Bảo vệ Route bằng Proxy (proxy.ts): Sử dụng cấu hình ở bước 1 để tạo Middleware (Proxy). 
Để chặn các truy cập trái phép trước khi nội dung trang được render
    + Xây dựng Logic Xác thực (auth.ts): Đây là nơi khởi tạo chính của NextAuth. Tại đây, thêm Credentials provider để login bằng email/password, 
zod để validate dữ liệu đầu vào, dùng bcrypt để so sánh mật khẩu đã mã hóa trong db
    + Tạo Server Action (actions.ts): Tạo một hành động phía server (authenticate) để gọi hàm signIn từ auth.ts. 
Hàm này xử lý các lỗi đăng nhập và trả về phản hồi thích hợp
    + Form đăng nhập (login-form.tsx): Kết nối form React với Server Action bằng hook useActionState
 - Adding Metadata
 - Why is SEO so important?
    + Tăng thứ hạng tìm kiếm trên các công cụ tìm kiếm
 - Search Systems
 - What are Web Crawlers?
 - Crawling and Indexing
 - What are HTTP Status Codes?, What is a robots.txt File?
    + Một tệp robots.txtTệp này cho trình thu thập thông tin của công cụ tìm kiếm biết những trang hoặc tệp nào mà trình thu thập thông tin có thể
hoặc không thể yêu cầu từ trang web của bạn

Day 5:
 - What about AMP?: một công nghệ cho phép các nhà phát triển tạo ra các trang web tải nhanh hơn trên thiết bị di động -> đã loại bỏ sau NextJS 16
 - URL Structure Metadata <meta name="description" content="Check out Iphone 12 XR Pro and Iphone 12 Pro Max. Visit your local store and for expert advice.">📈
 - On Page SEO
 - Web Performance & Core Web Vitals
 - Web Vitals Overview: là một sáng kiến của Google nhằm cung cấp hướng dẫn thống nhất về các tín hiệu chất lượng thiết yếu để mang lại trải nghiệm người dùng tuyệt vời trên web.
 - Largest Contentful Paint (LCP)
 - First Input Delay (FID)
 - Cumulative Layout Shift (CLS)
 - SEO Impact
 - Improving your Core Web Vitals
 - 🛠 So sánh 2 cách kết nối và truy vấn db

   Cách 1: Dùng ORM Prisma (v5)
     + deploy code lên vercel
     + Vercel link: link với db
     + npx prisma pull env.development.local
     + kiểm tra url trong .env (DATABASE_URL="postgres://postgres_xxxx...")
     + Generated Prisma Client: npx prisma generate
     + Apply migrations vào Database Vercel: npx prisma migrate deploy
     + npx prisma migrate dev --name init
     + sử dụng file prisma/schema.prisma để tạo các bảng
     + npx prisma db seed: fill data từ file prisma/seed.ts
     + truy vấn bằng các hàm định nghĩa sẵn

   Cách 2: thủ công+
     + deploy code lên vercel
     + Vercel link: link với db
     + kiểm tra url trong .env (DATABASE_URL="postgres://postgres_xxxx...")
     + tạo data sẵn cho từng bảng ở file placeholder-data.ts
     + file: seed/route.ts: import từ file placeholder-data.ts, viết hàm thực thi bằng lệnh sql: run bằng cách chạy localhost:3000/seed
     + tương tự: viết hàm truy vấn khác ở 1 file (data.ts), sang file khác import vào để dùng

Day 6: Ôn tập:
 - Ôn lại Search: 
     Gõ vào ô search -> url thay đổi -> page.tsx tự động re-render
     page lấy được tham số query mới -> Suspense key thay đổi -> table bị remount -> fetch lại Data
 - Pagination:
     Ở Page nhận vào prop thì NextJS tự lấy prop từ url truyền vào, lúc search thì page = 1, khi nhấn chuyển page ở pagination thì tham số page
mới được đổi"
 - Ôn lại create:
     Sử dụng thuộc tính action={createInvoice} trong thẻ <form>. Trong React, thuộc tính action này đặc biệt cho phép gọi trực tiếp Server Action 
thay vì một URL string. -> Khi người dùng nhấn Submit, trình duyệt sẽ tự động gửi FormData đến hàm createInvoice.
     Trích xuất dữ liệu: Lấy dữ liệu thô từ object formData bằng phương thức .get() (ví dụ: formData.get('customerId'))"
 - Ôn lại update:
     Button truyền vào id -> ném id lên url
     Page lấy id từ url -> lấy data by id -> truyền data vào form edit
     submit vào action={updateInvoiceWithId} (sử dụng bind), chứ không truyền trực tiếp hàm như create"
 - Đọc lại docs: Handle Error
 - Đọc lại docs: Improving Accessibility
 - Largest Contentful Paint (LCP): đánh giá hiệu suất tải trang
 - First Input Delay (FID): phản ánh cảm nhận của người dùng về trải nghiệm khi tương tác với một trang web
 - Cumulative Layout Shift (CLS): đo lường độ ổn định bố cục tổng thể của trang web

Day 7: 
 - Clone web https://image.social/

Week 2: 
Day 1:
  - Introducing Lighthouse
     + Mở DevTools và nhấp vào tab Lighthouse
  - Automatic Image Optimization
     + Sử dụng Image từ next/image thay vì thẻ img
  - Dynamic Imports.
  - Dynamic Imports for Components.
  - Optimizing Fonts.
  - Optimizing Third-Party Scripts
    + Dùng import Script from 'next/script'; có thể thêm các thành phần bên thứ 3 vào bất kì đâu
  - Monitoring your Core Web Vitals.
  - Next.js Speed Insights
  - Optimize app tạo ảnh

















