import { prisma } from "@/app/lib/prisma";

const PRICE = 50000;
const QUOTA_ADD = 100;

// Bắt đúng format orderId của bạn
const ORDER_ID_REGEX = /UP_\d+_\d+/;

export async function POST(req: Request) {
  const body = await req.json();

  console.log("SEPAY WEBHOOK:", body);

  const { content, transferAmount } = body;

  // 1️⃣ check số tiền
  if (Number(transferAmount) !== PRICE) {
    console.warn("❌ Sai số tiền:", transferAmount);
    return new Response("Invalid amount", { status: 400 });
  }

  // 2️⃣ tìm orderId trong content
  const match = content?.match(ORDER_ID_REGEX);
  const orderId = match?.[0];

  if (!orderId) {
    console.warn("❌ Không tìm thấy orderId trong content:", content);
    return Response.json({ ok: true });
  }

  const payment = await prisma.payment.findUnique({
    where: { orderId },
  });

  if (!payment) {
    console.warn("❌ Không tìm thấy payment:", orderId);
    return Response.json({ ok: true });
  }

  if (payment.status === "SUCCESS") {
    return Response.json({ ok: true });
  }

  // 3️⃣ update payment
  await prisma.payment.update({
    where: { orderId },
    data: {
      status: "SUCCESS",
      paidAt: new Date(),
    },
  });

  // 4️⃣ tăng quota
  await prisma.user.update({
    where: { id: payment.userId },
    data: {
      quota: { increment: QUOTA_ADD },
    },
  });

  console.log("✅ Thanh toán thành công:", orderId);

  return Response.json({ ok: true });
}
