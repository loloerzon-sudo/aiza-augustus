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
    // Start flap animation, then trigger full letter reveal
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8 select-none">
      
      {/* Intro prompt above envelope */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-[#606C4E] font-serif font-semibold">
          You Are Cordially Invited
        </p>
        <h2 className="font-script text-4xl sm:text-5xl text-[#4A5438] mt-1">
          Aiza & Augustus
        </h2>
        <p className="text-[11px] text-[#838769] tracking-widest uppercase mt-0.5 font-sans">
          February 27, 2027 · Cavite, Philippines
        </p>
      </motion.div>

      {/* 3D Envelope Container */}
      <div 
        onClick={handleOpen}
        className="relative w-[320px] sm:w-[420px] h-[220px] sm:h-[280px] cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
        style={{ perspective: 1200 }}
      >
        {/* Shadow under envelope */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-[#4A5438]/15 blur-xl rounded-full" />

        {/* Envelope Back Panel */}
        <div className="absolute inset-0 bg-[#E8E4DC] rounded-2xl shadow-xl overflow-hidden border border-[#D5CFCE]">
          {/* Inner envelope paper liner (delicate botanical olive tint) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D8DEC9]/50 via-[#E8E4DC] to-[#E8E4DC] opacity-70" />
        </div>

        {/* Letter Preview Tucked Inside (slides up when opening) */}
        <motion.div
          animate={opening || isOpened ? { y: -120, scale: 0.95 } : { y: 0, scale: 0.9 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-4 top-3 bottom-3 bg-[#FAF8F5] rounded-xl shadow-md border border-[#838769]/25 p-4 flex flex-col items-center justify-center text-center z-10"
        >
          <div className="border border-[#838769]/20 w-full h-full rounded-lg p-3 flex flex-col items-center justify-center">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#606C4E] font-serif font-semibold">
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
          <svg className="w-full h-full" viewBox="0 0 420 280" preserveAspectRatio="none">
            {/* Left triangle flap */}
            <polygon points="0,0 0,280 210,140" fill="#E2DDD5" opacity="0.9" />
            {/* Right triangle flap */}
            <polygon points="420,0 420,280 210,140" fill="#DDD8CF" opacity="0.9" />
            {/* Bottom triangle flap */}
            <polygon points="0,280 420,280 210,120" fill="#D5CFC5" />
          </svg>
        </div>

        {/* Envelope Front Top Flap (Opens with 3D Flip) */}
        <motion.div
          animate={opening || isOpened ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: 'top', transformStyle: 'preserve-3d' }}
          className="absolute top-0 left-0 right-0 h-[140px] z-30 pointer-events-none"
        >
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 420 140" preserveAspectRatio="none">
            <polygon points="0,0 420,0 210,140" fill="#EDE9E1" stroke="#DCD6CC" strokeWidth="1" />
          </svg>
        </motion.div>

        {/* Gold Wax Seal (Centers on flap point) */}
        <motion.div
          animate={opening || isOpened ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="absolute left-1/2 top-[125px] sm:top-[125px] -translate-x-1/2 -translate-y-1/2 z-40"
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
            <div className="absolute inset-0 rounded-full bg-white/20 blur-xs pointer-events-none" />
          </div>
        </motion.div>

      </div>

      {/* Action / Hint Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={handleOpen}
        disabled={opening || isOpened}
        className="mt-10 py-3 px-8 rounded-full bg-[#4A5438] hover:bg-[#3D452E] text-[#FAF8F5] text-xs font-sans tracking-[0.25em] uppercase font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2 group"
      >
        <Sparkles size={14} className="text-[#C5A880] group-hover:rotate-12 transition-transform" />
        <span>{opening ? 'Opening Letter...' : 'Tap To Open Letter'}</span>
      </motion.button>

    </div>
  );
};
