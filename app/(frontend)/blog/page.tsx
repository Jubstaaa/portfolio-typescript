import { BlogService } from "@/lib/services";
import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Image from "next/image";

async function page() {
  const blogs = await BlogService.findMany({
    select: {
      id: true,
      media: true,
      name: true,
      date: true,
      slug: true,
    },
  });

  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-primary text-6xl font-semibold leading-20 text-center tracking-tighter">
        Explore guides and lessons for improved construction accomplishments.
      </h1>
      <div className="grid grid-cols-3 gap-5">
        {blogs.map((item) => (
          <Card
            key={item.id}
            classNames={{ body: "p-6 h-[400px] gradient-radial" }}
          >
            <div className="w-full h-full flex flex-col gap-9 justify-end relative z-50">
              <h3 className="text-white text-lg font-semibold">{item.name}</h3>
              <div className="w-full flex justify-between items-center">
                {item.slug && (
                  <Button href={`/blog/${item.slug}`} icon="f7:chevron-right">
                    Case
                  </Button>
                )}
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
