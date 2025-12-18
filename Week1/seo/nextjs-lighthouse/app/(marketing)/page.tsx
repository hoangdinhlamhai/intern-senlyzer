'use client';

import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./Home.module.css";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  const handleDashboardClick = (e: React.MouseEvent) => {
    if (!session) {
      e.preventDefault();
      alert("Bạn cần đăng nhập để truy cập Dashboard!");
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.container}>
          {/* Left content */}
          <div className={styles.left}>
              <h1>
                Get more clicks<br />
                on social media
              </h1>
              <p>
                Automate social link previews for every page of your website with
                just one line of code—boost your click-through rates now!
              </p>
              <Link href="/dashboard" onClick={handleDashboardClick} className={styles.cta}>
                  Try it now
              </Link>
            </div>


            {/* Right preview */}
            <div className={styles.right}>
              <Image
                src="/imageSenlyzer.png"
                alt="Social preview"
                width={520}
                height={520}
                className={styles.preview}
                priority
              />
          </div>
        </div>
      </section>

      <section className={styles.benefits}>
        <h2>Benefits</h2>
        <p>Why your website deserves better visibility on social media.</p>
        <div className={styles.benefitGrid}>
          <div className={styles.benefit}>
            <h3>🚀 Higher Click-Through Rates</h3>
            <p>Attractive social previews make users more likely to click your links.</p>
          </div>
          <div className={styles.benefit}>
            <h3>🧠 Smarter Branding</h3>
            <p>Consistent visuals across platforms reinforce your brand identity.</p>
          </div>
          <div className={styles.benefit}>
            <h3>⏱️ Save Time</h3>
            <p>No need to manually design preview images for every page.</p>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.container}>
          <h2>Features</h2>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <h3>Easy Integration</h3>
              <p>Just one line of code to enable automated previews.</p>
            </div>
            <div className={styles.feature}>
              <h3>Boost Engagement</h3>
              <p>Eye-catching previews increase your click-through rates.</p>
            </div>
            <div className={styles.feature}>
              <h3>Secure, Reliable</h3>
              <p>Built with modern standards to keep your data safe.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <div className={styles.container}>
          <h2>How it works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span>1</span>
              <h3>Add your site</h3>
              <p>
                Receive a dynamic preview URL like:<br />
                <code>&lt;meta property="og:image" content="https://image.social/get?url=yourwebsite.com/" /&gt;</code>
              </p>
            </div>
            <div className={styles.step}>
              <span>2</span>
              <h3>Insert one line of code</h3>
              <p>
                Add this to your <code>&lt;head&gt;</code> tag:<br />
                <code>&lt;meta property="og:image" content="https://image.social/get?url=yourwebsite.com/blogs/article-1" /&gt;</code>
              </p>
            </div>
          </div>
          <Link href="/dashboard" onClick={handleDashboardClick} className={styles.ctaGlow}>Get started now</Link>
        </div>
      </section>


      <section className={styles.testimonials}>
        <h2>What our users say</h2>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonial}>
            <p>Image.social helped us double our traffic from Twitter!</p>
            <span>- Jane, Marketing Lead</span>
          </div>
          <div className={styles.testimonial}>
            <p>Super easy to set up, and the results are instant.</p>
            <span>- Tom, Startup Founder</span>
          </div>
        </div>
      </section>

      <section className={styles.pricing}>
        <h2>Pricing</h2>
        <div className={styles.pricingGrid}>
          <div className={styles.plan}>
            <h3>Free</h3>
            <p>Perfect for personal projects</p>
            <Link href="/dashboard" onClick={handleDashboardClick} className={styles.cta}>Get Started</Link>
          </div>
          <div className={styles.plan}>
            <h3>Pro</h3>
            <p>For growing businesses</p>
            <Link href="/dashboard" onClick={handleDashboardClick} className={styles.cta}>Upgrade</Link>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© Senlyzer — All rights reserved.</p>
        <nav>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </footer>

    </>
  );
}