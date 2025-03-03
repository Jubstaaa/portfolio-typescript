import { revalidatePaths } from "@/lib/actions";
import { CollectionConfig } from "payload";

export const Image: CollectionConfig = {
  slug: "images",
  fields: [
    {
      name: "mediaId",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "order",
      type: "number",
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        await revalidatePaths([{ path: "/" }]);
      },
    ],
  },
};
