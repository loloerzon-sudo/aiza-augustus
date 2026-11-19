import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Ban, Lock, ExternalLink, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CountdownTimer } from './CountdownTimer';
import { AddToCalendar } from './AddToCalendar';

interface LetterCardProps {
  onReplayIntro: () => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ onReplayIntro }) => {
  const rsvpLink = 'https://forms.gle/i8zzkJ49nSjVE6z76';
  const mapsLink = 'https://maps.google.com/?q=Viridis+Countryside+Garden+Amadeo+Cavite';

  const handleRsvpClick = () => {
    // Elegant gold and olive confetti burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#4A5438', '#838769', '#D4AF37', '#FAF8F5', '#C5A880'],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto py-6 px-4 sm:px-6"
    >
      {/* Outer Envelope Card Wrapper */}
      <div className="paper-card rounded-3xl shadow-xl shadow-[#4A5438]/5 border border-[#838769]/25 overflow-hidden transition-all duration-300">
        
        {/* Top Decorative Border */}
        <div className="h-2 w-full bg-gradient-to-r from-[#838769]/30 via-[#4A5438] to-[#838769]/30" />

        {/* Watercolor Illustration Artwork Banner */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F2F2EC]">
          <img
            src="/aiza-augustus-artwork.jpg"
            alt="Aiza and Augustus Wedding Watercolor Illustration"
            className="w-full h-full object-cover object-center filter saturate-[1.02]"
            loading="eager"
          />
          {/* Subtle gradient overlay to blend into the card */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90" />
          
          <div className="absolute top-4 right-4 bg-white/85 backdrop-blur-xs px-3 py-1 rounded-full border border-[#838769]/20 shadow-xs flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-[#4A5438] font-semibold">
            <Sparkles size={11} className="text-[#C5A880]" />
            <span>Save The Date</span>
          </div>
        </div>

        {/* Letter Content Section */}
        <div className="px-6 sm:px-8 pt-2 pb-8 text-center">
          
          {/* Couple's Names in Romance Script */}
          <div className="mb-2">
            <h1 className="font-script text-5xl sm:text-6xl text-[#4A5438] leading-tight">
              Aiza & Augustus
            </h1>
            <p className="font-serif italic text-sm text-[#7D8469] mt-1">
              are getting married
            </p>
          </div>

          <div className="w-16 h-[1px] bg-[#838769]/30 mx-auto my-4" />

          {/* Emotional Invitation Message */}
          <p className="font-serif text-base sm:text-lg text-[#383D2D] leading-relaxed max-w-md mx-auto italic px-2">
            &ldquo;With full hearts and so much joy, we invite you to save this special date as we celebrate our love and begin a beautiful new chapter together.&rdquo;
          </p>

          {/* Date & Day Highlight */}
          <div className="my-6 py-4 px-3 bg-[#F4F5EF] rounded-2xl border border-[#838769]/20">
            <p className="text-xs uppercase tracking-[0.25em] text-[#606C4E] font-medium mb-1">
              Save The Date
            </p>
            <p className="font-serif text-2xl sm:text-3xl text-[#4A5438] font-bold tracking-wide">
              Saturday, February 27, 2027
            </p>
            <p className="text-xs text-[#7D8469] tracking-wider mt-1 uppercase font-medium">
              Afternoon Ceremony & Reception
            </p>
          </div>

          {/* Live Countdown Timer */}
          <CountdownTimer />

          {/* Venue & Directions */}
          <div className="my-6 text-center">
            <div className="inline-flex items-center justify-center gap-1.5 text-[#4A5438] font-semibold text-sm mb-1">
              <MapPin size={16} className="text-[#606C4E]" />
              <span>Viridis Countryside Garden</span>
            </div>
            <p className="text-xs text-[#6B7355] font-sans">
              Amadeo, Cavite, Philippines
            </p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#4A5438] hover:text-[#2E3520] underline underline-offset-4 mt-2 font-medium transition-colors"
            >
              <span>View Location on Google Maps</span>
              <ExternalLink size={12} />
            </a>
          </div>

          <div className="w-full h-[1px] bg-[#838769]/15 my-6" />

          {/* Important Notes Section */}
          <div className="text-left mb-8">
            <p className="text-[11px] font-sans tracking-[0.25em] text-[#606C4E] uppercase text-center mb-3 font-semibold">
              A Few Important Notes
            </p>

            <div className="space-y-2.5">
              {/* Note 1: Adults Only */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F5EF]/60 border border-[#838769]/15">
                <div className="p-1.5 rounded-lg bg-white/80 text-[#B86B52] shrink-0 mt-0.5">
                  <Ban size={15} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#4A5438] tracking-wide uppercase">
                    Adults-Only Celebration
                  </h3>
                  <p className="text-xs text-[#5C634E] leading-relaxed mt-0.5 font-sans">
                    To allow all our guests to relax and celebrate, our wedding will be strictly for adults. We kindly request no children.
                  </p>
                </div>
              </div>

              {/* Note 2: Plus-One Policy */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F5EF]/60 border border-[#838769]/15">
                <div className="p-1.5 rounded-lg bg-white/80 text-[#606C4E] shrink-0 mt-0.5">
                  <Users size={15} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#4A5438] tracking-wide uppercase">
                    Plus-One Policy
                  </h3>
                  <p className="text-xs text-[#5C634E] leading-relaxed mt-0.5 font-sans">
                    You may bring only one plus-one. Please ensure you submit their full name via the initial RSVP form below.
                  </p>
                </div>
              </div>

              {/* Note 3: Personal Invitation */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F4F5EF]/60 border border-[#838769]/15">
                <div className="p-1.5 rounded-lg bg-white/80 text-[#8E8DAA] shrink-0 mt-0.5">
                  <Lock size={15} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-[#4A5438] tracking-wide uppercase">
                    Personal Invitation
                  </h3>
                  <p className="text-xs text-[#5C634E] leading-relaxed mt-0.5 font-sans">
                    This announcement is intended for you only. Kindly keep it private and do not forward or share it.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-center text-xs italic text-[#7D8469] font-serif mt-4">
              Further details and your formal invitation will follow.
            </p>
          </div>

          {/* Action CTAs: RSVP & Calendar */}
          <div className="space-y-3 pt-2">
            <a
              href={rsvpLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleRsvpClick}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#4A5438] hover:bg-[#3D452E] text-[#FAF8F5] text-xs font-sans tracking-[0.2em] uppercase font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Confirm Initial RSVP</span>
              <ExternalLink size={14} />
            </a>

            <AddToCalendar />
          </div>

          {/* Couple Sign-off */}
          <div className="mt-8 pt-6 border-t border-[#838769]/15">
            <p className="font-serif italic text-sm text-[#7D8469]">
              With love,
            </p>
            <p className="font-script text-3xl sm:text-4xl text-[#4A5438] mt-1">
              Aiza & Augustus
            </p>
          </div>

          {/* Replay Intro Link */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onReplayIntro}
              className="inline-flex items-center gap-1.5 text-xs text-[#7D8469] hover:text-[#4A5438] transition-colors cursor-pointer py-1.5 px-3 rounded-full hover:bg-[#F4F5EF]"
            >
              <RefreshCw size={12} />
              <span>Close & View Envelope Again</span>
            </button>
          </div>

        </div>
      </div>

      {/* Discreet footer */}
      <footer className="text-center mt-6 text-[10px] text-[#838769]/70 tracking-wider uppercase font-sans">
        Aiza & Augustus · Save The Date · 2027
      </footer>
    </motion.div>
  );
};
