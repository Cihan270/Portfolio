"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * Loads only the animation features the site uses and makes every
 * animation respect the visitor's reduced-motion setting.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
