import { cn } from "@/lib/utils";

type BrandLogoVariant = "header" | "footer";
const FRADYS_LOGO_SRC = "/files/fradys-logo.png";

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
  priority = false
}: BrandLogoProps) {
  const isFooter = variant === "footer";

  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src={FRADYS_LOGO_SRC}
        alt="Fradys Flooring logo"
        className={cn(
          "w-auto object-contain",
          isFooter ? "h-12 md:h-14 opacity-95" : "h-14 md:h-16",
          imgClassName
        )}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        width={312}
        height={399}
      />
    </span>
  );
}
