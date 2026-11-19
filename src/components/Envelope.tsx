import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import artworkImage from '../assets/aiza-augustus-artwork.png';

interface EnvelopeProps {
  onOpen: () => void;
  isOpened: boolean;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen, isOpened }) => {
  const [opening, setOpening] = useState(false);
  const [flapBack, setFlapBack] = useState(false);

  const handleOpen = () => {
    if (isOpened) return;
    if (opening) {
      // If already opening/holding, immediate tap proceeds to full letter card
      onOpen();
      return;
    }
    setOpening(true);

    // At 280ms (when flap passes 90 degrees), switch flap behind the letter
    setTimeout(() => {
      setFlapBack(true);
    }, 280);

    // Hold the open envelope and rising letter for 3.2 seconds so guests can comfortably read
    setTimeout(() => {
      onOpen();
    }, 3200);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] px-4 py-8 select-none">
      
      {/* Intro prompt above envelope in terracotta & sage */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#B85D3B] font-serif font-semibold">
          You Are Cordially Invited
        </p>
        <p className="text-xs text-[#6F7D59] tracking-[0.25em] uppercase mt-1.5 font-sans font-medium">
          Save The Date
        </p>
      </motion.div>

      {/* 3D Envelope Container */}
      <div 
        onClick={handleOpen}
        className="relative w-[320px] sm:w-[440px] h-[230px] sm:h-[290px] cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
        style={{ perspective: 1200 }}
      >
        {/* Soft shadow under envelope in natural wood/earth tone */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-7 bg-[#5C3D24]/20 blur-xl rounded-full" />

        {/* 1. Envelope Back Panel (Warm Parchment Kraft) */}
        <div className="absolute inset-0 bg-[#EFE7D8] rounded-2xl shadow-xl overflow-hidden border border-[#DDCFBC] z-0">
          {/* Inner liner wash with soft sunflower warm tint */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5DEB3]/50 via-[#EFE7D8] to-[#EFE7D8] opacity-80" />
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
              fill={flapBack ? "#E5D9C8" : "#F4ECE1"} 
              stroke="#D8C8B4" 
              strokeWidth="1" 
            />
          </svg>
        </motion.div>

        {/* 3. Letter Tucked Inside (slides up to -175px and elevates in front of flap!) */}
        <motion.div
          animate={
            opening || isOpened 
              ? { y: -175, scale: 0.98, zIndex: 25 } 
              : { y: 0, scale: 0.92, zIndex: 10 }
          }
          transition={{ 
            y: { duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.85, delay: 0.25 },
            zIndex: { delay: 0.25 }
          }}
          className="absolute inset-x-4 top-3 bottom-3 bg-[#FFFDF9] rounded-xl shadow-lg border border-[#C4A682]/40 overflow-hidden flex flex-col items-center text-center"
        >
          {/* Mini preview artwork on the emerging card */}
          <div className="w-full h-24 overflow-hidden relative bg-[#F7F0E6] shrink-0">
            <img 
              src={artworkImage} 
              alt="Rustic Countryside Artwork" 
              className="w-full h-full object-cover object-top opacity-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-transparent" />
          </div>

          <div className="p-3 w-full flex flex-col items-center justify-center flex-1">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#B85D3B] font-serif font-semibold">
              Save The Date
            </span>
            <span className="font-script text-2xl sm:text-3xl text-[#5C3D24] my-0.5 leading-tight">
              Aiza & Augustus
            </span>
            <span className="text-[10px] text-[#755629] font-serif font-semibold">
              Saturday · 27 February 2027
            </span>
            <span className="text-[9px] text-[#6F7D59] font-sans mt-0.5 font-medium">
              Viridis Countryside Garden · Amadeo, Cavite
            </span>
          </div>
        </motion.div>

        {/* 4. Envelope Front Pocket (Parchment kraft folds) */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <svg className="w-full h-full" viewBox="0 0 440 290" preserveAspectRatio="none">
            {/* Left triangle flap */}
            <polygon points="0,0 0,290 220,145" fill="#E8DDD0" opacity="0.95" />
            {/* Right triangle flap */}
            <polygon points="440,0 440,290 220,145" fill="#E2D5C5" opacity="0.95" />
            {/* Bottom triangle flap */}
            <polygon points="0,290 440,290 220,130" fill="#D9CABC" />
          </svg>
        </div>

        {/* 5. Terracotta & Gold Wax Seal (at z-40, dissolves on open) */}
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
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#94381C] via-[#C86438] to-[#EFA274] shadow-lg flex items-center justify-center p-1 border-2 border-[#7E2E14]/30">
            <div className="w-full h-full rounded-full border border-[#6B240F]/30 flex flex-col items-center justify-center text-center shadow-inner bg-gradient-to-br from-[#BD5630] to-[#8C3418]">
              <span className="font-serif font-bold text-xs sm:text-sm text-[#FFF2E8] tracking-widest leading-none drop-shadow-xs">
                A&A
              </span>
              <Heart size={9} className="text-[#FFF2E8] fill-[#FFF2E8] mt-0.5" />
            </div>
            <div className="absolute inset-0 rounded-full bg-white/25 blur-xs pointer-events-none" />
          </div>
        </motion.div>

      </div>

      {/* Action Button in Terracotta */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        onClick={handleOpen}
        disabled={isOpened}
        className="mt-8 py-3.5 px-8 rounded-full bg-[#B85D3B] hover:bg-[#9E472A] text-[#FFFDF9] text-xs font-sans tracking-[0.25em] uppercase font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2 group"
      >
        <Sparkles size={15} className="text-[#E09F3E] group-hover:rotate-12 transition-transform" />
        <span>{opening ? 'Tap To View Full Invitation →' : 'Tap To Open Letter'}</span>
      </motion.button>

      {/* Subtle indicator during hold */}
      {opening && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[11px] text-[#8C745E] mt-2.5 font-sans tracking-wider font-medium"
        >
          Unfolding rustic invitation details...
        </motion.p>
      )}

    </div>
  );
};
