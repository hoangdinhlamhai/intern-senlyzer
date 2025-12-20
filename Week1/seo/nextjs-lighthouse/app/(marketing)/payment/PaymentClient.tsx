'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./Payment.module.css";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`/api/payment/status?orderId=${orderId}`);
      if (!res.ok) return;

      const data = await res.json();

      if (data.status === 'SUCCESS') {
        clearInterval(interval);
        router.push('/dashboard');
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [orderId, router]);

  if (!orderId) {
    return <div className={styles.container}>Thiếu orderId</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Thanh toán</h2>

        <div className={styles.qr}>
          <Image src="/QR_Code.png" alt="QR" width={280} height={280} />
        </div>

        <p>Nội dung chuyển khoản:</p>
        <div className={styles.order}>{orderId}</div>

        <div className={styles.loading}>
          Đang chờ thanh toán...
        </div>
      </div>
    </div>
  );
}
