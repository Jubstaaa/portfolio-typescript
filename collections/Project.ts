import { revalidatePaths } from "@/lib/actions";
import { CollectionConfig } from "payload";

export const Project: CollectionConfig = {
  slug: "projects",
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
      name: "order",
      type: "number",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "sourceUrl",
      type: "text",
    },
    {
      name: "previewUrl",
      type: "text",
    },
    {
      name: "logoId",
      type: "upload",
      relationTo: "media",
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
    },

    {
      name: "projectCategoryId",
      type: "relationship",
      relationTo: "projectCategories",
      required: true,
    },
    {
      name: "stackIds",
      type: "relationship",
      relationTo: "stacks",
      hasMany: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await revalidatePaths([
          { path: "/" },
          { path: "/portfolio" },
          { path: doc.slug },
        ]);
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        await revalidatePaths([
          { path: "/" },
          { path: "/portfolio" },
          { path: doc.slug },
        ]);
      },
    ],
  },
};
