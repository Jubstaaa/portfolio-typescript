import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { Stack } from "./collections/Stack";
import { Project } from "./collections/Project";
import { ProjectCategory } from "./collections/ProjectCategory";
import { Media } from "./collections/Media";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { Image } from "./collections/Image";
import { Users } from "./collections/User";
import { Skill } from "./collections/Skill";
import { Experience } from "./collections/Experience";
import { Social } from "./collections/Social";
import { Education } from "./collections/Education";
import { Blog } from "./collections/Blog";
import { BlogCategory } from "./collections/BlogCategory";

export default buildConfig({
  editor: lexicalEditor(),

  collections: [
    Users,
    Stack,
    Project,
    ProjectCategory,
    Media,
    Image,
    Skill,
    Social,
    Experience,
    Education,
    Blog,
    BlogCategory,
  ],
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },

      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],

  secret: process.env.PAYLOAD_SECRET || "",

  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),

  sharp,
});
