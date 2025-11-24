import React from 'react';

function addImageResizeParams(
  imageUrl: string,
  width: number | string,
  height: number | string
): string {
  try {
    let url;
    if (imageUrl.startsWith("/")) {
      url = new URL(imageUrl, "http://dummy-base");
    } else {
      url = new URL(imageUrl);
    }
    url.searchParams.set('width', width.toString());
    url.searchParams.set('height', height.toString());
    url.searchParams.set('quality', '75');
    url.searchParams.set('resize', 'contain');
    // For relative urls, strip out the origin
    if (imageUrl.startsWith("/")) {
      return url.pathname + url.search;
    }
    return url.toString();
  } catch {
    return imageUrl;
  }
}

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  priority?: boolean;
};

function Image({ src, width = 400, height = 400, alt, priority, ...props }: ImageProps) {
  const resizedSrc = addImageResizeParams(src, width, height);

  return (
    <img
      src={resizedSrc}
      alt={alt}
      loading={priority ? "eager" : props.loading}
      fetchPriority={priority ? "high" : "auto"}   
      {...props}
    />
  );
}

export default Image;
