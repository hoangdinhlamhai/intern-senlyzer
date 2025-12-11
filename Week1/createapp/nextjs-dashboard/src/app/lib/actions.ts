'use server';
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
 
export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;

  if (!email) {
    throw new Error("Email is required");
  }

  await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  redirect("/dashboard");
}