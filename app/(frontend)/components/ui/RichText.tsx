import React from "react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from "@payloadcms/richtext-lexical/react";
import { MediaService } from "@/lib/services";
import Image from "next/image";

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: async ({ node }) => {
    const media = await MediaService.findUnique({
      where: {
        id: String(node.value),
      },
      select: {
        url: true,
        alt: true,
      },
    });
    if (media) {
      return (
        <Image
          className="w-full h-auto object-contain rounded-large"
          src={media.url}
          width={1000}
          height={1000}
          alt={media.alt || "İlker Balcilar Portfolio Site Image"}
        />
      );
    }
  },
});

export default function RichText(
  props: {
    data: SerializedEditorState;
  } & React.HTMLAttributes<HTMLDivElement>
) {
  return <RichTextWithoutBlocks converters={jsxConverters} {...props} />;
}
