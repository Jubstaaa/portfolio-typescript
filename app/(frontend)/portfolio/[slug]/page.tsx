import Badge from "@/app/(frontend)/components/ui/Badge";
import React from "react";
import Card from "@/app/(frontend)/components/ui/Card";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProjectService } from "@/lib/services";
import Tooltip from "../../components/ui/Tooltip";
import { Icon } from "@iconify/react";
import RichText from "../../components/ui/RichText";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

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
      media: true,
    },
  });

  if (!project) {
    notFound();
  }

  return {
    title: `${project.name} | Portfolio | İlker Balcılar`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description ?? undefined,
      type: "article",
      authors: ["İlker Balcılar"],
      url: `https://ilkerbalcilar.com${project.slug}`,
      siteName: "İlker Balcılar",
      images: [
        {
          url: project.media.url,
          width: 1024,
          height: 1024,
          alt: project.media.alt,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: project.name,
      description: project.description ?? undefined,
      creator: "@jubstaa_dev",
      images: [project.media.url],
    },
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
      stacks: true,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-0 lg:gap-12">
      <div className="flex flex-col items-start justify-start gap-6 p-3 lg:p-12">
        <Badge size="lg" color="blue" classNames={{ body: "normal-case" }}>
          {project.projectCategory.name}
        </Badge>

        <div className="flex flex-col justify-start items-start gap-4">
          <h1 className="text-primary text-3xl lg:text-6xl font-semibold leading-9 lg:leading-20 text-start lg:text-center tracking-tighter">
            {project.name}
          </h1>
          <div className="flex gap-1.5 lg:gap-3 flex-wrap">
            {project.sourceUrl && (
              <Tooltip
                target="_blank"
                href={project.sourceUrl}
                content={"Source Code"}
                className="w-5 lg:w-9 h-5 lg:h-9 flex items-center justify-center rounded-lg overflow-hidden text-white bg-primary"
              >
                <Icon
                  icon="mdi:link-variant"
                  className="w-3 lg:w-5 h-3 lg:h-5"
                />
              </Tooltip>
            )}
            {project.previewUrl && (
              <Tooltip
                target="_blank"
                href={project.previewUrl}
                content="Preview"
                className="w-9 h-9 flex items-center justify-center rounded-lg overflow-hidden text-white bg-primary"
              >
                <Icon icon="mdi:play" width="20" height="20" />
              </Tooltip>
            )}

            {project.stacks.map((item) => (
              <Tooltip
                key={item.id}
                content={item.name}
                className="w-9 h-9 flex items-center justify-center rounded-lg overflow-hidden text-white"
                style={{ backgroundColor: item.color }}
              >
                <Icon icon={item.icon} width="20" height="20" />
              </Tooltip>
            ))}
          </div>
          <h3 className="text-[22px] font-medium">{project.description}</h3>
        </div>
      </div>
      <Card
        classNames={{
          body: "max-w-5xl w-full mx-auto px-3 lg:px-6 gap-0 lg:gap-6",
        }}
        whileHover={false}
      >
        {project.content && (
          <div className="max-w-full w-full prose prose-slate">
            <RichText
              data={project.content as unknown as SerializedEditorState}
            />
          </div>
        )}
      </Card>
    </div>
  );
}

export default page;
