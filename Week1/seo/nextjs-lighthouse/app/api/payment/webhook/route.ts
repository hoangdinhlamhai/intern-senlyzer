import { prisma } from "@/app/lib/prisma";

const PRICE = 50000;
const QUOTA_ADD = 100;

export async function POST(req: Request) {
  const body = await req.json();
  const { order_id, amount, status } = body;

  if (status !== "success") return Response.json({ ok: true });

  if (amount !== PRICE)
    return new Response("Invalid amount", { status: 400 });

  const payment = await prisma.payment.findUnique({
    where: { orderId: order_id },
  });

  if (!payment) return new Response("Not found", { status: 404 });

  if (payment.status === "SUCCESS")
    return Response.json({ ok: true });

  // update payment
  await prisma.payment.update({
    where: { orderId: order_id },
    data: {
      status: "SUCCESS",
      paidAt: new Date(),
    },
  });

  // tăng quota
  await prisma.user.update({
    where: { id: payment.userId },
    data: {
      quota: { increment: QUOTA_ADD },
    },
  });

  return Response.json({ ok: true });
}
