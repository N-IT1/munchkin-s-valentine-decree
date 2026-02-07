import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoldParticles from "@/components/valentine/GoldParticles";
import GoldBorder from "@/components/valentine/GoldBorder";
import StickManDrag from "@/components/valentine/StickManDrag";
import HeartExplosion from "@/components/valentine/HeartExplosion";

const Index = () => {
  const [phase, setPhase] = useState<"entrance" | "question" | "buttons" | "stickman" | "done">("entrance");
  const [saidYes, setSaidYes] = useState(false);
  const [stickmanDone, setStickmanDone] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("question"), 1500),
      setTimeout(() => setPhase("buttons"), 3000),
      setTimeout(() => setPhase("stickman"), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleYes = () => {
    setSaidYes(true);
  };

  const wordAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.25, duration: 0.6 },
    }),
  };

  const questionWords = ["Will", "you", "be", "my", "Valentine?"];

  if (saidYes) {
    return (
      <div className="fixed inset-0 bg-valentine-bg overflow-hidden flex items-center justify-center">
        <HeartExplosion />
        <GoldParticles />
        <motion.div
          className="relative z-40 text-center px-6 max-w-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="font-serif text-4xl sm:text-5xl md:text-6xl text-valentine-gold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            I knew you'd say yes, Munchkin 💝
          </motion.h1>
          <motion.p
            className="text-valentine-cream text-lg sm:text-xl md:text-2xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Every moment with you feels like the universe conspired just for us.
            You're my favourite person, my safe place, my everything.
          </motion.p>
          <motion.p
            className="text-valentine-gold-light text-base sm:text-lg mt-8 font-serif italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Forever yours ✨
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-valentine-bg overflow-hidden flex items-center justify-center">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-valentine-bg-deep via-valentine-bg to-valentine-red/20" />

      <GoldParticles />
      <GoldBorder />

      <div className="relative z-20 text-center px-6 max-w-lg w-full">
        {/* Act 1 — Her name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        >
          <motion.p
            className="text-valentine-gold-light text-sm sm:text-base tracking-[0.3em] uppercase mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            A Special Invitation For
          </motion.p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-valentine-gold font-bold mb-8"
            style={{
              textShadow: "0 0 40px hsla(43, 80%, 55%, 0.3)",
            }}
          >
            Munchkin
          </h1>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-valentine-gold" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="hsl(var(--valentine-gold))" className="opacity-60">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-valentine-gold" />
        </motion.div>

        {/* Act 2 — The Question */}
        <AnimatePresence>
          {(phase === "question" || phase === "buttons" || phase === "stickman" || phase === "done") && (
            <motion.div className="mb-10">
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                {questionWords.map((word, i) => (
                  <motion.span
                    key={word}
                    className="font-serif text-2xl sm:text-3xl md:text-4xl text-valentine-cream font-light"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={wordAnimation}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Act 3 & 4 — Buttons + Rabbit */}
        <AnimatePresence>
          {(phase === "buttons" || phase === "stickman" || phase === "done") && (
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Yes button */}
              <motion.button
                onClick={handleYes}
                className="relative px-10 py-4 sm:px-12 sm:py-5 font-serif text-lg sm:text-xl tracking-wider
                  text-valentine-bg bg-gradient-to-r from-valentine-gold to-valentine-gold-light
                  border border-valentine-gold-light rounded-sm
                  transition-all duration-300 hover:shadow-[0_0_30px_hsla(43,80%,55%,0.4)]
                  hover:scale-105 active:scale-95 min-w-[140px]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                whileHover={{ y: -2 }}
              >
                Yes
              </motion.button>

              {/* No button area */}
              <div className="relative min-w-[140px] min-h-[56px] sm:min-h-[64px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {!stickmanDone ? (
                    <motion.div
                      key="no-btn-wrapper"
                      className="relative"
                      initial={{ scale: 0 }}
                      animate={
                        phase === "stickman"
                          ? {
                              x: [0, -5, 7, -5, 0, 0, 800],
                              transition: {
                                duration: 5.5,
                                times: [0, 0.05, 0.1, 0.15, 0.22, 0.4, 1],
                                delay: 2.2,
                                ease: "easeInOut",
                              },
                            }
                          : { scale: 1 }
                      }
                      transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                    >
                      <motion.button
                        className="px-10 py-4 sm:px-12 sm:py-5 font-serif text-lg sm:text-xl tracking-wider
                          text-valentine-gold bg-transparent
                          border border-valentine-gold/50 rounded-sm
                          transition-all duration-300 hover:border-valentine-gold
                          min-w-[140px]"
                        animate={
                          phase === "stickman"
                            ? { opacity: [1, 1, 0], transition: { delay: 4.5, duration: 3.2 } }
                            : {}
                        }
                        onAnimationComplete={() => {
                          if (phase === "stickman") {
                            setTimeout(() => setStickmanDone(true), 300);
                          }
                        }}
                      >
                        No
                      </motion.button>

                      {/* Stick man dragging the button */}
                      {phase === "stickman" && !stickmanDone && (
                        <StickManDrag onComplete={() => {}} />
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="choice-box"
                      className="px-6 py-3 sm:px-8 sm:py-4 border border-valentine-gold/60 rounded-sm
                        bg-valentine-red/20 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <p className="font-serif text-valentine-gold text-sm sm:text-base italic whitespace-nowrap">
                        You think you had a choice? 😏
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
