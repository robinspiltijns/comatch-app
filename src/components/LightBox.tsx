"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import image2 from "../public/house.jpg";
import { useState } from "react";
// ...

const images = [
  image2,
  // ...
];

export default function LightBox() {
  const [open, setOpen] = useState(true);
  const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
  const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

  function nextImageUrl(src: string, size: number) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
  }

  const slides = images.map(({ src, width, height }) => ({
    width,
    height,
    src: nextImageUrl(src, width),
    srcSet: imageSizes
      .concat(...deviceSizes)
      .filter((size) => size <= width)
      .map((size) => ({
        src: nextImageUrl(src, size),
        width: size,
        height: Math.round((height / width) * size),
      })),
  }));

  // ...

  return (
    <Lightbox
      open={open}
      close={() => setOpen(false)}
      slides={slides}
      plugins={[Zoom]}
    />
  );
}
