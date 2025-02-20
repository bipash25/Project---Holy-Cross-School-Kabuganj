export function generateResponsiveImage(src: string): string {
  if (!src) return "";

  // Handle already processed images (e.g. from URLs)
  if (src.startsWith("http")) return src;

  try {
    // For local images, use Vite's import.meta.url feature
    const imageUrl = new URL(src, import.meta.url).href;
    return imageUrl;
  } catch (e) {
    console.error("Error generating responsive image:", e);
    return src;
  }
}

export function getSrcSet(src: string): string {
  if (!src) return "";

  // Handle already processed images
  if (src.startsWith("http")) return src;

  try {
    const widths = [320, 640, 960, 1280, 1920];
    const srcSet = widths
      .map((w) => {
        const imageUrl = new URL(`${src}?w=${w}&format=webp`, import.meta.url)
          .href;
        return `${imageUrl} ${w}w`;
      })
      .join(", ");
    return srcSet;
  } catch (e) {
    console.error("Error generating srcset:", e);
    return src;
  }
}

export function getImageProps(src: string, alt: string = "") {
  return {
    src: generateResponsiveImage(src),
    srcSet: getSrcSet(src),
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    loading: "lazy" as const,
    decoding: "async" as const,
    alt,
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
