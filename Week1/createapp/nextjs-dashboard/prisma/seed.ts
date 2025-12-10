import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@gmail.com",
    },
  })
}

main()
  .finally(() => prisma.$disconnect())
