import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
  color: string;
}

const HEART_COLORS = [
  "hsl(var(--valentine-gold))",
  "hsl(var(--valentine-gold-light))",
  "hsl(var(--valentine-rose))",
  "hsl(var(--valentine-red-light))",
  "hsl(var(--valentine-cream))",
];

const HeartExplosion = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: Math.random() * 24 + 12,
      rotation: Math.random() * 360,
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 3,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-30">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ left: `${h.x}%`, bottom: 0 }}
          initial={{ y: 0, opacity: 0, scale: 0 }}
          animate={{
            y: [0, -(window.innerHeight + 100)],
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1.2, 0.8],
            rotate: [0, h.rotation],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default HeartExplosion;
