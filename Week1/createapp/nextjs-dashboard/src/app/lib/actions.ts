'use server';
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";

//add authentication
import { signIn } from '../../../auth';
import { AuthError } from 'next-auth';
 
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

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}