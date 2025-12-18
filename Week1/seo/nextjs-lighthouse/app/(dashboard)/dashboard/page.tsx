'use client';

import { useState } from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [sites, setSites] = useState<{ url: string; image: string }[]>([
    { url: "https://google.com", image: "/fake/google-preview.png" },
    { url: "https://facebook.com", image: "/fake/facebook-preview.png" },
  ]); // fake data
  const [quota, setQuota] = useState(5); // số lần tạo site còn lại (fake)
  const [showPopup, setShowPopup] = useState(false);

  // logic tạo preview
  const [targetUrl, setTargetUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl) return;
    setLoading(true);

    const normalizedUrl =
      targetUrl.startsWith("http://") || targetUrl.startsWith("https://")
        ? targetUrl
        : `https://${targetUrl}`;

    const apiUrl = `/api/og-screenshot?url=${encodeURIComponent(normalizedUrl)}`;
    const preview = `${apiUrl}&t=${Date.now()}`;
    setPreviewUrl(preview);
    setShareLink(`${window.location.origin}${apiUrl}`);

    // fake lưu vào database
    setSites([...sites, { url: normalizedUrl, image: preview }]);
    setQuota(quota - 1);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <div className={styles.quota}>Remaining quota: {quota}</div>
        <button className={styles.addButton} onClick={() => setShowPopup(true)}>
          + Add Site
        </button>
      </header>

      {/* Danh sách site */}
      <div className={styles.siteList}>
        {sites.map((site, idx) => (
          <div key={idx} className={styles.siteItem}>
            <div className={styles.siteInfo}>
              <strong>{site.url}</strong>
              <p>{site.image}</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.image} alt="preview" className={styles.previewImg} />

            {/* Nút xoá */}
            <button
              className={styles.deleteBtn}
              onClick={() => {
                const newSites = sites.filter((_, i) => i !== idx);
                setSites(newSites);
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>


      {/* Popup */}
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h2>Add new site</h2>
            <form onSubmit={handleGenerate} className={styles.form}>
              <input
                type="text"
                placeholder="Enter website URL"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                required
                className={styles.input}
              />
              <button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? "Generating..." : "Generate Preview"}
              </button>
            </form>

            {loading && <p className={styles.loadingText}>Đang generate ảnh, vui lòng chờ...</p>}

            {previewUrl && (
              <div className={styles.previewBox}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl} alt="Preview" 
                  onLoad={() => setLoading(false)}/>
                <p>Link: {shareLink}</p>
              </div>
            )}

            <button className={styles.closeBtn} onClick={() => setShowPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
