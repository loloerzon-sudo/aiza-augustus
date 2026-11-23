import React from 'react';
import { motion, MotionValue, useMotionTemplate } from 'framer-motion';

interface SpecularGlareProps {
  glareX: MotionValue<string>;
  glareY: MotionValue<string>;
  glareOpacity: MotionValue<number>;
  borderRadius?: string;
}

export const SpecularGlare: React.FC<SpecularGlareProps> = ({
  glareX,
  glareY,
  glareOpacity,
  borderRadius = 'inherit',
}) => {
  const background = useMotionTemplate`radial-gradient(circle 280px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.42) 0%, rgba(255, 248, 235, 0.15) 35%, transparent 75%)`;

  return (
    <motion.div
      style={{
        background,
        opacity: glareOpacity,
        borderRadius,
      }}
      className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 mix-blend-overlay"
    />
  );
};
