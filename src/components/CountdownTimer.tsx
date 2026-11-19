import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Single vertical rolling digit track
const RollingDigit: React.FC<{ digit: string }> = ({ digit }) => {
  return (
    <div className="relative h-10 md:h-12 w-4 md:w-5 overflow-hidden inline-flex items-center justify-center select-none">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={digit}
          initial={{ y: '100%', opacity: 0.2 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.2 }}
          transition={{
            y: { type: 'spring', stiffness: 320, damping: 28 },
            opacity: { duration: 0.25 },
          }}
          className="absolute inset-0 flex items-center justify-center font-serif text-3xl md:text-4xl font-bold text-[#4A5438] tabular-nums"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// Porcelain Tile for a time unit (Days, Hours, Mins, Secs)
const TimeTile: React.FC<{ value: number; label: string; minDigits?: number }> = ({
  value,
  label,
  minDigits = 2,
}) => {
  const digits = String(value).padStart(minDigits, '0').split('');

  return (
    <div className="flex flex-col items-center">
      {/* Individual Porcelain Tile */}
      <div className="relative px-2 py-2.5 sm:px-3 sm:py-3 bg-gradient-to-b from-white via-[#FCFCFA] to-[#F2F4ED] rounded-2xl border border-[#838769]/30 shadow-xs shadow-[#4A5438]/5 flex items-center justify-center gap-0.5 min-w-[58px] sm:min-w-[72px] overflow-hidden">
        {/* Subtle top bevel shine */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-white opacity-80" />
        
        {/* Horizontal subtle seam across the middle */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#838769]/10 pointer-events-none" />

        {/* Independent Rolling Digit Tracks */}
        {digits.map((digit, index) => (
          <RollingDigit key={index} digit={digit} />
        ))}
      </div>

      {/* Unit Label */}
      <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] uppercase text-[#606C4E] mt-2 font-semibold">
        {label}
      </span>
    </div>
  );
};

export const CountdownTimer: React.FC = () => {
  // February 27, 2027 at 15:00 GMT+8 (Philippine Standard Time)
  const targetDate = new Date('2027-02-27T15:00:00+08:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-5 px-3 sm:px-4 my-6 bg-[#F5F6F0]/70 rounded-3xl border border-[#838769]/20 backdrop-blur-xs">
      <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.28em] text-[#606C4E] uppercase text-center mb-3.5 font-semibold">
        Counting Down to Our Forever
      </p>

      {/* 4 Separate Porcelain Tiles with Rolling Odometer Digits */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <TimeTile value={timeLeft.days} label="Days" minDigits={timeLeft.days >= 100 ? 3 : 2} />
        
        <span className="text-[#C5A880] font-serif text-xl sm:text-2xl -mt-5 font-bold opacity-75 select-none">:</span>
        
        <TimeTile value={timeLeft.hours} label="Hours" />
        
        <span className="text-[#C5A880] font-serif text-xl sm:text-2xl -mt-5 font-bold opacity-75 select-none">:</span>
        
        <TimeTile value={timeLeft.minutes} label="Mins" />
        
        <span className="text-[#C5A880] font-serif text-xl sm:text-2xl -mt-5 font-bold opacity-75 select-none">:</span>
        
        <TimeTile value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};
