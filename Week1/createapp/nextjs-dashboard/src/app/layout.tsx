import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Sidebar from "@/app/components/sidebar/Sidebar";
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"
    className="mdl-js"
    >
      <body className={`${inter.className} antialiased`}>
        <Sidebar />

        <div style={{ marginLeft: 250 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
