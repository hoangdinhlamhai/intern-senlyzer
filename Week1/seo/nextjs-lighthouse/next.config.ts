// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cấu hình output thành "standalone" (rất quan trọng cho Serverless và Node.js)
  output: 'standalone', 

  // 🔑 KHẮC PHỤC LỖI CHROMIUM TRÊN VERCEL
  // Tùy chọn này giúp sao chép các file cần thiết vào thư mục build (standalone)
  experimental: {
    // Thêm các file/thư mục cần thiết của @sparticuz/chromium vào quá trình đóng gói
    outputFileTracingIncludes: {
      '/*': [
        './node_modules/@sparticuz/chromium/**/*',
      ],
    },
  },
};

module.exports = nextConfig;