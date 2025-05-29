import { revalidatePaths } from "@/lib/actions";
import { CollectionConfig } from "payload";

export const BlogCategory: CollectionConfig = {
  slug: "blogCategories",
  dbName: "blogCategories",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        await revalidatePaths([{ path: "/blog/[slug]", type: "page" }]);
      },
    ],
    afterDelete: [
      async () => {
        await revalidatePaths([{ path: "/blog/[slug]", type: "page" }]);
      },
    ],
  },
};
