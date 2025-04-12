import { BlogService } from "@/lib/services";
import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Image from "next/image";
import dayjs from "dayjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | İlker Balcılar",
  description:
    "Read the latest articles on software development, web technologies, and industry trends. Join me as I share insights, tutorials, and experiences from my journey as a developer.",
};

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
    <div className="flex flex-col gap-4 lg:gap-12">
      <h1 className="text-primary text-3xl lg:text-6xl font-semibold leading-9 lg:leading-20 text-center tracking-tighter">
        Discover my work, passions, and development journey
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {blogs.map((item) => (
          <Card href={item.slug} key={item.id} classNames={{ body: "p-0" }}>
            <Image
              className="w-full min-h-60 max-h-60 object-cover rounded-lg"
              src={item.media.url}
              alt={item.media.alt}
              width={800}
              height={800}
            />
            <div className="w-full h-full flex flex-col justify-between p-6 min-h-52">
              <div className="flex flex-col">
                <p className="text-[#999999] font-medium">
                  {dayjs(item.date).format("MMMM DD,  YYYY")}
                </p>
                <h3 className="text-lg font-semibold">{item.name}</h3>
              </div>

              <div className="w-full flex justify-between items-center">
                {item.slug && (
                  <Button href={item.slug} icon="f7:chevron-right">
                    Discover More
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default page;
