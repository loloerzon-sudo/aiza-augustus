import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  isOpened: boolean;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen, isOpened }) => {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (isOpened || opening) return;
    setOpening(true);
    // Smooth 1.2s transition: seal pops -> flap opens -> letter slides out
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 select-none">
      
      {/* Intro prompt above envelope */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#606C4E] font-serif font-semibold">
          You Are Cordially Invited
        </p>
        <p className="text-xs text-[#7D8469] tracking-[0.25em] uppercase mt-1.5 font-sans">
          Save The Date
        </p>
      </motion.div>

      {/* 3D Envelope Container */}
      <div 
        onClick={handleOpen}
        className="relative w-[320px] sm:w-[440px] h-[230px] sm:h-[290px] cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
        style={{ perspective: 1200 }}
      >
        {/* Shadow under envelope */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-7 bg-[#4A5438]/20 blur-xl rounded-full" />

        {/* Envelope Back Panel */}
        <div className="absolute inset-0 bg-[#E8E4DC] rounded-2xl shadow-xl overflow-hidden border border-[#D5CFCE]">
          {/* Inner envelope paper liner (soft botanical watercolor wash) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D8DEC9]/60 via-[#E8E4DC] to-[#E8E4DC] opacity-80" />
        </div>

        {/* Letter Preview Tucked Inside (slides up when opening) */}
        <motion.div
          animate={opening || isOpened ? { y: -130, scale: 0.96 } : { y: 0, scale: 0.9 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-4 top-3 bottom-3 bg-[#FAF8F5] rounded-xl shadow-md border border-[#838769]/25 p-4 flex flex-col items-center justify-center text-center z-10"
        >
          <div className="border border-[#838769]/20 w-full h-full rounded-lg p-3 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#606C4E] font-serif font-semibold">
              Save The Date
            </span>
            <span className="font-script text-3xl sm:text-4xl text-[#4A5438] my-1">
              Aiza & Augustus
            </span>
            <span className="text-[10px] text-[#7D8469] font-serif italic">
              Viridis Countryside Garden
            </span>
          </div>
        </motion.div>

        {/* Envelope Left & Right Side Folds (SVGs) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <svg className="w-full h-full" viewBox="0 0 440 290" preserveAspectRatio="none">
            {/* Left triangle flap */}
            <polygon points="0,0 0,290 220,145" fill="#E2DDD5" opacity="0.95" />
            {/* Right triangle flap */}
            <polygon points="440,0 440,290 220,145" fill="#DDD8CF" opacity="0.95" />
            {/* Bottom triangle flap */}
            <polygon points="0,290 440,290 220,130" fill="#D5CFC5" />
          </svg>
        </div>

        {/* Envelope Front Top Flap (Opens with 3D Flip) */}
        <motion.div
          animate={opening || isOpened ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
          className="absolute top-0 left-0 right-0 h-[150px] z-30 pointer-events-none"
        >
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 440 150" preserveAspectRatio="none">
            <polygon points="0,0 440,0 220,150" fill="#EDE9E1" stroke="#DCD6CC" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Gold Wax Seal (Centers on flap point with subtle pulse) */}
        <motion.div
          animate={
            opening || isOpened
              ? { scale: 0, opacity: 0 }
              : { scale: [1, 1.04, 1], opacity: 1 }
          }
          transition={
            opening || isOpened
              ? { duration: 0.3 }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          className="absolute left-1/2 top-[135px] -translate-x-1/2 -translate-y-1/2 z-40"
        >
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#9B7B2C] via-[#D4AF37] to-[#F3E5AB] shadow-lg flex items-center justify-center p-1 border-2 border-[#8A6D23]/30">
            {/* Wax seal outer rim with irregular wax feel */}
            <div className="w-full h-full rounded-full border border-[#7A6120]/40 flex flex-col items-center justify-center text-center shadow-inner bg-gradient-to-br from-[#C5A030] to-[#A37E20]">
              <span className="font-serif font-bold text-xs sm:text-sm text-[#46370E] tracking-widest leading-none drop-shadow-xs">
                A&A
              </span>
              <Heart size={9} className="text-[#46370E] fill-[#46370E] mt-0.5" />
            </div>
            {/* Wax seal shimmer */}
            <div className="absolute inset-0 rounded-full bg-white/25 blur-xs pointer-events-none" />
          </div>
        </motion.div>

      </div>

      {/* Action / Hint Button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={handleOpen}
        disabled={opening || isOpened}
        className="mt-8 py-3.5 px-8 rounded-full bg-[#4A5438] hover:bg-[#3D452E] text-[#FAF8F5] text-xs font-sans tracking-[0.25em] uppercase font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2 group"
      >
        <Sparkles size={15} className="text-[#C5A880] group-hover:rotate-12 transition-transform" />
        <span>{opening ? 'Opening Letter...' : 'Tap To Open Letter'}</span>
      </motion.button>

    </div>
  );
};
