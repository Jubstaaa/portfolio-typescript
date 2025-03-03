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
      name: "mediaId",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "content",
      type: "textarea",
    },

    {
      name: "projectCategoryId",
      type: "relationship",
      relationTo: "projectCategories",
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        await revalidatePaths([
          { path: "/" },
          { path: "/portfolio" },
          { path: `/portfolio/${doc.slug}` },
        ]);
      },
    ],
  },
};
