import { format } from "path";

export function generateResponsiveImage(
  src: string,
  sizes: number[],
): string[] {
  return sizes.map((size) => `${src}?w=${size}&format=webp&q=80`);
}

export function getSrcSet(src: string): string {
  const sizes = [320, 640, 768, 1024, 1280, 1536];
  return sizes
    .map((size) => `${src}?w=${size}&format=webp&q=80 ${size}w`)
      .join(", ");
}

export function getImageProps(src: string) {
  return {
    src: `${src}?format=webp&q=80`,
    srcSet: getSrcSet(src),
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    loading: "lazy" as const,
    decoding: "async" as const,
  };
}

export const imageConfig = {
  eventThumbnail: {
    width: 400,
    height: 300,
    quality: 80,
    format: "webp",
  },
  carouselImage: {
    width: 1920,
    height: 1080,
    quality: 85,
    format: "webp",
  },
  logo: {
    width: 96,
    height: 96,
    quality: 90,
    format: "webp",
  },
};
