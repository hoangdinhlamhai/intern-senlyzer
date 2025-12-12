import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // XÓA TẤT CẢ USER CŨ
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("123456", 10)

  await prisma.user.createMany({
    data: [
      { name: "Admin", email: "admin123@gmail.com", password: hashedPassword },
      { name: "Nguyen Van A", email: "a@example.com", password: hashedPassword },
      { name: "Tran Thi B", email: "b@example.com", password: hashedPassword },
      { name: "Le Van C", email: "c@example.com", password: hashedPassword },
      { name: "Pham Thi D", email: "d@example.com", password: hashedPassword },
      { name: "Hoang Van E", email: "e@example.com", password: hashedPassword },
      { name: "Dang Thi F", email: "f@example.com", password: hashedPassword },
      { name: "Vu Van G", email: "g@example.com", password: hashedPassword },
      { name: "Do Thi H", email: "h@example.com", password: hashedPassword },
      { name: "Ngo Van I", email: "i@example.com", password: hashedPassword },
      { name: "Bui Thi J", email: "j@example.com", password: hashedPassword },
    ],
  });
}

main().finally(() => prisma.$disconnect());
