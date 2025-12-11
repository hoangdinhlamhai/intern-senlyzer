import Link from "next/link";
import Search from "@/app/components/search/Search";
import { fetchUsersPaginated } from "@/app/lib/data";
import Pagination from "@/app/components/Pagination";

export default async function Page(
  props
: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query = "", page = "1" } = await props.searchParams;
  const currentPage = Number(page) || 1;
  const limit = 5;

  const { users, totalPages } = await fetchUsersPaginated(
    currentPage,
    limit,
    query
  );

  return (
    <>
      <p>Dashboard Page</p>

      <Search placeholder="Tìm kiếm người dùng..." />

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/dashboard"
        query={query}
      />

      <Link
        href="/dashboard/customers/create"
      >
        Create New Customer
      </Link>
    </>
  );
}
