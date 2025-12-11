import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "Admin", email: "admin123@gmail.com" },
      { name: "Nguyen Van A", email: "a@example.com" },
      { name: "Tran Thi B", email: "b@example.com" },
      { name: "Le Van C", email: "c@example.com" },
      { name: "Pham Thi D", email: "d@example.com" },
      { name: "Hoang Van E", email: "e@example.com" },
      { name: "Dang Thi F", email: "f@example.com" },
      { name: "Vu Van G", email: "g@example.com" },
      { name: "Do Thi H", email: "h@example.com" },
      { name: "Ngo Van I", email: "i@example.com" },
      { name: "Bui Thi J", email: "j@example.com" },
    ],
  });
}

main()
  .finally(() => prisma.$disconnect())
