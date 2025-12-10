//http://localhost:3000/dashboard
// 'use client';
import { fetchUsers } from "@/app/lib/data"

export default async function Page() {
    // const pathname = usePathname(); // Get the current path
    type User = Awaited<ReturnType<typeof fetchUsers>>[number];
    const users = await fetchUsers();
  return (
    <>
        {/* <p>{pathname}</p> */}
        <p>Dashboard Page</p>
        {/* <Link href="/dashboard/customers">
          Customer
        </Link>
        <Link href="/dashboard/invoices">
          Invoices
        </Link> */}

        {users.map((user: User) => (
        <div key={user.id}>
          {user.name} – {user.email}
        </div>
      ))}
    </>
  );
}