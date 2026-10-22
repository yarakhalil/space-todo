import { motion } from "framer-motion";
import StarsBackground from "./StarsBackground";

interface Orbit {
  size: number;      // قطر المدار بالبكسل
  planetSize: number;
  color: string;     // كلاسات Tailwind للكوكب
  duration: number;  // كل ما قلّ الرقم، الكوكب أسرع
  hasRing?: boolean;
}

const orbits: Orbit[] = [
  { size: 140, planetSize: 14, color: "bg-gradient-to-br from-orange-300 to-orange-600", duration: 4 },
  { size: 220, planetSize: 22, color: "bg-gradient-to-br from-sky-300 to-blue-600", duration: 8 },
  { size: 310, planetSize: 26, color: "bg-gradient-to-br from-amber-200 to-yellow-600", duration: 14, hasRing: true },
  { size: 400, planetSize: 18, color: "bg-gradient-to-br from-rose-300 to-purple-700", duration: 20 },
];

function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-50 overflow-hidden bg-black"
    >
      <StarsBackground />

      <div className="relative z-10 flex h-full flex-col items-center justify-center">
        {/* المجموعة الشمسية */}
        <div className="relative flex h-[420px] w-[420px] items-center justify-center scale-[0.8] sm:scale-100">
          {/* الشمس */}
          <motion.div
            className="absolute h-16 w-16 rounded-full bg-gradient-to-br from-yellow-200 via-orange-400 to-red-500"
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                "0 0 40px 10px rgba(251,191,36,0.5)",
                "0 0 70px 25px rgba(251,146,60,0.7)",
                "0 0 40px 10px rgba(251,191,36,0.5)",
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* المدارات والكواكب */}
          {orbits.map((orbit, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/15"
              style={{ width: orbit.size, height: orbit.size }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: orbit.duration, repeat: Infinity, ease: "linear" }}
              >
                {/* الكوكب في أعلى المدار، ولما المدار يلف بيلف معاه */}
                <div
                  className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: orbit.planetSize, height: orbit.planetSize }}
                >
                  <div className={`h-full w-full rounded-full shadow-lg ${orbit.color}`} />
                  {orbit.hasRing && (
                    <div
                      className="absolute left-1/2 top-1/2 h-2 w-10 -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] rounded-full border-2 border-amber-200/70"
                    />
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* النص */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-3xl font-bold tracking-widest text-white"
        >
          To Do App
        </motion.h2>

        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-2 text-sm text-sky-200"
        >
          Exploring the galaxy...
        </motion.p>

        {/* شريط التحميل */}
        <div className="mt-6 h-1.5 w-56 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default SplashScreen;