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

import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer'; // Dành cho Local
import puppeteerCore from 'puppeteer-core'; // Dành cho Vercel/Serverless
import chromium from '@sparticuz/chromium'; // Dành cho Vercel/Serverless

export const maxDuration = 30; 

// 🎯 Hàm khởi tạo Browser chung cho cả 2 môi trường
async function getBrowser() {
    const isVercel = process.env.VERCEL_ENV || process.env.NODE_ENV === 'production';

    if (isVercel) {
        // CẤU HÌNH CHO MÔI TRƯỜNG VERCEL
        const executablePath = await chromium.executablePath();
        const puppeteerArgs = chromium.args.concat([
            '--no-sandbox', 
            '--disable-setuid-sandbox', 
            '--disable-dev-shm-usage', 
            '--single-process'
        ]);

        return puppeteerCore.launch({
            executablePath: executablePath,
            args: puppeteerArgs,
            headless: true, // Luôn là true trên Serverless
        });

    } else {
        // CẤU HÌNH CHO MÔI TRƯỜNG LOCAL
        return puppeteer.launch({
            headless: true,
        });
    }
}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json(
            { message: "Missing url" },
            { status: 400 }
        );
    }
    
    let browser = null;
    
    try {
        browser = await getBrowser();
        
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 630 });
        await page.goto(url, { waitUntil: "networkidle2", timeout: 15000 }); 

        const screenshotBuffer = await page.screenshot({ 
            type: 'png', 
            encoding: 'binary',
            fullPage: false 
        });

        return new NextResponse(Buffer.from(screenshotBuffer), {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=86400, immutable", 
            },
        });

    } catch (error) {
        console.error("Lỗi khi chụp ảnh (Serverless hoặc Local):", error);
        return NextResponse.json(
            { message: "Lỗi Server: Không thể chụp ảnh. Kiểm tra lại URL hoặc Terminal Server." },
            { status: 500 }
        );
    } finally {
        // Đảm bảo đóng browser
        if (browser !== null) {
            try {
                await browser.close();
            } catch (e) {
                console.error("Lỗi khi đóng browser:", e);
            }
        }
    }
}
