'use client';

import { useState } from "react";
import styles from "./Demo.module.css";

export default function DemoPage() {
  const [targetUrl, setTargetUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl) return;

    setLoading(true);

    const normalizedUrl =
      targetUrl.startsWith("http://") || targetUrl.startsWith("https://")
        ? targetUrl
        : `https://${targetUrl}`;

    const apiUrl = `/api/og-screenshot?url=${encodeURIComponent(normalizedUrl)}`;
    setPreviewUrl(`${apiUrl}&t=${Date.now()}`);
  };

  return (
    <div className={styles.container}>
      <span className={styles.demoLabel}>Demo</span>
      <h1 className={styles.heading}>
        See for yourself how we can boost your website’s CTA
      </h1>

      <form onSubmit={handleGenerate} className={styles.form}>
        <input
          type="text"
          placeholder="yoursite.com"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          ✨ View demo
        </button>
      </form>

      {loading && <p className={styles.loading}>Generating preview…</p>}

      {previewUrl && (
        <div className={styles.previewBox}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Preview" className={styles.previewImg} 
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        </div>
      )}
    </div>
  );
}
