import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: Request) {
    // lấy URL từ tham số truy vấn
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
        return NextResponse.json(
        { message: "Missing url" },
        { status: 400 }
        );
    }

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });
    await page.goto(url, { waitUntil: "networkidle2", timeout: 10000 });

    const screenshotBuffer = await page.screenshot({ 
        type: 'png', 
        encoding: 'binary', // Trả về binary data
        fullPage: false 
    });

    await browser.close();

    return new NextResponse(Buffer.from(screenshotBuffer), {
            headers: {
                "Content-Type": "image/png",
                // Cache 1 ngày để tối ưu như Image.Social [1]
                "Cache-Control": "public, max-age=86400, immutable", 
            },
        });
}