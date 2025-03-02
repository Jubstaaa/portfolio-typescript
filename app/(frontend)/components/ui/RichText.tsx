import React from "react";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from "@payloadcms/richtext-lexical/react";

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
});

export default function RichText(
  props: {
    data: SerializedEditorState;
  } & React.HTMLAttributes<HTMLDivElement>
) {
  return <RichTextWithoutBlocks converters={jsxConverters} {...props} />;
}
