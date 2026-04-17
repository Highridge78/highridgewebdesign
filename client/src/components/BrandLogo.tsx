import { cn } from "@/lib/utils";

type BrandLogoVariant = "header" | "footer";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export default function BrandLogo({
  variant = "header",
  className,
  imgClassName,
  priority = false,
}: BrandLogoProps) {
  const isFooter = variant === "footer";

  return (
    <picture className={cn("inline-flex items-center", className)}>
      <source
        srcSet={
          isFooter
            ? "/logo-main-footer-40.avif 1x, /logo-main-footer-80.avif 2x"
            : "/logo-main-56.avif 1x, /logo-main-112.avif 2x"
        }
        type="image/avif"
      />
      <source
        srcSet={
          isFooter
            ? "/logo-main-footer-40.webp 1x, /logo-main-footer-80.webp 2x"
            : "/logo-main-56.webp 1x, /logo-main-112.webp 2x"
        }
        type="image/webp"
      />
      <img
        src={isFooter ? "/logo-main-footer-40.webp" : "/logo-main-56.webp"}
        alt="Highridge Web Design Logo"
        className={cn(
          "w-auto object-contain",
          isFooter ? "h-8 md:h-9 opacity-95" : "h-9 md:h-12",
          imgClassName
        )}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
      />
    </picture>
  );
}
