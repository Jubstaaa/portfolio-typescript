import { CollectionConfig } from "payload";

export const ProjectCategory: CollectionConfig = {
  slug: "projectCategories",
  dbName: "projectCategories",
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
