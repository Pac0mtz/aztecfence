type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

function thumb(src: string, ext: "webp" | "jpg") {
  const base = src.replace("/images/", "/images/thumbs/").replace(/\.jpe?g$/i, "");
  return ext === "webp" ? `${base}.webp` : `${base}.jpg`;
}

function optimized(src: string, width: 640 | 1280) {
  return src.replace("/images/", "/images/optimized/").replace(/\.jpe?g$/i, `-${width}.webp`);
}

export default function SiteImage({ src, alt, className, priority = false, width, height }: Props) {
  const jpeg = /\.jpe?g$/i.test(src);
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : "auto";
  if (!jpeg) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        width={width}
        height={height}
      />
    );
  }
  return (
    <picture className="block h-full w-full">
      {priority && <source media="(max-width: 767px)" srcSet={optimized(src, 640)} type="image/webp" />}
      <source srcSet={priority ? optimized(src, 1280) : thumb(src, "webp")} type="image/webp" />
      <img
        src={priority ? src : thumb(src, "jpg")}
        alt={alt}
        className={className}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        width={width}
        height={height}
      />
    </picture>
  );
}
