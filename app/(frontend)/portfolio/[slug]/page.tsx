import Badge from "@/app/(frontend)/components/ui/Badge";
import React from "react";
import Card from "@/app/(frontend)/components/ui/Card";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProjectService } from "@/lib/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const project = await ProjectService.findUnique({
    where: {
      slug: slug,
    },
    include: {
      projectCategory: true,
    },
  });

  if (!project) {
    notFound();
  }

  return {
    title: project.name,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const projects = await ProjectService.findMany();

  return projects.map((item) => ({
    slug: item.slug,
  }));
}

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const project = await ProjectService.findUnique({
    where: {
      slug: slug,
    },
    include: {
      projectCategory: true,
      media: true,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-start justify-start gap-6 p-12">
        <Badge size="lg" color="blue" classNames={{ body: "normal-case" }}>
          {project.projectCategory.name}
        </Badge>
        <div className="flex flex-col justify-start items-start gap-4">
          <h1 className="text-primary text-6xl font-semibold leading-20 text-center tracking-tighter">
            {project.name}
          </h1>
          <h3 className="text-[22px] font-medium">{project.description}</h3>
        </div>
      </div>
      <Card classNames={{ body: "max-w-5xl w-full mx-auto px-6 gap-6" }}>
        <Image
          className="w-full h-auto object-cover rounded-large aspect-video"
          src={project.media.url}
          alt={project.name}
          width={1000}
          height={1000}
        />
        {project.content && (
          <div className="max-w-full w-full prose prose-slate">
            <MDXRemote source={project.content} />
          </div>
        )}
      </Card>
    </div>
  );
}

export default page;
