import { cn } from "@/lib/utils";

type BrandLogoVariant = "header" | "footer";
const LOGO_PRIMARY_SRC = "/files/fradys-logo.png";
const LOGO_FALLBACK_SRC = "/images/fradys-logo.png";

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
    <span className={cn("inline-flex items-center", className)}>
      <img
        src={LOGO_PRIMARY_SRC}
        alt="Frady's Flooring logo featuring Ott Frady caricature"
        className={cn(
          "w-auto max-w-full object-contain",
          isFooter ? "h-12 md:h-14" : "h-14 md:h-16",
          imgClassName
        )}
        onError={(event) => {
          const image = event.currentTarget;
          if (image.dataset.fallbackApplied === "true") return;
          image.dataset.fallbackApplied = "true";
          image.src = LOGO_FALLBACK_SRC;
        }}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        width={320}
        height={320}
      />
    </span>
  );
}
