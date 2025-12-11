import prisma from "@/app/lib/prisma";
import { Prisma } from '@prisma/client';

export async function fetchUsersPaginated(page = 1, limit = 5, query = "") {
  try {
    const where: Prisma.UserWhereInput = query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ],
        }
      : {};

    const total = await prisma.user.count({ where });

    const users = await prisma.user.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return {
      users,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("fetchUsersPaginated Error:", error);
    throw new Error("Failed to fetch users (paginated)");
  }
}
