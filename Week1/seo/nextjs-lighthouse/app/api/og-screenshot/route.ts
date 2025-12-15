import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';

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
import chromium from "@sparticuz/chromium";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });

  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 15000,
  });

  const screenshot = await page.screenshot({
    type: "png",
  });

  await browser.close();

  return new NextResponse(Buffer.from(screenshot), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
}