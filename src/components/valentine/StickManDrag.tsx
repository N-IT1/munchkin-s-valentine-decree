import { motion } from "framer-motion";

interface StickManDragProps {
  onComplete: () => void;
}

const StickManDrag = ({ onComplete }: StickManDragProps) => {
  return (
    <motion.div
      className="absolute -right-24 sm:-right-28 top-1/2 -translate-y-1/2 z-20 flex items-center gap-0"
      initial={{ x: 180, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      onAnimationComplete={onComplete}
    >
      {/* Rope connecting to button */}
      <motion.svg
        width="28"
        height="12"
        viewBox="0 0 28 12"
        className="flex-shrink-0"
        animate={{ x: [0, -2, 0, -2, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M 0 6 Q 7 2, 14 6 Q 21 10, 28 6"
          stroke="hsl(var(--valentine-gold-dark))"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </motion.svg>

      {/* Stick Man — leaning back in pulling pose */}
      <motion.svg
        width="50"
        height="65"
        viewBox="0 0 50 65"
        className="flex-shrink-0"
        animate={{ rotate: [0, -6, 0, -6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Head */}
        <circle cx="25" cy="10" r="9" stroke="hsl(var(--valentine-gold))" strokeWidth="2.5" fill="none" />
        {/* Eyes — determined look */}
        <circle cx="21" cy="9" r="1.5" fill="hsl(var(--valentine-gold))" />
        <circle cx="29" cy="9" r="1.5" fill="hsl(var(--valentine-gold))" />
        {/* Determined mouth */}
        <line x1="21" y1="14" x2="29" y2="14" stroke="hsl(var(--valentine-gold))" strokeWidth="1.5" strokeLinecap="round" />

        {/* Body — slightly leaning back */}
        <line x1="25" y1="19" x2="27" y2="40" stroke="hsl(var(--valentine-gold))" strokeWidth="2.5" />

        {/* Left arm — extended back holding rope */}
        <line x1="25" y1="26" x2="5" y2="30" stroke="hsl(var(--valentine-gold))" strokeWidth="2.5" strokeLinecap="round" />

        {/* Right arm — pulling effort */}
        <line x1="25" y1="26" x2="42" y2="20" stroke="hsl(var(--valentine-gold))" strokeWidth="2.5" strokeLinecap="round" />

        {/* Left leg — braced */}
        <line x1="27" y1="40" x2="14" y2="58" stroke="hsl(var(--valentine-gold))" strokeWidth="2.5" strokeLinecap="round" />

        {/* Right leg — pushing */}
        <line x1="27" y1="40" x2="42" y2="56" stroke="hsl(var(--valentine-gold))" strokeWidth="2.5" strokeLinecap="round" />
      </motion.svg>
    </motion.div>
  );
};

export default StickManDrag;
