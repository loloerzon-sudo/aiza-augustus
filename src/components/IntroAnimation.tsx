import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto transition to letter after 3.2s
    const timer = setTimeout(() => {
      handleComplete();
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F7F8F4] px-6 text-center select-none"
        >
          {/* Subtle botanical corner decoration */}
          <div className="absolute top-8 left-8 opacity-40 pointer-events-none">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke="#606C4E" strokeWidth="2">
              <path d="M10,90 Q40,40 90,10" />
              <path d="M40,50 Q45,35 60,35 Q65,45 50,55" fill="#838769" opacity="0.3" />
              <path d="M60,30 Q70,20 80,25 Q80,35 70,40" fill="#838769" opacity="0.3" />
            </svg>
          </div>
          <div className="absolute bottom-8 right-8 opacity-40 pointer-events-none rotate-180">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke="#606C4E" strokeWidth="2">
              <path d="M10,90 Q40,40 90,10" />
              <path d="M40,50 Q45,35 60,35 Q65,45 50,55" fill="#838769" opacity="0.3" />
              <path d="M60,30 Q70,20 80,25 Q80,35 70,40" fill="#838769" opacity="0.3" />
            </svg>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xs md:text-sm uppercase tracking-[0.35em] text-[#606C4E] font-serif font-medium mb-4"
          >
            Save The Date
          </motion.p>

          {/* Bride Name */}
          <motion.h1
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-script text-7xl md:text-9xl text-[#4A5438] leading-none mb-1 tracking-wide"
          >
            Aiza
          </motion.h1>

          {/* Rings / Ampersand Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, type: 'spring', stiffness: 200 }}
            className="my-1 flex items-center justify-center gap-3 text-[#838769]"
          >
            <span className="w-8 h-[1px] bg-[#838769]/30"></span>
            <div className="relative flex items-center">
              {/* Interlocking Rings SVG */}
              <svg width="34" height="22" viewBox="0 0 40 26" fill="none" className="text-[#C5A880]">
                <ellipse cx="15" cy="13" rx="10" ry="10" stroke="currentColor" strokeWidth="2" />
                <ellipse cx="25" cy="13" rx="10" ry="10" stroke="currentColor" strokeWidth="2" strokeDasharray="50" strokeDashoffset="12" />
                <polygon points="15,2 17,5 13,5" fill="currentColor" />
              </svg>
            </div>
            <span className="w-8 h-[1px] bg-[#838769]/30"></span>
          </motion.div>

          {/* Groom Name */}
          <motion.h1
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-script text-7xl md:text-9xl text-[#4A5438] leading-none mt-1 tracking-wide"
          >
            Augustus
          </motion.h1>

          {/* Tagline & Date */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="mt-6 flex flex-col items-center"
          >
            <p className="text-[11px] md:text-xs tracking-[0.25em] text-[#7D8469] uppercase font-sans mb-1">
              Are Getting Married
            </p>
            <p className="text-sm md:text-base font-serif tracking-[0.18em] text-[#4A5438] font-semibold">
              Saturday · 27 February 2027
            </p>
          </motion.div>

          {/* Skip / Tap button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.6 }}
            onClick={handleComplete}
            className="absolute bottom-10 py-2.5 px-6 rounded-full text-xs font-sans tracking-[0.2em] uppercase text-[#606C4E] hover:text-[#4A5438] bg-white/60 hover:bg-white border border-[#838769]/20 shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>View Envelope</span>
            <Heart size={12} className="fill-[#C5A880] text-[#C5A880]" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
