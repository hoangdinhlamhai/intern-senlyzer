import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

//metadata: KHÔNG default
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {

  // 🔑 Decode slug -> URL gốc
  const originalUrl = Buffer
    .from(params.slug, "base64")
    .toString("utf-8");

  const ogImageUrl =
    `https://intern-senlyzer-screenshoots.vercel.app/api/og-screenshot?url=${encodeURIComponent(
      originalUrl
    )}`;

  return {
    title: `Preview ${originalUrl}`,
    openGraph: {
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}


// page:default export
export default function Page({ params }: Props) {
  return (
    <main>
      <h1>Bài viết {params.slug}</h1>
    </main>
  );
}
