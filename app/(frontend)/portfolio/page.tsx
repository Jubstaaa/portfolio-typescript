import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Image from "next/image";
import { ProjectService } from "@/lib/services";

async function page() {
  const projects = await ProjectService.findMany({
    include: {
      projectCategory: true,
      media: true,
    },
  });

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-primary text-6xl font-semibold leading-20 text-center tracking-tighter">
        Explore my awesome works
      </h1>

      <div className="grid grid-cols-3 gap-5">
        {projects.map((item) => (
          <Card
            href={`/portfolio/${item.slug}`}
            key={item.id}
            classNames={{ body: "p-6 h-[400px] gradient-radial" }}
          >
            <div className="w-full h-full flex flex-col gap-9 justify-end relative z-50">
              <h3 className="text-white text-lg font-semibold">{item.name}</h3>
              <div className="w-full flex justify-between items-center">
                {item.slug && (
                  <Button
                    href={`/portfolio/${item.slug}`}
                    icon="f7:chevron-right"
                  >
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
              alt={item.name}
              width={400}
              height={400}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default page;
