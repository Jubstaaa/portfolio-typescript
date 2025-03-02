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
};
