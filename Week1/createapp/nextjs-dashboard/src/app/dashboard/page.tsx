// //http://localhost:3000/dashboard
// import { fetchUsers } from "@/app/lib/data"
// import Search from "@/app/components/search/Search";

// export default async function Page(
//   {
//     searchParams,
//   }: {
//     searchParams?: { query?: string };
//   }
// ) {
//     type User = Awaited<ReturnType<typeof fetchUsers>>[number];
//     const query = searchParams?.query?.toLowerCase() || "";
//     // const users = await fetchUsers();
//     const users = (await fetchUsers()).filter((user) =>
//       //nếu null thì fallback về chuỗi rỗng để tránh lỗi khi gọi toLowerCase
//     (user.name ?? "").toLowerCase().includes(query) ||
//     (user.email ?? "").toLowerCase().includes(query)
//   );

//   return (
//     <>
//         <p>Dashboard Page</p>

//         <Search placeholder="Tìm kiếm người dùng..." />
//         <p>Kết nối db trực tuyến trên vercel bằng Prisma</p>

//         <table className="user-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Tên</th>
//             <th>Email</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((user: User) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }
import Search from "@/app/components/search/Search";
import { fetchUsersPaginated } from "@/app/lib/data";
import Pagination from "@/app/components/Pagination";

export default async function Page(
  props
: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  // const query = searchParams?.query?.toLowerCase() ?? "";
  // const currentPage = Math.max(1, Number(searchParams?.page || 1));
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
    </>
  );
}
