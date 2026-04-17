import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIsMobile } from "@/hooks/useMobile";
import type { ReactNode, CSSProperties } from "react";
import { useEffect, useState } from "react";

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
  const isMobile = useIsMobile();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  const shouldReduceMotion = isMobile || prefersReducedMotion;
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({
    disabled: shouldReduceMotion,
  });

  const effectiveDistance = shouldReduceMotion ? 0 : distance;
  const effectiveDuration = shouldReduceMotion ? 0 : duration;
  const effectiveDelay = shouldReduceMotion ? 0 : delay;

  const directionMap: Record<string, CSSProperties> = {
    up: { transform: `translateY(${effectiveDistance}px)` },
    down: { transform: `translateY(-${effectiveDistance}px)` },
    left: { transform: `translateX(${effectiveDistance}px)` },
    right: { transform: `translateX(-${effectiveDistance}px)` },
    none: { transform: "none" },
  };

  const hiddenStyle: CSSProperties = {
    opacity: 0,
    ...directionMap[direction],
    transition: `opacity ${effectiveDuration}ms ease-out ${effectiveDelay}ms, transform ${effectiveDuration}ms ease-out ${effectiveDelay}ms`,
  };

  const visibleStyle: CSSProperties = {
    opacity: 1,
    transform: "translateY(0) translateX(0)",
    transition: `opacity ${effectiveDuration}ms ease-out ${effectiveDelay}ms, transform ${effectiveDuration}ms ease-out ${effectiveDelay}ms`,
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
