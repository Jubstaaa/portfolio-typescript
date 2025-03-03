import { revalidatePaths } from "@/lib/actions";
import { CollectionConfig } from "payload";

export const Education: CollectionConfig = {
  slug: "educations",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "department",
      type: "text",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "startDate",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      type: "date",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "mediaId",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        await revalidatePaths([{ path: "/bio" }]);
      },
    ],
  },
};
