import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizQuestion {
  question: string;
  options: string[];
  response: string; // Default response
  optionResponses?: Record<number, string>; // Custom response per option index
}

const QUIZ: QuizQuestion[] = [
  {
    question: "How much do I love you?",
    options: ["A lot", "Always and Forever", "To the moon", "It's illegal"],
    response: "Trick question — the answer is ALL OF THE ABOVE 💀💝",
    optionResponses: {
      1: "You're right my angel...\ni really want what we have to last always and forever, you mean the entire world to me 💝",
    },
  },
  {
    question: "What happens if you say 'no' to being my Valentine?",
    options: ["Nothing", "I cry", "World ends", "Not an option"],
    response: "Correct! It was never an option 😈🔒",
  },
  {
    question: "Who's the cutest person alive?",
    options: ["Me obviously", "My dog", "Some celebrity", "Not sure"],
    response: "Wrong. It's YOU, Munchkin. Final answer. No appeals. 👩‍⚖️💖",
  },
  {
    question: "What's my favorite thing about you?",
    options: ["Your smile", "Your laugh", "Your personality", "Everything"],
    response: "You're way more than what I ever expected I could see in a lady, talk more of the love of my life. Ese, I want you to know that I see you. I see the real you, and I still think you're perfect without any form of flaws. I've probably told you a trillion times already, but I just honestly love you so, so much. You taught me how to love a person and what it means to let someone love you, and for that, I'd be forever grateful. 💝",
  },
  {
    question: "How long am I keeping you?",
    options: ["A while", "A few years", "Forever", "Until you get bored"],
    response: "Forever. No refunds, no exchanges, no escape 🧾💝",
  },
  {
    question: "Rate our relationship out of 10",
    options: ["10", "100", "♾️", "Off the charts"],
    response: "The scale broke. Scientists are investigating. 📊🔥",
  },
];

const LoveGame = ({ onBack }: { onBack: () => void }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const handleSelect = (optionIndex: number) => {
    if (showResponse) return;
    setSelectedOption(optionIndex);
    setShowResponse(true);
  };

  const handleNext = () => {
    if (currentQ >= QUIZ.length - 1) {
      setFinished(true);
    } else {
      setCurrentQ((prev) => prev + 1);
      setShowResponse(false);
      setSelectedOption(null);
    }
  };

  const question = QUIZ[currentQ];

  if (finished) {
    return (
      <div className="fixed inset-0 bg-valentine-bg overflow-hidden flex items-center justify-center z-50">
        <motion.div
          className="text-center px-6 max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          >
            🏆💝
          </motion.div>
          <h2 className="font-serif text-3xl sm:text-4xl text-valentine-gold mb-4">
            Quiz Complete!
          </h2>
          <p className="text-valentine-cream text-lg mb-8 font-light">
            you did well, my baby 💝
          </p>
          <motion.button
            onClick={onBack}
            className="px-8 py-3 font-serif text-lg tracking-wider text-valentine-bg
              bg-gradient-to-r from-valentine-gold to-valentine-gold-light
              border border-valentine-gold-light rounded-sm
              hover:shadow-[0_0_30px_hsla(43,80%,55%,0.4)] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to love letter 💌
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-valentine-bg overflow-hidden flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-valentine-bg-deep via-valentine-bg to-valentine-red/20" />

      {/* Progress */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          className="flex items-center gap-2 px-5 py-2 bg-valentine-red/30 border border-valentine-gold/40 rounded-full backdrop-blur-sm"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <span className="text-valentine-gold font-serif text-sm">
            {currentQ + 1} / {QUIZ.length}
          </span>
        </motion.div>
      </div>

      {/* Back button */}
      <motion.button
        onClick={onBack}
        className="absolute top-6 left-4 z-50 px-4 py-2 text-valentine-gold/60 font-serif text-sm
          hover:text-valentine-gold transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        ← Back
      </motion.button>

      {/* Quiz content */}
      <div className="relative z-30 w-full max-w-md px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
          >
            {/* Question */}
            <motion.h2
              className="font-serif text-2xl sm:text-3xl text-valentine-gold text-center mb-8 leading-snug"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {question.question}
            </motion.h2>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {question.options.map((opt, i) => (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full px-5 py-3.5 text-left font-serif text-base sm:text-lg rounded-sm
                    border transition-all duration-300
                    ${selectedOption === i
                      ? "bg-valentine-gold/20 border-valentine-gold text-valentine-gold"
                      : "bg-transparent border-valentine-gold/30 text-valentine-cream hover:border-valentine-gold/60 hover:bg-valentine-gold/5"
                    }`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  whileHover={!showResponse ? { x: 4 } : {}}
                  whileTap={!showResponse ? { scale: 0.97 } : {}}
                >
                  {opt}
                </motion.button>
              ))}
            </div>

            {/* Response */}
            <AnimatePresence>
              {showResponse && (
                <motion.div
                  className="mt-4 p-5 bg-valentine-red/30 border border-valentine-gold/50 rounded-sm backdrop-blur-sm"
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <p className="font-serif text-valentine-cream text-sm sm:text-base text-center leading-relaxed whitespace-pre-line">
                    {(selectedOption !== null && question.optionResponses?.[selectedOption]) || question.response}
                  </p>

                  <motion.button
                    onClick={handleNext}
                    className="mt-4 mx-auto block px-8 py-2.5 font-serif text-sm tracking-wider text-valentine-bg
                      bg-gradient-to-r from-valentine-gold to-valentine-gold-light
                      border border-valentine-gold-light rounded-sm
                      hover:shadow-[0_0_20px_hsla(43,80%,55%,0.3)] transition-all duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentQ >= QUIZ.length - 1 ? "See results ✨" : "Next →"}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoveGame;
