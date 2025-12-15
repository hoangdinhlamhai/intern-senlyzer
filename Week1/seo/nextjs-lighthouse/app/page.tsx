'use client';

import { useState } from "react";

export default function Home() {
  // State lưu URL người dùng muốn chụp
  const [targetUrl, setTargetUrl] = useState("");
  // State lưu đường dẫn ảnh kết quả để hiển thị
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUrl) return;

    setLoading(true);
    
    // Tạo URL gọi đến API của chính mình
    // Lưu ý: Đây là cách Facebook/Zalo sẽ gọi API của bạn
    const apiUrl = `/api/og-screenshot?url=${encodeURIComponent(targetUrl)}`;
    
    // Cập nhật state để thẻ <img> tải ảnh
    // Thêm Date.now() để tránh browser cache ảnh cũ khi test liên tục
    setPreviewUrl(`${apiUrl}&t=${Date.now()}`);
    
    // Giả lập loading (vì thẻ img sẽ tự load, ta chỉ cần show UI)
    // Trong thực tế có thể dùng sự kiện onLoad của thẻ img để tắt loading chính xác hơn
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <h1>Công cụ Test Social Preview</h1>
      <p>Nhập URL bất kỳ để kiểm tra API chụp ảnh tự động.</p>

      <form onSubmit={handleGenerate} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          type="url"
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
    </div>
  );
}
