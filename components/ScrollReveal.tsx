import type { ReactNode } from "react";

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
  delay: _delay = 0,
  direction: _direction = "up",
  distance: _distance = 30,
  duration: _duration = 700,
}: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
