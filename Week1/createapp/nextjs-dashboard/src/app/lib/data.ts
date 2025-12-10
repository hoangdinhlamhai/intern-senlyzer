// import prisma from "@/app/lib/prisma";
// import type { User } from "@prisma/client";

// export async function fetchUsers(): Promise<User[]> {
//   try {
//     const data = await prisma.user.findMany({
//       orderBy: { createdAt: "desc" },
//     });
//     return data;
//   } catch (error) {
//     console.error("fetchUsers Error:", error);
//     throw new Error("Failed to fetch users");
//   }
// }

// app/lib/data.ts
import prisma from "@/app/lib/prisma";

export async function fetchUsers() {
  try {
    return await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("fetchUsers Error:", error);
    throw new Error("Failed to fetch users");
  }
}
