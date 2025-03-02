import { CollectionConfig } from "payload";

export const Blog: CollectionConfig = {
  slug: "blogs",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "mediaId",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "blogCategoryId",
      type: "relationship",
      relationTo: "blogCategories",
      required: true,
    },
  ],
};
