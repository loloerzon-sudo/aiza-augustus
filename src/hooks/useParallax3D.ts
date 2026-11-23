import { useState, useEffect, useRef } from 'react';
import { useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

interface UseParallax3DOptions {
  maxTilt?: number; // Maximum tilt angle in degrees (default 7)
  disabled?: boolean;
}

export interface Parallax3DResult {
  ref: React.RefObject<HTMLDivElement | null>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  glareX: MotionValue<string>;
  glareY: MotionValue<string>;
  glareOpacity: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
  isTouch: boolean;
}

export function useParallax3D({
  maxTilt = 7,
  disabled = false,
}: UseParallax3DOptions = {}): Parallax3DResult {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Raw normalized mouse coordinates (-1 to 1)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHovered = useMotionValue(0);

  // Smooth spring physics for natural tactile feel
  const springConfig = { stiffness: 240, damping: 22, mass: 0.8 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothHover = useSpring(isHovered, { stiffness: 200, damping: 25 });

  // Map to 3D rotation angles
  const rotateX = useTransform(smoothY, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-1, 1], [-maxTilt, maxTilt]);

  // Specular Glare position and opacity
  const glareX = useTransform(smoothX, [-1, 1], ['20%', '80%']);
  const glareY = useTransform(smoothY, [-1, 1], ['20%', '80%']);
  const glareOpacity = useTransform(smoothHover, [0, 1], [0, 0.45]);

  useEffect(() => {
    // Detect touch / mobile screen
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsTouch(touchQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    touchQuery.addEventListener('change', handler);
    return () => touchQuery.removeEventListener('change', handler);
  }, []);

  // When disabled (e.g. unsealing animation active), spring back to center
  useEffect(() => {
    if (disabled) {
      x.set(0);
      y.set(0);
      isHovered.set(0);
    }
  }, [disabled, x, y, isHovered]);

  // Autonomous breathing sway on mobile touch devices
  useEffect(() => {
    if (!isTouch || disabled) return;

    let frameId: number;
    const startTime = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      // Smooth sinusoidal orbital motion
      const currentX = Math.sin(elapsed * 0.7) * 0.45;
      const currentY = Math.cos(elapsed * 0.9) * 0.35;

      x.set(currentX);
      y.set(currentY);
      isHovered.set(0.65); // soft ambient glare visible on mobile

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isTouch, disabled, x, y, isHovered]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouch) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);

    // Clamp between -1 and 1
    const clampedX = Math.max(-1, Math.min(1, mouseX));
    const clampedY = Math.max(-1, Math.min(1, mouseY));

    x.set(clampedX);
    y.set(clampedY);
    isHovered.set(1);
  };

  const onMouseLeave = () => {
    if (disabled || isTouch) return;
    x.set(0);
    y.set(0);
    isHovered.set(0);
  };

  return {
    ref,
    rotateX,
    rotateY,
    glareX,
    glareY,
    glareOpacity,
    onMouseMove,
    onMouseLeave,
    isTouch,
  };
}
