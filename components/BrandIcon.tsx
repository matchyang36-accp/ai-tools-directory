type BrandIconProps = {
  className?: string;
  priority?: boolean;
};

export default function BrandIcon({
  className = "h-7 w-7",
  priority = false,
}: BrandIconProps) {
  return (
    <img
      src="/brand-icon.png"
      alt=""
      width={256}
      height={256}
      className={`shrink-0 object-contain ${className}`}
      aria-hidden="true"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
