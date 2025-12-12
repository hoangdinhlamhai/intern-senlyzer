import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient()

async function main() {
  // XÓA TẤT CẢ USER CŨ
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("123456", 10)

  // const usersToSeed = [
  //     { name: "Admin", email: "admin123@gmail.com", password: hashedPassword },
  //     { name: "Nguyen Van A", email: "a@example.com", password: hashedPassword },
  //     { name: "Tran Thi B", email: "b@example.com", password: hashedPassword },
  //     { name: "Le Van C", email: "c@example.com", password: hashedPassword },
  //     { name: "Pham Thi D", email: "d@example.com", password: hashedPassword },
  //     { name: "Hoang Van E", email: "e@example.com", password: hashedPassword },
  //     { name: "Dang Thi F", email: "f@example.com", password: hashedPassword },
  //     { name: "Vu Van G", email: "g@example.com", password: hashedPassword },
  //     { name: "Do Thi H", email: "h@example.com", password: hashedPassword },
  //     { name: "Ngo Van I", email: "i@example.com", password: hashedPassword },
  //     { name: "Bui Thi J", email: "j@example.com", password: hashedPassword },
  // ];

  await prisma.user.createMany({
    data: [
      { id: createId(), name: "Admin", email: "admin123@gmail.com", password: hashedPassword },
      { id: createId(), name: "Nguyen Van A", email: "a@example.com", password: hashedPassword },
      { id: createId(), name: "Tran Thi B", email: "b@example.com", password: hashedPassword },
      { id: createId(), name: "Le Van C", email: "c@example.com", password: hashedPassword },
      { id: createId(), name: "Pham Thi D", email: "d@example.com", password: hashedPassword },
      { id: createId(), name: "Hoang Van E", email: "e@example.com", password: hashedPassword },
      { id: createId(), name: "Dang Thi F", email: "f@example.com", password: hashedPassword },
      { id: createId(), name: "Vu Van G", email: "g@example.com", password: hashedPassword },
      { id: createId(), name: "Do Thi H", email: "h@example.com", password: hashedPassword },
      { id: createId(), name: "Ngo Van I", email: "i@example.com", password: hashedPassword },
      { id: createId(), name: "Bui Thi J", email: "j@example.com", password: hashedPassword },
    ],
  });

  // Lặp qua mảng và gọi create()
  // for (const user of usersToSeed) {
  //   await prisma.user.create({
  //       data: user,
  //   });
  // }
}

main().finally(() => prisma.$disconnect());
