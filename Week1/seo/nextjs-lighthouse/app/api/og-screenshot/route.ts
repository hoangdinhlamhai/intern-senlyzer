// import { NextResponse } from 'next/server';
// import puppeteer from 'puppeteer';

// export async function GET(request: Request) {
//     // lấy URL từ tham số truy vấn
//     const { searchParams } = new URL(request.url);
//     const url = searchParams.get("url");

//     if (!url) {
//         return NextResponse.json(
//         { message: "Missing url" },
//         { status: 400 }
//         );
//     }

//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ['--no-sandbox', '--disable-setuid-sandbox'],
//     });

//     const page = await browser.newPage();
//     await page.setViewport({ width: 1200, height: 630 });
//     await page.goto(url, { waitUntil: "networkidle2", timeout: 10000 });

//     const screenshotBuffer = await page.screenshot({ 
//         type: 'png', 
//         encoding: 'binary', // Trả về binary data
//         fullPage: false 
//     });

//     await browser.close();

//     return new NextResponse(Buffer.from(screenshotBuffer), {
//             headers: {
//                 "Content-Type": "image/png",
//                 // Cache 1 ngày để tối ưu như Image.Social [1]
//                 "Cache-Control": "public, max-age=86400, immutable", 
//             },
//         });
// }

// file app/api/og-screenshot/routes.ts (Sửa đổi)

// file app/api/og-screenshot/routes.ts (Phiên bản hoạt động ở cả Local và Vercel)

import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";
export const maxDuration = 30;

async function getPuppeteer() {
  if (process.env.VERCEL) {
    const puppeteer = await import("puppeteer-core");
    return puppeteer.default;
  } else {
    const puppeteer = await import("puppeteer");
    return puppeteer.default;
  }
}

/**
 * Khởi tạo browser đúng môi trường
 */
async function getBrowser() {
  const puppeteer = await getPuppeteer();

  if (process.env.VERCEL) {
    return puppeteer.launch({
      args: chromium.args, // ✅ KHÔNG thêm flag
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }

  return puppeteer.launch({
    headless: true,
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ message: "Missing url" }, { status: 400 });
  }

  let browser: any;

  try {
    browser = await getBrowser();

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });

    await page.goto(url, {
      waitUntil: "domcontentloaded", // QUAN TRỌNG cho Vercel
      timeout: 15000,
    });

    const screenshot = await page.screenshot({
      type: "png",
    });

    return new NextResponse(screenshot, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    console.error("SCREENSHOT ERROR:", error);
    return NextResponse.json(
      { message: "Không thể chụp ảnh" },
      { status: 500 }
    );
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {}
    }
  }
}

