import Badge from "@/app/(frontend)/components/ui/Badge";
import React from "react";
import Card from "@/app/(frontend)/components/ui/Card";
import Image from "@/app/(frontend)/components/ui/Image";
import { notFound } from "next/navigation"; 
import { Metadata } from "next";
import { BlogService } from "@/lib/services";
import RichText from "../../components/ui/RichText";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import dayjs from "dayjs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const blog = await BlogService.findUnique({
    where: {
      slug: slug,
    },
    include: {
      media: true,
    },
  });

  if (!blog) {
    notFound();
  }

  return {
    title: `${blog.name} | Blog | İlker Balcılar`,
    description: blog.description,
    openGraph: {
      title: blog.name,
      description: blog.description ?? undefined,
      type: "article",
      publishedTime: blog.date.toISOString(),
      authors: ["İlker Balcılar"],
      url: `https://ilkerbalcilar.com${blog.slug}`,
      siteName: "İlker Balcılar",
      images: [
        {
          url: blog.media.url,
          width: 1024,
          height: 1024,
          alt: blog.media.alt,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: blog.name,
      description: blog.description ?? undefined,
      creator: "@jubstaa_dev",
      images: [blog.media.url],
    },
  };
}

export async function generateStaticParams() {
  const blogs = await BlogService.findMany();

  return blogs.map((item) => ({
    slug: item.slug,
  }));
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const blog = await BlogService.findUnique({
    where: {
      slug: slug,
    },
    include: {
      blogCategory: true,
      media: true,
    },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-0 lg:gap-12">
      <div className="flex flex-col items-start justify-start gap-6 p-3 lg:p-12">
        <div className="flex items-center justify-between lg:justify-start gap-6 w-full">
          <Badge size="lg" color="blue" classNames={{ body: "normal-case" }}>
            {blog.blogCategory.name}
          </Badge>
          <span className="font-medium">
            {dayjs(blog.date).format("MMMM DD,  YYYY")}
          </span>
        </div>
        <div className="flex flex-col justify-start items-start gap-4">
          <h1 className="text-primary text-3xl lg:text-6xl font-semibold leading-9 lg:leading-20 text-start lg:text-center tracking-tighter">
            {blog.name}
          </h1>
          <p className="text-[22px] font-medium">{blog.description}</p>
        </div>
      </div>
      <Card
        classNames={{
          body: "max-w-5xl w-full mx-auto px-3 lg:px-6 gap-0 lg:gap-6",
        }}
        whileHover={false}
      >
        {blog.content && (
          <div className="max-w-full w-full prose prose-slate">
            <RichText data={blog.content as unknown as SerializedEditorState} />
          </div>
        )}
      </Card>
      <div className="w-full h-[600px] absolute inset-0 -z-10 before:content-[] before:bg-gradient-to-b before:from-sky-100/60 before:to-slate-100 before:w-full before:h-full before:absolute before:inset-0">
        <Image
          className="w-full h-full object-cover"
          src={blog.media.url}
          alt={blog.media.alt}
          width={1000}
          height={1000}
          priority
        />
      </div>
    </div>
  );
}

export default page;
