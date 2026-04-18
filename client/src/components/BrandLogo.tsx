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
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src="/images/fradys-logo.png"
        alt="Frady's Flooring logo featuring Ott Frady caricature"
        className={cn(
          "w-auto object-contain",
          variant === "footer" ? "h-12 md:h-14" : "h-14 md:h-16",
          imgClassName
        )}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        width={variant === "footer" ? 148 : 168}
        height={variant === "footer" ? 160 : 192}
      />
    </span>
  );
}
