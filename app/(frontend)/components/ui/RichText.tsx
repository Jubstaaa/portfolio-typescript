import React from "react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from "@payloadcms/richtext-lexical/react";
import { MediaService } from "@/lib/services";
import Lightbox from "./LightBox";

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
        id: true,
      },
    });
    if (media) {
      return (
        <Lightbox src={media.url} alt={media.alt} id={media.id} />
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
