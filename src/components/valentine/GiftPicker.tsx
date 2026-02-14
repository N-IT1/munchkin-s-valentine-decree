import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GIFTS = [
  { label: "🎁 Option 1", reveal: "Ice-cream & A new phone 📱🍦" },
  { label: "🎁 Option 2", reveal: "Data for one month 📶" },
  { label: "🎁 Option 3", reveal: "Yam and egg 😂" },
  { label: "🎁 Option 4", reveal: "Flowers & hair 💐💇‍♀️" },
];

const GiftPicker = ({ onBack }: { onBack: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [allRevealed, setAllRevealed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handlePick = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setTimeout(() => setAllRevealed(true), 800);
    setTimeout(() => setShowModal(true), 2000);
  };

  return (
    <div className="fixed inset-0 bg-valentine-bg overflow-hidden flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-valentine-bg-deep via-valentine-bg to-valentine-red/20" />

      {/* Back button */}
      <motion.button
        onClick={onBack}
        className="absolute top-6 left-4 z-50 px-4 py-2 text-valentine-gold/60 font-serif text-sm hover:text-valentine-gold transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        ← Back
      </motion.button>

      <div className="relative z-30 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-5xl text-center mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎁
          </motion.div>
          <h2 className="font-serif text-2xl sm:text-3xl text-valentine-gold text-center mb-3 leading-snug">
            Tell me what you want for Valentine's
          </h2>
          <p className="text-valentine-cream/60 text-sm text-center mb-8 font-light">
            Pick one... but you won't know what it is until you do 😏
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {GIFTS.map((gift, i) => {
            const isSelected = selected === i;
            const isRevealed = allRevealed || isSelected;

            return (
              <motion.button
                key={i}
                onClick={() => handlePick(i)}
                className={`relative px-4 py-6 font-serif text-base rounded-sm border transition-all duration-500 ${
                  isSelected
                    ? "bg-valentine-gold/20 border-valentine-gold text-valentine-gold shadow-[0_0_20px_hsla(43,80%,55%,0.3)]"
                    : isRevealed
                    ? "bg-valentine-red/10 border-valentine-gold/30 text-valentine-cream/80"
                    : "bg-transparent border-valentine-gold/30 text-valentine-cream hover:border-valentine-gold/60 hover:bg-valentine-gold/5"
                } ${selected !== null && !isSelected ? "cursor-default" : ""}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                whileHover={selected === null ? { scale: 1.05, y: -2 } : {}}
                whileTap={selected === null ? { scale: 0.95 } : {}}
              >
                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.span
                      key="revealed"
                      className="text-sm sm:text-base leading-snug block"
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {gift.reveal}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="hidden"
                      className="text-2xl block"
                      exit={{ opacity: 0, rotateY: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      {gift.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isSelected && (
                  <motion.div
                    className="absolute -top-2 -right-2 text-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                  >
                    ✅
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="fixed left-1/2 top-8 -translate-x-1/2 z-[70] w-[90%] max-w-sm
                bg-valentine-bg border border-valentine-gold/50 rounded-sm 
                p-3 sm:p-6 shadow-[0_0_40px_hsla(43,80%,55%,0.2)]
                max-h-[calc(100vh-4rem)] overflow-y-auto
                [&]:text-xs sm:[&]:text-base"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <motion.div
                className="text-3xl sm:text-4xl text-center mb-2 sm:mb-4"
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                📸
              </motion.div>
              <h3 className="font-serif text-base sm:text-xl text-valentine-gold text-center mb-2 sm:mb-3">
                You picked:
              </h3>
              <p className="text-valentine-cream text-center text-sm sm:text-lg font-serif mb-2 sm:mb-4">
                {selected !== null ? GIFTS[selected].reveal : ""}
              </p>
              <div className="h-px w-full bg-valentine-gold/20 mb-2 sm:mb-4" />
              <p className="text-valentine-cream/80 text-center text-xs sm:text-sm leading-relaxed mb-3 sm:mb-5">
                Now screenshot this and send it to <span className="text-valentine-gold font-serif">Pumpkin</span> 💝
                <br />
                <span className="text-valentine-cream/50 text-[10px] sm:text-xs mt-1 block">
                  ...with your account number 😏
                </span>
              </p>
              <motion.button
                onClick={() => setShowModal(false)}
                className="w-full px-6 py-2.5 font-serif text-sm tracking-wider text-valentine-bg
                  bg-gradient-to-r from-valentine-gold to-valentine-gold-light
                  border border-valentine-gold-light rounded-sm
                  hover:shadow-[0_0_20px_hsla(43,80%,55%,0.3)] transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Got it! 💌
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GiftPicker;
