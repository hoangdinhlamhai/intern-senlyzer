import Sidebar from "@/app/components/Sidebar/Sidebar";
import styles from "./layout.module.css";


export default function DashboardLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
        return (
            <div className={styles.wrapper}>
                <Sidebar />
                <main className={styles.main}>{children}</main>
            </div>
        );
}