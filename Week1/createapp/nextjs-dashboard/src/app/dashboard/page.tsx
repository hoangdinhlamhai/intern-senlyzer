//http://localhost:3000/dashboard
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Page() {
    const pathname = usePathname(); // Get the current path
  return (
    <>
        <p>{pathname}</p>
        <p>Dashboard Page</p>
        <Link href="/dashboard/customers">
          Customer
        </Link>
        <Link href="/dashboard/invoices">
          Invoices
        </Link>
    </>
  );
}