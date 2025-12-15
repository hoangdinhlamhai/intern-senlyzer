import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export default async function generateMetadata({ params }: Props): Promise<Metadata> {
    const postUrl = `https://my-app.com/posts/${params.slug}`;

    //url gọi api chụp ảnh
      const ogImageUrl = `https://my-app.com/api/og-screenshot?url=${encodeURIComponent(postUrl)}`;

    return {
        title: `Bài viết ${params.slug}`,
        openGraph: {
        images: [ogImageUrl], // Đây chính là output từ API chụp ảnh
        },
    };

}