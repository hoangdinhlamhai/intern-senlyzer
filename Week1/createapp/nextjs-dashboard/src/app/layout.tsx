import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Sidebar from "@/app/components/sidebar/Sidebar";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
 
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
