import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Ban, Lock, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CountdownTimer } from './CountdownTimer';
import { AddToCalendar } from './AddToCalendar';
import { SpecularGlare } from './SpecularGlare';
import { useParallax3D } from '../hooks/useParallax3D';
import artworkImage from '../assets/aiza-augustus-artwork.png';

interface LetterCardProps {
  onReplayIntro: () => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ onReplayIntro }) => {
  const rsvpLink = 'https://forms.gle/i8zzkJ49nSjVE6z76';
  const mapsLink = 'https://maps.google.com/?q=Viridis+Countryside+Garden+Amadeo+Cavite';

  // Gentle 3D Parallax & Specular Glare on the opened letter card
  const {
    ref: parallaxRef,
    rotateX,
    rotateY,
    glareX,
    glareY,
    glareOpacity,
    onMouseMove,
    onMouseLeave,
  } = useParallax3D({
    maxTilt: 4.5,
  });

  const handleRsvpClick = () => {
    // Warm Rustic Countryside confetti burst: terracotta, sunflower gold, golden brown, sage, cream
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#B85D3B', '#E09F3E', '#8C592C', '#6F7D59', '#FAF6EF'],
    });
  };

  return (
    <motion.div
      ref={parallaxRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto py-6 px-4 sm:px-6"
      style={{ perspective: 1200 }}
    >
      {/* Outer Envelope Card Wrapper with 3D Parallax Tilt */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="paper-card relative rounded-3xl shadow-xl shadow-[#5C3D24]/10 border border-[#D2BBA0]/45 overflow-hidden transition-shadow duration-300"
      >
        {/* Specular Paper Glare */}
        <SpecularGlare glareX={glareX} glareY={glareY} glareOpacity={glareOpacity} borderRadius="1.5rem" />
        
        {/* Top Decorative Border in Terracotta & Golden Brown */}
        <div className="h-2 w-full bg-gradient-to-r from-[#B85D3B]/40 via-[#8C592C] to-[#E09F3E]/40" />

        {/* Watercolor Illustration Artwork Banner with MotionSites Settle Zoom */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#F7F0E6]">
          <img
            src={artworkImage}
            alt="Aiza & Augustus Rustic Countryside Wedding Artwork"
            className="w-full h-full object-cover object-center filter saturate-[1.03] in-settle-zoom will-change-transform"
            loading="eager"
          />
          {/* Subtle gradient overlay to blend into the card */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF9] via-transparent to-transparent opacity-95" />
          
          <div 
            style={{ transform: 'translateZ(14px)' }}
            className="absolute top-4 right-4 liquid-glass-warm px-3.5 py-1.5 rounded-full shadow-xs flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-[#8C592C] font-semibold"
          >
            <Sparkles size={11} className="text-[#E09F3E] animate-pulse" />
            <span>Save The Date</span>
          </div>
        </div>

        {/* Letter Content Section */}
        <div className="px-6 sm:px-8 pt-2 pb-8 text-center">
          
          {/* Couple's Names in Romance Script with MotionSites Blur-Rise & Fluid Clamp */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{ transform: 'translateZ(16px)' }}
            className="mb-2"
          >
            <h1 className="fluid-script-display in-blur-rise text-[#5C3D24] tracking-wide my-1">
              Aiza & Augustus
            </h1>
            
            {/* Interlocking Rings in Sunflower Gold */}
            <div className="flex items-center justify-center gap-2 my-1 text-[#E09F3E]">
              <span className="w-6 h-[1px] bg-[#D2BBA0]/40"></span>
              <svg width="26" height="16" viewBox="0 0 40 26" fill="none" className="text-[#E09F3E]">
                <ellipse cx="15" cy="13" rx="10" ry="10" stroke="currentColor" strokeWidth="2" />
                <ellipse cx="25" cy="13" rx="10" ry="10" stroke="currentColor" strokeWidth="2" strokeDasharray="50" strokeDashoffset="12" />
              </svg>
              <span className="w-6 h-[1px] bg-[#D2BBA0]/40"></span>
            </div>

            <p className="font-serif italic text-sm text-[#8C592C]">
              are getting married
            </p>
          </motion.div>

          <div className="w-16 h-[1px] bg-[#D2BBA0]/40 mx-auto my-4" />

          {/* Emotional Invitation Message */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-serif text-base sm:text-lg text-[#422D1D] leading-relaxed max-w-md mx-auto italic px-2"
          >
            &ldquo;With full hearts and so much joy, we invite you to save this special date as we celebrate our love and begin a beautiful new chapter together.&rdquo;
          </motion.p>

          {/* Date & Day Highlight with MotionSites Liquid Glass Finish */}
          <div className="my-6 py-4 px-4 rounded-2xl liquid-glass-warm shadow-xs">
            <p className="text-xs uppercase tracking-[0.25em] text-[#B85D3B] font-medium mb-1">
              Save The Date
            </p>
            <p className="font-serif text-2xl sm:text-3xl text-[#5C3D24] font-bold tracking-wide">
              Saturday, February 27, 2027
            </p>
            <p className="text-xs text-[#8C592C] tracking-wider mt-1 uppercase font-medium">
              Afternoon Ceremony & Reception
            </p>
          </div>

          {/* Live Countdown Timer */}
          <CountdownTimer />

          {/* Venue & Directions */}
          <div className="my-6 text-center">
            <div className="inline-flex items-center justify-center gap-1.5 text-[#5C3D24] font-semibold text-sm mb-1">
              <MapPin size={16} className="text-[#B85D3B]" />
              <span>Viridis Countryside Garden</span>
            </div>
            <p className="text-xs text-[#6F7D59] font-sans font-medium">
              Amadeo, Cavite, Philippines
            </p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#B85D3B] hover:text-[#9E472A] underline underline-offset-4 mt-2 font-medium transition-colors"
            >
              <span>View Location on Google Maps</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="w-full h-[1px] bg-[#D2BBA0]/30 my-6" />

          {/* Important Notes Section */}
          <div className="text-left mb-8">
            <p className="text-[11px] font-sans tracking-[0.25em] text-[#B85D3B] uppercase text-center mb-3.5 font-semibold">
              A Few Important Notes
            </p>

            <div className="space-y-2.5">
              {/* Note 1: Adults Only */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF5ED]/80 backdrop-blur-xs border border-[#D2BBA0]/40 hover:border-[#B85D3B]/40 transition-colors shadow-2xs">
                <div className="p-1.5 rounded-lg bg-white/90 text-[#B85D3B] shrink-0 mt-0.5 shadow-xs">
                  <Ban size={15} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#5C3D24] tracking-wide uppercase">
                    Adults-Only Celebration
                  </h3>
                  <p className="text-xs text-[#523A25] leading-relaxed mt-0.5 font-sans">
                    To allow all our guests to relax and celebrate, our wedding will be strictly for adults. We kindly request no children.
                  </p>
                </div>
              </div>

              {/* Note 2: Plus-One Policy */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF5ED]/80 backdrop-blur-xs border border-[#D2BBA0]/40 hover:border-[#8C592C]/40 transition-colors shadow-2xs">
                <div className="p-1.5 rounded-lg bg-white/90 text-[#8C592C] shrink-0 mt-0.5 shadow-xs">
                  <Users size={15} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#5C3D24] tracking-wide uppercase">
                    Plus-One Policy
                  </h3>
                  <p className="text-xs text-[#523A25] leading-relaxed mt-0.5 font-sans">
                    You may bring only one plus-one. Please ensure you submit their full name via the initial RSVP form below.
                  </p>
                </div>
              </div>

              {/* Note 3: Personal Invitation */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF5ED]/80 backdrop-blur-xs border border-[#D2BBA0]/40 hover:border-[#6F7D59]/40 transition-colors shadow-2xs">
                <div className="p-1.5 rounded-lg bg-white/90 text-[#6F7D59] shrink-0 mt-0.5 shadow-xs">
                  <Lock size={15} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#5C3D24] tracking-wide uppercase">
                    Personal Invitation
                  </h3>
                  <p className="text-xs text-[#523A25] leading-relaxed mt-0.5 font-sans">
                    This announcement is intended for you only. Kindly keep it private and do not forward or share it.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-xs italic text-[#8C592C] font-serif mt-4">
              Further details and your formal invitation will follow.
            </p>
          </div>

          {/* Action CTAs: RSVP in Terracotta & Calendar */}
          <div className="space-y-3 pt-2">
            <a
              href={rsvpLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleRsvpClick}
              className="w-full relative overflow-hidden flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#B85D3B] hover:bg-[#9E472A] text-[#FFFDF9] text-xs font-sans tracking-[0.2em] uppercase font-bold shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              {/* MotionSites button hairline shine */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
              <span>Confirm Initial RSVP</span>
              <ExternalLink size={14} />
            </a>

            <AddToCalendar />
          </div>

          {/* Couple Sign-off */}
          <div className="mt-8 pt-6 border-t border-[#D2BBA0]/30">
            <p className="font-serif italic text-sm text-[#8C592C]">
              With love,
            </p>
            <p className="font-script text-3xl sm:text-4xl text-[#5C3D24] mt-1">
              Aiza & Augustus
            </p>
          </div>

          {/* Replay Intro Link */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onReplayIntro}
              className="inline-flex items-center gap-1.5 text-xs text-[#8C592C] hover:text-[#B85D3B] transition-colors cursor-pointer py-1.5 px-3 rounded-full hover:bg-[#F7F1E7]"
            >
              <RefreshCw size={12} />
              <span>Close & View Envelope Again</span>
            </button>
          </div>

        </div>
      </motion.div>

      {/* Discreet footer */}
      <footer className="text-center mt-6 text-[10px] text-[#8C745E]/80 tracking-wider uppercase font-sans">
        Aiza & Augustus · Save The Date · 2027
      </footer>
    </motion.div>
  );
};
