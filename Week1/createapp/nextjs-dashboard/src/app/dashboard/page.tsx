//http://localhost:3000/dashboard
// 'use client';
import { fetchUsers } from "@/app/lib/data"

export default async function Page() {
    // const pathname = usePathname(); // Get the current path
    type User = Awaited<ReturnType<typeof fetchUsers>>[number];
    const users = await fetchUsers();
  return (
    <>
        <p>Dashboard Page</p>

        <p>Kết nối db trực tuyến trên vercel bằng Prisma</p>

        <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}