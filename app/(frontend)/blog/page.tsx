import { BlogService } from "@/lib/services";
import React from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Image from "next/image";
import dayjs from "dayjs";

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
            href={`/blog/${item.slug}`}
            key={item.id}
            classNames={{ body: "p-0" }}
          >
            <Image
              className="w-full min-h-60 max-h-60 object-cover rounded-lg"
              src={item.media.url}
              alt={item.name}
              width={400}
              height={400}
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
                  <Button href={`/blog/${item.slug}`} icon="f7:chevron-right">
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
