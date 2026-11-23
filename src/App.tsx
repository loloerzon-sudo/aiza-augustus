import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IntroAnimation } from './components/IntroAnimation';
import { Envelope } from './components/Envelope';
import { LetterCard } from './components/LetterCard';

type ViewStage = 'intro' | 'envelope' | 'letter';

// MotionSites Living Atmosphere: Ambient floating light dust particles
const AMBIENT_MOTES = [
  { top: '12%', left: '8%', size: 7, color: '#E09F3E', dx: '24px', dy: '-35px', dur: '11s', delay: '0s', blur: '1px', opMin: 0.2, opMax: 0.65 },
  { top: '22%', left: '88%', size: 10, color: '#F5DEB3', dx: '-30px', dy: '-40px', dur: '13s', delay: '1.5s', blur: '1.5px', opMin: 0.25, opMax: 0.7 },
  { top: '38%', left: '14%', size: 6, color: '#B85D3B', dx: '20px', dy: '-25px', dur: '9.5s', delay: '3s', blur: '1px', opMin: 0.15, opMax: 0.5 },
  { top: '55%', left: '82%', size: 8, color: '#E09F3E', dx: '-25px', dy: '-30px', dur: '12s', delay: '2s', blur: '1px', opMin: 0.2, opMax: 0.6 },
  { top: '68%', left: '6%', size: 9, color: '#FAF6EF', dx: '30px', dy: '-35px', dur: '14s', delay: '4s', blur: '2px', opMin: 0.3, opMax: 0.8 },
  { top: '80%', left: '90%', size: 6, color: '#C86438', dx: '-18px', dy: '-20px', dur: '10s', delay: '0.8s', blur: '1px', opMin: 0.2, opMax: 0.55 },
  { top: '18%', left: '50%', size: 5, color: '#E09F3E', dx: '15px', dy: '-20px', dur: '8.5s', delay: '2.5s', blur: '0.5px', opMin: 0.25, opMax: 0.6 },
  { top: '86%', left: '42%', size: 7, color: '#FAF6EF', dx: '-20px', dy: '-25px', dur: '11.5s', delay: '1s', blur: '1px', opMin: 0.2, opMax: 0.6 },
];

export function App() {
  const [stage, setStage] = useState<ViewStage>(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('stage');
      if (param === 'intro' || param === 'envelope' || param === 'letter') {
        return param;
      }
    }
    return 'envelope';
  });

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col items-center justify-center relative overflow-x-hidden">
      {/* Background ambient rustic lighting with MotionSites glow */}
      <div className="fixed inset-0 pointer-events-none opacity-60">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#E09F3E]/14 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-[#FAF6EF]/60 blur-2xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#B85D3B]/12 blur-3xl" />

        {/* Ambient floating dust motes */}
        {AMBIENT_MOTES.map((m, idx) => (
          <span
            key={idx}
            className="ambient-dust-mote"
            style={{
              top: m.top,
              left: m.left,
              width: `${m.size}px`,
              height: `${m.size}px`,
              backgroundColor: m.color,
              // @ts-expect-error custom CSS properties
              '--dx': m.dx,
              '--dy': m.dy,
              '--mote-dur': m.dur,
              '--mote-delay': m.delay,
              '--mote-blur': m.blur,
              '--op-min': m.opMin,
              '--op-max': m.opMax,
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <IntroAnimation
            key="intro"
            onComplete={() => setStage('envelope')}
          />
        )}

        {stage === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <Envelope
              isOpened={false}
              onOpen={() => setStage('letter')}
            />
          </motion.div>
        )}

        {stage === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center py-4"
          >
            <LetterCard
              onReplayIntro={() => setStage('envelope')}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
