import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  lowQuality?: boolean;
  priority?: boolean;
}

export function Image({
  src,
  alt,
  className,
  fallback = "/src/assets/placeholder.jpg",
  lowQuality = false,
  priority = false,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    const img = new window.Image();
    img.src = src || "";
    img.onload = () => setLoaded(true);
    img.onerror = () => {
      setError(true);
      setCurrentSrc(fallback);
    };
  }, [src, fallback]);

  // Convert image URL to WebP if supported and lowQuality is true
  const imageUrl = lowQuality ? convertToWebP(currentSrc || "") : currentSrc;

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={cn(
        "transition-opacity duration-300",
        !loaded && "opacity-50",
        className,
      )}
      loading={priority ? undefined : "lazy"}
      {...props}
    />
  );
}

// Helper function to convert image URL to WebP
function convertToWebP(url: string): string {
  if (!url) return url;

  // If it's already a WebP image, return as is
  if (url.endsWith(".webp")) return url;

  // If it's an Unsplash image, append WebP parameter
  if (url.includes("unsplash.com")) {
    return `${url}&fm=webp&q=80`;
  }

  // For other images, you might want to implement a server-side conversion
  return url;
}
