import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Image from "next/image";
import { ProjectService } from "@/lib/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Portfolio | İlker Balcılar",
  description:
    "Explore my portfolio showcasing a collection of my best web development and software engineering projects. See how I apply my skills and technology stack to deliver innovative solutions.",
};

async function page() {
  const projects = await ProjectService.findMany({
    include: {
      projectCategory: true,
      media: true,
    },
  });

  return (
    <div className="flex flex-col gap-4 lg:gap-12">
      <h1 className="text-primary text-3xl lg:text-6xl font-semibold leading-9 lg:leading-20 text-center tracking-tighter">
        Explore my awesome works
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {projects.map((item) => (
          <Card
            href={item.slug}
            key={item.id}
            classNames={{ body: "p-6 h-[400px] gradient-radial" }}
          >
            <div className="w-full h-full flex flex-col gap-9 justify-end relative z-50">
              <h3 className="text-white text-lg font-semibold">{item.name}</h3>
              <div className="w-full flex justify-between items-center">
                {item.slug && (
                  <Button href={item.slug} icon="f7:chevron-right">
                    Case
                  </Button>
                )}
                <span className="font-secondary text-[#e2e8f0]">
                  {item.projectCategory.name}
                </span>
              </div>
            </div>

            <Image
              className="absolute inset-0 w-full h-full object-cover"
              src={item.media.url}
              alt={item.media.alt}
              width={800}
              height={800}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default page;
