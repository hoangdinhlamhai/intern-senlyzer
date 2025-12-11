'use client';

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function Pagination({
  currentPage,
  totalPages,
  query,
  basePath = "/dashboard",
}: {
  currentPage: number;
  totalPages: number;
  query?: string;
  basePath?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());

    if (query) params.set("query", query);
    if (!query) params.delete("query");

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        style={{
          padding: "6px 12px",
          borderRadius: "5px",
          background: currentPage <= 1 ? "#ddd" : "#f0f0f0",
          cursor: currentPage <= 1 ? "not-allowed" : "pointer",
        }}
      >
        Prev
      </button>

      {/* Page Numbers */}
      <span style={{ alignSelf: "center" }}>
        Trang <strong>{currentPage}</strong> / {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        style={{
          padding: "6px 12px",
          borderRadius: "5px",
          background: currentPage >= totalPages ? "#ddd" : "#f0f0f0",
          cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next
      </button>
    </div>
  );
}
