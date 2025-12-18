'use client';

import styles from './HowItWorks.module.css';
import Link from 'next/link';

export default function HowItWorks() {
  return (
    <div className={styles.container}>
      <h2 className={styles.label}>How it works</h2>
      <h1 className={styles.heading}>One line of code to get more clicks</h1>
      <Link href="/signup" className={styles.cta}>Get started now</Link>

      <div className={styles.steps}>
        <div className={styles.step}>
          <h3>Step 1</h3>
          <p>Add the site for which you want to generate a social preview.</p>
          <p>You’ll receive a dynamic preview URL like:</p>
          <code className={styles.code}>
            &lt;meta property="og:image" content="your_url" /&gt;
          </code>
        </div>

        <div className={styles.step}>
          <h3>Step 2</h3>
          <p>Implement one line of code on your website.</p>
          <p>Example, to add preview to <code>/blogs/article-1</code>:</p>
          <code className={styles.code}>
            &lt;meta property="og:image" content="https://image.senlyzer/get?url=yourwebsite.com/blogs/article-1" /&gt;
          </code>
        </div>
      </div>
    </div>
  );
}
