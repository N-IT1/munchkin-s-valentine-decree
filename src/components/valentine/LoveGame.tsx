import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingItem {
  id: number;
  emoji: string;
  x: number;
  y: number;
  speed: number;
  wobble: number;
  size: number;
  message: string;
}

const LOVE_MESSAGES = [
  "You're stuck with me forever 😈",
  "No refunds on this relationship 🧾",
  "I love you more than wifi 📶",
  "You're my favorite notification 📱",
  "You had me at 'hello' 🥺",
  "10/10 would swipe right again ✨",
  "You're the cheese to my macaroni 🧀",
  "My heart goes brrr for you 💓",
  "You're illegally cute, ma'am 👮‍♂️",
  "Certified Munchkin 💝",
];

const EMOJIS = ["💖", "💝", "💕", "🥰", "😘", "💗", "💞", "🌹", "✨", "💫"];

const TOTAL_TO_WIN = 8;

const LoveGame = ({ onBack }: { onBack: () => void }) => {
  const [items, setItems] = useState<FloatingItem[]>([]);
  const [score, setScore] = useState(0);
  const [poppedMessage, setPoppedMessage] = useState<{ text: string; x: number; y: number } | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [started, setStarted] = useState(false);
  const nextId = useRef(0);
  const spawnInterval = useRef<ReturnType<typeof setInterval>>();
  const animationFrame = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const spawnItem = useCallback(() => {
    const id = nextId.current++;
    const msgIndex = id % LOVE_MESSAGES.length;
    const newItem: FloatingItem = {
      id,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: 10 + Math.random() * 80,
      y: 105,
      speed: 0.3 + Math.random() * 0.4,
      wobble: Math.random() * 2 - 1,
      size: 32 + Math.random() * 20,
      message: LOVE_MESSAGES[msgIndex],
    };
    setItems((prev) => [...prev.slice(-12), newItem]);
  }, []);

  // Game loop — move items upward
  useEffect(() => {
    if (!started || gameWon) return;

    let lastTime = performance.now();
    const tick = (now: number) => {
      const delta = (now - lastTime) / 16;
      lastTime = now;
      setItems((prev) =>
        prev
          .map((item) => ({
            ...item,
            y: item.y - item.speed * delta,
            x: item.x + Math.sin(item.y / 12) * item.wobble * 0.3,
          }))
          .filter((item) => item.y > -10)
      );
      animationFrame.current = requestAnimationFrame(tick);
    };
    animationFrame.current = requestAnimationFrame(tick);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [started, gameWon]);

  // Spawn items periodically
  useEffect(() => {
    if (!started || gameWon) return;
    // Spawn first few quickly
    spawnItem();
    setTimeout(spawnItem, 400);
    setTimeout(spawnItem, 900);

    spawnInterval.current = setInterval(spawnItem, 1400);
    return () => {
      if (spawnInterval.current) clearInterval(spawnInterval.current);
    };
  }, [started, gameWon, spawnItem]);

  const handlePop = (item: FloatingItem, e: React.MouseEvent | React.TouchEvent) => {
    // Remove the item
    setItems((prev) => prev.filter((i) => i.id !== item.id));

    // Show message popup
    const rect = containerRef.current?.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
    const clientY = "touches" in e ? e.touches[0]?.clientY ?? 0 : e.clientY;
    const x = rect ? clientX - rect.left : clientX;
    const y = rect ? clientY - rect.top : clientY;

    setPoppedMessage({ text: item.message, x, y });
    setTimeout(() => setPoppedMessage(null), 1800);

    const newScore = score + 1;
    setScore(newScore);
    if (newScore >= TOTAL_TO_WIN) {
      setGameWon(true);
    }
  };

  if (gameWon) {
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
            You caught all my love!
          </h2>
          <p className="text-valentine-cream text-lg mb-2 font-light">
            {score} hearts popped — every single one is for you, Munchkin.
          </p>
          <p className="text-valentine-gold-light text-base font-serif italic mb-8">
            Now come give me a real kiss 😘
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

  if (!started) {
    return (
      <div className="fixed inset-0 bg-valentine-bg overflow-hidden flex items-center justify-center z-50">
        <motion.div
          className="text-center px-6 max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-5xl mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💖
          </motion.div>
          <h2 className="font-serif text-3xl sm:text-4xl text-valentine-gold mb-4">
            Catch My Love!
          </h2>
          <p className="text-valentine-cream text-base sm:text-lg mb-2 font-light">
            Tap the floating hearts to pop them!
          </p>
          <p className="text-valentine-cream/70 text-sm mb-8">
            Each one has a little message for you 💝
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              onClick={() => setStarted(true)}
              className="px-10 py-4 font-serif text-lg tracking-wider text-valentine-bg
                bg-gradient-to-r from-valentine-gold to-valentine-gold-light
                border border-valentine-gold-light rounded-sm
                hover:shadow-[0_0_30px_hsla(43,80%,55%,0.4)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Play! 🎮
            </motion.button>
            <motion.button
              onClick={onBack}
              className="px-8 py-4 font-serif text-sm tracking-wider text-valentine-gold
                bg-transparent border border-valentine-gold/40 rounded-sm
                hover:border-valentine-gold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-valentine-bg overflow-hidden z-50 touch-none select-none"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-valentine-bg-deep via-valentine-bg to-valentine-red/20" />

      {/* Score */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          className="flex items-center gap-3 px-6 py-2 bg-valentine-red/30 border border-valentine-gold/40 rounded-full backdrop-blur-sm"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <span className="text-valentine-gold font-serif text-lg">
            💖 {score} / {TOTAL_TO_WIN}
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
        transition={{ delay: 0.5 }}
      >
        ← Back
      </motion.button>

      {/* Floating items */}
      {items.map((item) => (
        <motion.button
          key={item.id}
          className="absolute cursor-pointer z-30 touch-manipulation"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: item.size,
            transform: "translate(-50%, -50%)",
          }}
          onClick={(e) => handlePop(item, e)}
          onTouchStart={(e) => handlePop(item, e)}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.5 }}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {item.emoji}
        </motion.button>
      ))}

      {/* Popped message popup */}
      <AnimatePresence>
        {poppedMessage && (
          <motion.div
            className="absolute z-40 pointer-events-none"
            style={{ left: poppedMessage.x, top: poppedMessage.y }}
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -60, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative -translate-x-1/2 px-4 py-2 bg-valentine-red/80 border border-valentine-gold/60
              rounded-lg backdrop-blur-sm whitespace-nowrap max-w-[280px]">
              <p className="text-valentine-cream text-xs sm:text-sm font-serif text-center">
                {poppedMessage.text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction hint */}
      <motion.p
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-valentine-gold/40 text-sm font-serif z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ delay: 1, duration: 4, times: [0, 0.1, 0.8, 1] }}
      >
        Tap the hearts! 👆
      </motion.p>
    </div>
  );
};

export default LoveGame;
