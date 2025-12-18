"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
    const { data: session } = useSession();

    return (
    <header className={styles.header}>
        <div className={styles.container}>
            {/* Logo */}
            <div className={styles.logo}>
            <span className={styles.logoBlack}>image</span>
            <Link href="/" className={styles.logoRed}>.Senlyzer</Link>
            </div>


            {/* Navigation */}
            <nav className={styles.nav}>
            <Link href="/demo">Demo</Link>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/pricing">Pricing</Link>
            </nav>


            {/* Action */}
            <Link
                href={session ? "/dashboard" : "#"}   // nếu chưa login, href chỉ là #
                className={styles.dashboardBtn}
                onClick={(e) => {
                    if (!session) {
                    e.preventDefault();             // ngăn chuyển trang
                    alert("Bạn cần đăng nhập trước khi truy cập Dashboard!");
                    }
                }}
            >
                Dashboard
            </Link>


            {session ? (
                <>
                    <span>{session?.user?.email}</span>
                    <button onClick={() => signOut()}>Logout</button>
                </>
                ) : (
                    <button onClick={() => signIn("google")}>
                        Login
                    </button>
            )}
        </div>
    </header>
    );
}