'use client';

import styles from './Pricing.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function PricingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handlePayment = async () => {
    const email = session?.user?.email;

    if (!email) {
      alert('Bạn cần đăng nhập trước khi thanh toán');
      router.push('/');
      return;
    }

    const res = await fetch('/api/payment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email
      }),
    });

    if (!res.ok) {
      alert('Không tạo được đơn thanh toán');
      return;
    }

    const data = await res.json();

    //CHUYỂN SANG TRANG PAYMENT 
    router.push(`/payment?orderId=${data.transferContent}`);
  };

  if (status === 'loading') {
    return <div className={styles.container}>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Pricing</h1>
      <p className={styles.subheading}>Choose an affordable plan that fits your needs</p>

      <div className={styles.grid}>
        {/* Pro */}
        <div className={`${styles.card} ${styles.popular}`}>
          <div className={styles.badge}>MOST POPULAR</div>
          <h2 className={styles.plan}>Pro</h2>
          <p className={styles.desc}>For large websites with 5,000+ unique pages</p>
          <div className={styles.price}><strong>50.000 VND</strong> /month</div>
          <div className={styles.discount}>50% OFF</div>
          <ul className={styles.features}>
            <li>✓ 100 images/month</li>
            <li>✓ Unlimited websites</li>
          </ul>
          <button 
            onClick={handlePayment}
            disabled={!session} 
            className={styles.cta}>
              Get started
          </button>
        </div>

        {/* Enterprise */}
        <div className={styles.card}>
          <h2 className={styles.plan}>Basic</h2>
          <p className={styles.desc}>Dedicated support and infrastructure for your company</p>
          <div className={styles.price}>Contact us</div>
          <ul className={styles.features}>
            <li>✓ 10 images/month</li>
            <li>✓ Unlimited websites</li>
          </ul>
          <Link style={{ marginTop: 36 }} href="/" className={styles.cta}>Get started</Link>
        </div>
      </div>
    </div>
  );
}
