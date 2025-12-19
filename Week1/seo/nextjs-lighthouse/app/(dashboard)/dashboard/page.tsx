'use client';

import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [sites, setSites] = useState<{ id: number; url: string; image: string }[]>([]);
  const [quota, setQuota] = useState(0); // số lần tạo site còn lại (fake)
  const [showPopup, setShowPopup] = useState(false);

  // logic tạo preview
  const [targetUrl, setTargetUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const fetchSites = async () => {
    const res = await fetch("/api/sites");
    const data = await res.json();
    setSites(data.sites);
    setQuota(data.quota);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl) return;
    setLoading(true);

    const normalizedUrl =
      targetUrl.startsWith("http://") || targetUrl.startsWith("https://")
        ? targetUrl
        : `https://${targetUrl}`;

    const apiUrl = `/api/og-screenshot?url=${encodeURIComponent(normalizedUrl)}`;
    // const preview = `${apiUrl}&t=${Date.now()}`;
    const res = await fetch(apiUrl, { redirect: "follow" });

    // lấy URL cloudinary thật
    const cloudinaryUrl = res.url;
    // const preview = apiUrl;
    // setPreviewUrl(preview);
    // setShareLink(`${window.location.origin}${apiUrl}`);
    setPreviewUrl(cloudinaryUrl);
    setShareLink(cloudinaryUrl);

    await fetch("/api/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: normalizedUrl,
        image: cloudinaryUrl,
      }),
    });

    await fetchSites();
  };

  

  const handleDelete = async (id: number) => {
    // if (!confirm("Are you sure you want to delete this site?")) return;

    await fetch(`/api/sites?id=${id}`, { method: "DELETE" });
    fetchSites();
  };

  useEffect(() => {
    fetch("/api/sites")
      .then(res => res.json())
      .then(data => {
        setSites(data.sites);
        setQuota(data.quota);
      });
  }, []);


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <div className={styles.quota}>Remaining quota: {quota}</div>
        <button
          className={styles.addButton}
          disabled={quota <= 0}
          onClick={() => setShowPopup(true)}
        >
          + Add Site
        </button>

      </header>

      {/* Danh sách site */}
      <div className={styles.siteList}>
        {sites.map((site, idx) => (
          <div key={idx} className={styles.siteItem}>
            <div className={styles.siteInfo}>
              <strong style={{display: "block"}}>{site.url}</strong>
              <a
                href={site.image}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.previewLink}
              >
                Click here to get Image
              </a>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.image} alt="preview" className={styles.previewImg} />

            {/* Nút xoá */}
            <button
              className={styles.deleteBtn}
              onClick={() => {
                const newSites = sites.filter((_, i) => i !== idx);
                setSites(newSites);
                handleDelete(site.id)
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
                  {shareLink && (
                    <a
                      href={shareLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.previewLink}
                    >
                      Click here to get Image
                    </a>
                  )}
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
