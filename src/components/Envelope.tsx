import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
  isOpened: boolean;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen, isOpened }) => {
  const [opening, setOpening] = useState(false);
  const [flapBack, setFlapBack] = useState(false);

  const handleOpen = () => {
    if (isOpened || opening) return;
    setOpening(true);

    // At 250ms (when flap passes 90 degrees), switch flap behind the letter
    setTimeout(() => {
      setFlapBack(true);
    }, 280);

    // After letter slides out completely, transition to full letter view
    setTimeout(() => {
      onOpen();
    }, 1300);
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
        className="relative w-[320px] sm:w-[440px] h-[230px] sm:h-[290px] cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
        style={{ perspective: 1200 }}
      >
        {/* Soft shadow under envelope */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-7 bg-[#4A5438]/20 blur-xl rounded-full" />

        {/* 1. Envelope Back Panel (z-0) */}
        <div className="absolute inset-0 bg-[#E8E4DC] rounded-2xl shadow-xl overflow-hidden border border-[#D5CFCE] z-0">
          {/* Inner liner wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D8DEC9]/60 via-[#E8E4DC] to-[#E8E4DC] opacity-80" />
        </div>

        {/* 2. Top Flap (Starts at z-30 in front of letter, flips to z-0 BEHIND letter when open) */}
        <motion.div
          animate={opening || isOpened ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ 
            transformOrigin: 'top', 
            transformStyle: 'preserve-3d',
            zIndex: flapBack ? 0 : 30 
          }}
          className="absolute top-0 left-0 right-0 h-[150px] pointer-events-none"
        >
          <svg className="w-full h-full drop-shadow-sm" viewBox="0 0 440 150" preserveAspectRatio="none">
            <polygon 
              points="0,0 440,0 220,150" 
              fill={flapBack ? "#E2DDD5" : "#EDE9E1"} 
              stroke="#DCD6CC" 
              strokeWidth="1" 
            />
          </svg>
        </motion.div>

        {/* 3. Letter Tucked Inside (z-15, slides up to -170px and elevates in front of flap!) */}
        <motion.div
          animate={
            opening || isOpened 
              ? { y: -160, scale: 0.98, zIndex: 25 } 
              : { y: 0, scale: 0.92, zIndex: 10 }
          }
          transition={{ 
            y: { duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.8, delay: 0.25 },
            zIndex: { delay: 0.25 }
          }}
          className="absolute inset-x-4 top-3 bottom-3 bg-[#FAF8F5] rounded-xl shadow-lg border border-[#838769]/30 overflow-hidden flex flex-col items-center text-center"
        >
          {/* Mini preview artwork on the emerging card */}
          <div className="w-full h-24 overflow-hidden relative bg-[#F2F2EC]">
            <img 
              src="/aiza-augustus-artwork.jpg" 
              alt="Artwork preview" 
              className="w-full h-full object-cover object-top opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent" />
          </div>

          <div className="p-3 w-full flex flex-col items-center justify-center flex-1">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#606C4E] font-serif font-semibold">
              Save The Date
            </span>
            <span className="font-script text-2xl sm:text-3xl text-[#4A5438] my-0.5 leading-tight">
              Aiza & Augustus
            </span>
            <span className="text-[10px] text-[#7D8469] font-serif italic">
              Saturday · 27 February 2027
            </span>
          </div>
        </motion.div>

        {/* 4. Envelope Front Pocket (Left, Right, Bottom flaps at z-20) */}
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

        {/* 5. Gold Wax Seal (at z-40, dissolves on open) */}
        <motion.div
          animate={
            opening || isOpened
              ? { scale: 0, opacity: 0 }
              : { scale: [1, 1.04, 1], opacity: 1 }
          }
          transition={
            opening || isOpened
              ? { duration: 0.25 }
              : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          className="absolute left-1/2 top-[135px] -translate-x-1/2 -translate-y-1/2 z-40"
        >
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#9B7B2C] via-[#D4AF37] to-[#F3E5AB] shadow-lg flex items-center justify-center p-1 border-2 border-[#8A6D23]/30">
            <div className="w-full h-full rounded-full border border-[#7A6120]/40 flex flex-col items-center justify-center text-center shadow-inner bg-gradient-to-br from-[#C5A030] to-[#A37E20]">
              <span className="font-serif font-bold text-xs sm:text-sm text-[#46370E] tracking-widest leading-none drop-shadow-xs">
                A&A
              </span>
              <Heart size={9} className="text-[#46370E] fill-[#46370E] mt-0.5" />
            </div>
            <div className="absolute inset-0 rounded-full bg-white/25 blur-xs pointer-events-none" />
          </div>
        </motion.div>

      </div>

      {/* Action Button */}
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
