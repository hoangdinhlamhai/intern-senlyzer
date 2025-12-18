import Link from "next/link";
import styles from "./Sidebar.module.css";
import { Home, CreditCard, HelpCircle, ChevronDown } from "lucide-react";


export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            {/* Logo */}
            <div className={styles.logo}>
                <span className={styles.logoBlack}>image</span>
                <span className={styles.logoRed}>.Senlyzer</span>
            </div>


            {/* User */}
            <div className={styles.user}>
                <div className={styles.avatar}>H</div>
                <span className={styles.username}>Hai</span>
                <ChevronDown size={16} />
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