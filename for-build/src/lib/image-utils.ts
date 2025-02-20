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

export async function optimizeImage(file: File): Promise<string> {
  try {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");

    // Create an image element
    const img = new Image();
    const imageUrl = URL.createObjectURL(file);

    // Wait for image to load
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });

    // Set canvas dimensions
    canvas.width = img.width;
    canvas.height = img.height;

    // Draw image to canvas
    ctx.drawImage(img, 0, 0);

    // Convert to WebP with quality optimization
    const optimizedDataUrl = canvas.toDataURL("image/webp", 0.8);

    // Clean up
    URL.revokeObjectURL(imageUrl);

    return optimizedDataUrl;
  } catch (error) {
    console.error("Error optimizing image:", error);
    throw error;
  }
}