"use client";

import styles from "./Sidebar.module.css";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <ul>
        <li><Link href="/">Trang chủ</Link></li>
        <li><Link href="/dashboard">Fetch data</Link></li>
        <li><Link href="/dashboard/customers">Test Router</Link></li>
      </ul>
    </aside>
  );
}
