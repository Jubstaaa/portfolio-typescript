import { CollectionConfig } from "payload";
import sharp from "sharp";
import { randomUUID } from "crypto";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
  },
  upload: true,
  fields: [
    {
      name: "url",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "alt",
      type: "text",
    },
  ],
  hooks: {
    beforeOperation: [
      async (req) => {
        if (req.operation === "create" && req.req.file) {
          const file = req.req.file;
          const uniqueFileName = `${randomUUID()}.webp`;

          const optimizedBuffer = await sharp(file.data)
            .resize(1920)
            .webp({ quality: 80 })
            .toBuffer();

          file.data = optimizedBuffer;
          file.mimetype = "image/webp";
          file.name = uniqueFileName;
        }
      },
    ],
    afterChange: [
      async ({ doc }) => {
        if (doc.filename) {
          const baseUrl = "https://blob.vercel-storage.com/uploads/";
          return {
            ...doc,
            url: `${baseUrl}${doc.filename}`,
          };
        }
        return doc;
      },
    ],
  },
};
