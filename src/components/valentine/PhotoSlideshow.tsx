import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coupleNew1 from "@/assets/couple-new-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import coupleNew3 from "@/assets/couple-new-3.jpg";
import couple4 from "@/assets/couple-4.jpg";
import coupleNew2 from "@/assets/couple-new-2.jpg";

const photos = [coupleNew1, couple2, couple3, coupleNew3, couple4, coupleNew2];

const variants = [
  { initial: { opacity: 0, scale: 1.2, rotate: 3 }, animate: { opacity: 1, scale: 1, rotate: 0 }, exit: { opacity: 0, scale: 0.8, rotate: -3 } },
  { initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -100 } },
  { initial: { opacity: 0, y: 60, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -60, scale: 0.9 } },
  { initial: { opacity: 0, rotate: -5, scale: 1.1 }, animate: { opacity: 1, rotate: 0, scale: 1 }, exit: { opacity: 0, rotate: 5, scale: 0.9 } },
  { initial: { opacity: 0, scale: 0.6 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.3 } },
];

const PhotoSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const variant = variants[current % variants.length];

  return (
    <div className="relative w-64 h-72 sm:w-72 sm:h-80 mx-auto">
      {/* Gold frame */}
      <div className="absolute -inset-3 border-2 border-valentine-gold/40 rounded-sm" />
      <div className="absolute -inset-1 border border-valentine-gold/20 rounded-sm" />
      
      {/* Glow */}
      <div className="absolute -inset-6 bg-valentine-gold/5 blur-2xl rounded-full" />

      <div className="relative w-full h-full overflow-hidden rounded-sm">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={photos[current]}
            alt="Us"
            className="absolute inset-0 w-full h-full object-cover"
            initial={variant.initial}
            animate={variant.animate}
            exit={variant.exit}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-valentine-bg/60 via-transparent to-valentine-bg/20 pointer-events-none" />
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === current ? "bg-valentine-gold w-5" : "bg-valentine-gold/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoSlideshow;
