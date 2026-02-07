import { motion } from "framer-motion";

interface RabbitHeistProps {
  onComplete: () => void;
}

const RabbitHeist = ({ onComplete }: RabbitHeistProps) => {
  return (
    <motion.div
      className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center"
      initial={{ x: 200 }}
      animate={{ x: [200, 0, 0, -400] }}
      transition={{
        duration: 3.5,
        times: [0, 0.3, 0.6, 1],
        ease: "easeInOut",
      }}
      onAnimationComplete={onComplete}
    >
      {/* Rabbit SVG */}
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        className="transform -scale-x-100"
      >
        {/* Body */}
        <ellipse cx="50" cy="65" rx="22" ry="20" fill="hsl(var(--valentine-cream))" />
        {/* Head */}
        <circle cx="50" cy="40" r="16" fill="hsl(var(--valentine-cream))" />
        {/* Left ear */}
        <ellipse cx="40" cy="15" rx="6" ry="18" fill="hsl(var(--valentine-cream))" />
        <ellipse cx="40" cy="15" rx="3.5" ry="14" fill="hsl(var(--valentine-rose))" opacity="0.5" />
        {/* Right ear */}
        <ellipse cx="60" cy="15" rx="6" ry="18" fill="hsl(var(--valentine-cream))" />
        <ellipse cx="60" cy="15" rx="3.5" ry="14" fill="hsl(var(--valentine-rose))" opacity="0.5" />
        {/* Eyes */}
        <circle cx="43" cy="37" r="3" fill="hsl(var(--valentine-bg-deep))" />
        <circle cx="57" cy="37" r="3" fill="hsl(var(--valentine-bg-deep))" />
        <circle cx="44" cy="36" r="1" fill="white" />
        <circle cx="58" cy="36" r="1" fill="white" />
        {/* Nose */}
        <ellipse cx="50" cy="43" rx="2.5" ry="2" fill="hsl(var(--valentine-rose))" />
        {/* Mouth */}
        <path d="M 47 46 Q 50 49 53 46" stroke="hsl(var(--valentine-bg-deep))" strokeWidth="1" fill="none" />
        {/* Cheeks */}
        <circle cx="37" cy="42" r="3" fill="hsl(var(--valentine-rose))" opacity="0.3" />
        <circle cx="63" cy="42" r="3" fill="hsl(var(--valentine-rose))" opacity="0.3" />
        {/* Tail */}
        <circle cx="72" cy="65" r="6" fill="hsl(var(--valentine-cream-soft))" />
        {/* Feet */}
        <ellipse cx="38" cy="82" rx="8" ry="5" fill="hsl(var(--valentine-cream))" />
        <ellipse cx="62" cy="82" rx="8" ry="5" fill="hsl(var(--valentine-cream))" />
      </svg>
    </motion.div>
  );
};

export default RabbitHeist;
