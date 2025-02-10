interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  ...props
}: OptimizedImageProps) {
  // Convert PNG to WebP if it's a local asset
  const webpSrc = src.includes("/assets/")
    ? src.replace(/\.(png|jpg|jpeg)$/, ".webp")
    : src;

  return (
    <img
      src={webpSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}
