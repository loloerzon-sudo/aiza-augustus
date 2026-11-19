import React, { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

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

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  return (
    <div className="py-4 px-2 my-6 bg-[#F4F5EF]/80 rounded-2xl border border-[#838769]/20 backdrop-blur-xs">
      <p className="text-[11px] font-sans tracking-[0.25em] text-[#606C4E] uppercase text-center mb-3 font-semibold">
        Counting Down to the Day
      </p>
      <div className="grid grid-cols-4 gap-2 text-center divide-x divide-[#838769]/15">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <span className="font-serif text-2xl md:text-3xl font-semibold text-[#4A5438] tabular-nums">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#7D8469] mt-0.5 font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
