import { revalidatePaths } from "@/lib/actions";
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
  hooks: {
    afterChange: [
      async () => {
        await revalidatePaths([{ path: "/portfolio", type: "layout" }]);
      },
    ],
    afterDelete: [
      async () => {
        await revalidatePaths([{ path: "/portfolio", type: "layout" }]);
      },
    ],
  },
};
