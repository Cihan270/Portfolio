"use client";

import { m } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds. Use small values (0.05–0.3) for staggered groups. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
}

/** Gentle fade-and-rise when an element first scrolls into view. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
