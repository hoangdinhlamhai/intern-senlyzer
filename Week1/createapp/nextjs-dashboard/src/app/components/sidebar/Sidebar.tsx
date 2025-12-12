// "use client";

// import styles from "./Sidebar.module.css";
// import Link from "next/link";

// export default function Sidebar() {
//   return (
//     <aside className={styles.sidebar}>
//       <ul>
//         <li><Link href="/">Trang chủ</Link></li>
//         <li><Link href="/dashboard">Fetch data</Link></li>
//         <li><Link href="/dashboard/customers">Test Router</Link></li>
//         <li><Link href="/login">Test Login</Link></li>
//       </ul>
//     </aside>
//   );
// }
import styles from "./Sidebar.module.css";
import Link from "next/link";
import { auth, signOut } from '../../../../auth'; 

export default async function Sidebar() {
  // Lấy thông tin session (cookies) ngay trên server
  const session = await auth();
  const isLoggedIn = !!session?.user; // Kiểm tra xem user có tồn tại không

  return (
    <aside className={styles.sidebar}>
      <ul>
        <li><Link href="/">Trang chủ</Link></li>
        <li><Link href="/dashboard">Fetch data</Link></li>
        <li><Link href="/dashboard/customers">Test Router</Link></li>

        {/* Logic hiển thị theo trạng thái đăng nhập */}
        {!isLoggedIn ? (
          // Trường hợp 1: Chưa đăng nhập -> Hiện Link Login
          <li>
             <Link href="/login">Test Login</Link>
          </li>
        ) : (
          // Trường hợp 2: Đã đăng nhập -> Hiện Nút Logout
          <li>
            {/* [1] Dùng Form và Server Action để đăng xuất */}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" }); // Đăng xuất xong về trang login
              }}
            >
              <button type="submit" className={styles.logoutBtn}>
                Đăng xuất
              </button>
            </form>
          </li>
        )}
      </ul>
    </aside>
  );
}