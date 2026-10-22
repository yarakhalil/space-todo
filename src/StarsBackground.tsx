import { useMemo } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

interface ShootingStar {
  id: number;
  top: number;
  left: number;
  delay: number;
  repeatDelay: number;
}

function StarsBackground() {
  // بنولّد النجوم مرة واحدة بس عشان ماتتغيرش مع كل render
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
      })),
    []
  );

  const shootingStars = useMemo<ShootingStar[]>(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        top: Math.random() * 40,
        left: Math.random() * 60,
        delay: i * 3 + Math.random() * 2,
        repeatDelay: Math.random() * 6 + 4,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-gradient-to-b from-black via-slate-950 to-indigo-950">
      {/* النجوم اللي بتلمّع */}
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* الشهب */}
      {shootingStars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute h-0.5 w-24 bg-gradient-to-r from-transparent to-white"
          style={{ top: `${s.top}%`, left: `${s.left}%`, rotate: 35 }}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ x: 450, y: 315, opacity: [0, 1, 0] }}
          transition={{
            duration: 1.2,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

export default StarsBackground;