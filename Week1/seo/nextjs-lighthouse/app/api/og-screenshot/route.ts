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

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/120.0.0.0 Safari/537.36"
    );

    await page.setExtraHTTPHeaders({
      "accept-language": "en-US,en;q=0.9",
    });

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
      });
    });

    await page.setViewport({ width: 1200, height: 630 });

    await page.goto(url, {
      waitUntil: "domcontentloaded", // QUAN TRỌNG cho Vercel
      timeout: 15000,
    });

    // await page.waitForSelector("img", { timeout: 5000 });
    await new Promise((resolve) => setTimeout(resolve, 5000));

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

