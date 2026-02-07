import { motion } from "framer-motion";

const GoldBorder = () => {
  return (
    <motion.div
      className="absolute inset-4 sm:inset-8 md:inset-12 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    >
      {/* Top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-valentine-gold to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
      />
      {/* Bottom border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-valentine-gold to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
      />
      {/* Left border */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-valentine-gold to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.0, ease: "easeInOut" }}
      />
      {/* Right border */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-valentine-gold to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 1.4, ease: "easeInOut" }}
      />
      {/* Corner accents */}
      {[
        "top-0 left-0",
        "top-0 right-0",
        "bottom-0 left-0",
        "bottom-0 right-0",
      ].map((pos, i) => (
        <motion.div
          key={pos}
          className={`absolute ${pos} w-4 h-4 sm:w-6 sm:h-6`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.8 + i * 0.15 }}
        >
          <div className="w-full h-full border-valentine-gold"
            style={{
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "hsl(var(--valentine-gold))",
              borderRadius: "0",
              ...(pos.includes("top") && pos.includes("left")
                ? { borderRight: "none", borderBottom: "none" }
                : pos.includes("top") && pos.includes("right")
                ? { borderLeft: "none", borderBottom: "none" }
                : pos.includes("bottom") && pos.includes("left")
                ? { borderRight: "none", borderTop: "none" }
                : { borderLeft: "none", borderTop: "none" }),
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GoldBorder;
