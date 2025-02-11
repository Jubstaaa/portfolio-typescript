import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

// Import all collections
import { Stack } from "./collections/Stack";
import { Social } from "./collections/Social";
import { Image } from "./collections/Image";
import { Skill } from "./collections/Skill";
import { Experience } from "./collections/Experience";
import { Education } from "./collections/Education";
import { Project } from "./collections/Project";
import { ProjectCategory } from "./collections/ProjectCategory";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [
    Stack,
    Social,
    Image,
    Skill,
    Experience,
    Education,
    Project,
    ProjectCategory,
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "",
  }),
  sharp,
});
