"use client";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { Home, CreditCard, HelpCircle } from "lucide-react";
import { useSession } from "next-auth/react";


export default function Sidebar() {
    const { data: session } = useSession();

    const name = session?.user?.name ?? "User";
    const email = session?.user?.email ?? "";

    return (
        <aside className={styles.sidebar}>
            {/* Logo */}
            <div className={styles.logo}>
                <span className={styles.logoBlack}>image</span>
                <span className={styles.logoRed}>.Senlyzer</span>
            </div>


            {/* User */}
            <div className={styles.user}>
                <div className={styles.userInfo}>
                    <span style={{display: "inline-block"}} className={styles.username}>{name}</span>
                    <span className={styles.email}>{email}</span>
                </div>
            </div>



            {/* Menu */}
            <nav className={styles.menu}>
                <Link href="/dashboard" className={`${styles.item} ${styles.active}`}>
                <Home size={18} />
                    Dashboard
                </Link>


                <Link href="/billing" className={styles.item}>
                <CreditCard size={18} />
                    Billing
                </Link>
            </nav>


            {/* Footer link */}
            <div className={styles.footer}>
                <Link href="/how-it-works" className={styles.footerLink}>
                <HelpCircle size={18} />
                    How it works
                </Link>
            </div>
        </aside>
    );
}