import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

//metadata: KHÔNG default
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const postUrl = `https://my-app.com/posts/${params.slug}`;

  const ogImageUrl = `https://my-app.com/api/og-screenshot?url=${encodeURIComponent(
    postUrl
  )}`;

  return {
    title: `Bài viết ${params.slug}`,
    openGraph: {
      images: [ogImageUrl],
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
