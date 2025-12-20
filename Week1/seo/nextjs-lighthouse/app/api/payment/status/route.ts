import { prisma } from "@/app/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) return new Response("Missing orderId", { status: 400 });

  const payment = await prisma.payment.findUnique({
    where: { orderId },
  });

  if (!payment) return new Response("Not found", { status: 404 });

  return Response.json({
    status: payment.status,
  });
}
