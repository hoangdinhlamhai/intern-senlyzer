'use client';

import styles from './Pricing.module.css';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Pricing</h1>
      <p className={styles.subheading}>Choose an affordable plan that fits your needs</p>

      <div className={styles.grid}>
        {/* Starter */}
        <div className={styles.card}>
          <h2 className={styles.plan}>Starter</h2>
          <p className={styles.desc}>For simple websites with less than 30 unique pages</p>
          <div className={styles.price}>$9 → <strong>$4.5</strong> /month</div>
          <div className={styles.discount}>50% OFF</div>
          <ul className={styles.features}>
            <li>✓ 1,000 new images/month</li>
            <li>✓ Unlimited websites</li>
          </ul>
          <Link href="/signup" className={styles.cta}>Get started</Link>
        </div>

        {/* Growth */}
        <div className={styles.card}>
          <h2 className={styles.plan}>Growth</h2>
          <p className={styles.desc}>Suitable for websites with 300 to 1,000 unique pages</p>
          <div className={styles.price}>$29 → <strong>$14.5</strong> /month</div>
          <div className={styles.discount}>50% OFF</div>
          <ul className={styles.features}>
            <li>✓ 3,000 images/month</li>
            <li>✓ Unlimited websites</li>
          </ul>
          <Link href="/signup" className={styles.cta}>Get started</Link>
        </div>

        {/* Pro */}
        <div className={`${styles.card} ${styles.popular}`}>
          <div className={styles.badge}>MOST POPULAR</div>
          <h2 className={styles.plan}>Pro</h2>
          <p className={styles.desc}>For large websites with 5,000+ unique pages</p>
          <div className={styles.price}>$99 → <strong>$49.5</strong> /month</div>
          <div className={styles.discount}>50% OFF</div>
          <ul className={styles.features}>
            <li>✓ 30,000 images/month</li>
            <li>✓ Unlimited websites</li>
          </ul>
          <Link href="/signup" className={styles.cta}>Get started</Link>
        </div>

        {/* Enterprise */}
        <div className={styles.card}>
          <h2 className={styles.plan}>Enterprise</h2>
          <p className={styles.desc}>Dedicated support and infrastructure for your company</p>
          <div className={styles.price}>Contact us</div>
          <ul className={styles.features}>
            <li>✓ Unlimited images/month</li>
            <li>✓ Unlimited websites</li>
          </ul>
          <Link style={{ marginTop: 36 }} href="/signup" className={styles.cta}>Get started</Link>
        </div>
      </div>
    </div>
  );
}
