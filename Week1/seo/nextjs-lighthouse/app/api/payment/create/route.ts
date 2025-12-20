import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const orderId = `UP_${Date.now()}_${user.id}`;

  await prisma.payment.create({
    data: {
      orderId,
      userId: user.id,
      amount: 50000,
      quotaAdded: 100,
    },
  });

  return Response.json({
    qrImage: "/QR_Code.png",        
    transferContent: orderId, 
  });
}

