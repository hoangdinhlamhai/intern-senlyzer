import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { sites: true },
  });

  return Response.json({
    quota: user?.quota ?? 0,
    sites: user?.sites ?? [],
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { url, image } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.quota <= 0) {
    return new Response("Quota exceeded", { status: 403 });
  }

  await prisma.$transaction([
    prisma.site.create({
      data: {
        userId: user.id,
        url,
        image,
      },
    }),
    prisma.user.update({
      where: { id: user.id },
      data: {
        quota: { decrement: 1 },
      },
    }),
  ]);

  return Response.json({ success: true });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Lấy id site từ query params
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Missing site id", { status: 400 });
  }

  const site = await prisma.site.findUnique({
    where: { id: parseInt(id) },
  });

  if (!site) {
    return new Response("Site not found", { status: 404 });
  }

  // Kiểm tra site có thuộc user hiện tại không
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (site.userId !== user?.id) {
    return new Response("Forbidden", { status: 403 });
  }

  await prisma.site.delete({
    where: { id: parseInt(id) },
  });

  return Response.json({ success: true });
}
