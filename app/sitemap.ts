import { BlogService, ProjectService } from "@/lib/services";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = await BlogService.findMany({
    select: {
      date: true,
      slug: true,
    },
  });

  const projects = await ProjectService.findMany({
    select: {
      slug: true,
    },
  });

  return [
    {
      url: "https://ilkerbalcilar.com",
      lastModified: new Date(),
    },
    {
      url: "https://ilkerbalcilar.com/bio",
      lastModified: new Date(),
    },
    {
      url: "https://ilkerbalcilar.com/portfolio",
      lastModified: new Date(),
    },
    {
      url: "https://ilkerbalcilar.com/stack",
      lastModified: new Date(),
    },
    {
      url: "https://ilkerbalcilar.com/blog",
      lastModified: new Date(),
    },
    ...blogs.map((blog) => ({
      url: `https://ilkerbalcilar.com${blog.slug}`,
      lastModified: blog.date,
    })),
    ...projects.map((project) => ({
      url: `https://ilkerbalcilar.com${project.slug}`,
      lastModified: new Date(),
    })),
  ];
}
