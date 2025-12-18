import Link from "next/link";
import styles from "./Header.module.css";


export default function Header() {
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
            <Link href="/dashboard" className={styles.dashboardBtn}>
            Dashboard
            </Link>
        </div>
    </header>
    );
}