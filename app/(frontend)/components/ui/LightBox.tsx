"use client";

import Image, { ImageProps } from "next/image";
import { cloneElement, useEffect, useState } from "react";
import YetAnotherLightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type LightboxProps = {
  children: React.ReactElement<ImageProps>; // sadece next/image
};

export default function Lightbox({ children }: LightboxProps) {
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const imgSrc = children.props.src;
    if (typeof imgSrc === "string") {
      setImageSrc(imgSrc);
    } else if (typeof imgSrc === "object" && "src" in imgSrc) {
      setImageSrc(imgSrc.src);
    }
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const clickableImage = cloneElement(children, {
    onClick: handleClick,
    style: { cursor: "zoom-in", ...children.props.style },
  });

  return (
    <>
      {clickableImage}
      <YetAnotherLightbox
        open={open}
        close={() => setOpen(false)}
        slides={imageSrc ? [{ src: imageSrc }] : []}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
}
