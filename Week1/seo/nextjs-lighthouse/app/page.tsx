'use client';

import { useState } from "react";

export default function Home() {
  // State lưu URL người dùng muốn chụp
  const [targetUrl, setTargetUrl] = useState("");
  // State lưu đường dẫn ảnh kết quả để hiển thị
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl) return;

    setLoading(true);

    // nếu không có http/https thì tự thêm https://
    const normalizedUrl = targetUrl.startsWith("http://") || targetUrl.startsWith("https://")
      ? targetUrl
      : `https://${targetUrl}`;

    const apiUrl = `/api/og-screenshot?url=${encodeURIComponent(normalizedUrl)}`;

    setPreviewUrl(`${apiUrl}&t=${Date.now()}`);
    setShareLink(`${window.location.origin}${apiUrl}`);
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <h1>Công cụ Test Social Preview</h1>
      <p>Nhập URL bất kỳ để kiểm tra API chụp ảnh tự động.</p>

      <form onSubmit={handleGenerate} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Nhập URL (ví dụ: https://google.com)"
          value={targetUrl}
          onChange={(e) => setTargetUrl(e.target.value)}
          required
          style={{ flex: 1, padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 20px', cursor: 'pointer', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 5 }}
        >
          {loading ? "Đang chụp..." : "Tạo Preview"}
        </button>
      </form>

      <div style={{ border: '1px dashed #ccc', padding: 20, borderRadius: 10, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f9f9' }}>
        {previewUrl ? (
          /* 
             Ở đây ta dùng thẻ <img> thông thường thay vì Next Image 
             vì nguồn ảnh là API trả về Buffer trực tiếp, không phải file tĩnh.
          */
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={previewUrl} 
            alt="Preview result" 
            style={{ maxWidth: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: 8 }}
            onLoad={() => setLoading(false)}
            onError={() => {
              alert("Lỗi: Không thể chụp ảnh. Kiểm tra lại URL hoặc Terminal Server.");
              setLoading(false);
            }}
          />
        ) : (
          <p style={{ color: '#888' }}>Kết quả sẽ hiện ở đây (Kích thước chuẩn 1200x630)</p>
        )}
      </div>
      
      {previewUrl && (
        <div style={{ marginTop: 20, background: '#eee', padding: 10, borderRadius: 5 }}>
          <strong>Link API cho Bot (Copy bỏ vào thẻ meta):</strong>
          <code style={{ display: 'block', wordBreak: 'break-all', marginTop: 5 }}>
            {window.location.origin}{previewUrl.split('&t=')}
          </code>
        </div>
      )}

      {shareLink && (
        <div style={{ marginTop: 20 }}>
          <strong>Link dùng để share:</strong>
          <input
            value={shareLink}
            readOnly
            style={{ width: "100%", padding: 10 }}
          />
        </div>
      )}
    </div>
  );
}
