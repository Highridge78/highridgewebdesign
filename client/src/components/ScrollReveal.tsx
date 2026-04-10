import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { ReactNode, CSSProperties } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 30,
  duration = 700,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const directionMap: Record<string, CSSProperties> = {
    up: { transform: `translateY(${distance}px)` },
    down: { transform: `translateY(-${distance}px)` },
    left: { transform: `translateX(${distance}px)` },
    right: { transform: `translateX(-${distance}px)` },
    none: { transform: "none" },
  };

  const hiddenStyle: CSSProperties = {
    opacity: 0,
    ...directionMap[direction],
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
  };

  const visibleStyle: CSSProperties = {
    opacity: 1,
    transform: "translateY(0) translateX(0)",
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={isVisible ? visibleStyle : hiddenStyle}
    >
      {children}
    </div>
  );
}
