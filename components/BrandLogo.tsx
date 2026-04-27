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
  const logo = isFooter
    ? {
        avif: "/logo-main-footer-80.avif",
        webp: "/logo-main-footer-80.webp",
        width: 80,
        height: 80,
      }
    : {
        avif: "/logo-main-112.avif",
        webp: "/logo-main-112.webp",
        width: 112,
        height: 112,
      };

  return (
    <span className={cn("inline-flex items-center", className)}>
      <picture>
        <source srcSet={logo.avif} type="image/avif" />
        <source srcSet={logo.webp} type="image/webp" />
        <img
          src={logo.webp}
          alt="High Ridge Web Design"
          className={cn(
            "block w-auto object-contain bg-transparent",
            isFooter ? "max-h-10 md:max-h-12" : "max-h-12 md:max-h-14",
            imgClassName
          )}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          width={logo.width}
          height={logo.height}
        />
      </picture>
    </span>
  );
}
