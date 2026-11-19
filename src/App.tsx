import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IntroAnimation } from './components/IntroAnimation';
import { Envelope } from './components/Envelope';
import { LetterCard } from './components/LetterCard';

type ViewStage = 'intro' | 'envelope' | 'letter';

export function App() {
  const [stage, setStage] = useState<ViewStage>('envelope');

  return (
    <div className="min-h-screen bg-[#F7F8F4] flex flex-col items-center justify-center relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#838769]/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#C5A880]/15 blur-3xl" />
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
