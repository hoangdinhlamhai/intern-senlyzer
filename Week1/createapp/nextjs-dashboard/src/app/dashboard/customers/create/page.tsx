import { createUser } from "@/app/lib/actions";
import Link from "next/link";

export default function CreateCustomer() {
  return (
    <form action={createUser} className="flex flex-col gap-4 p-4 max-w-md">
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          name="name"
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </form>
  );
}