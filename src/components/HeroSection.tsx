import { motion } from "framer-motion";
import CyberShield3D from "./CyberShield3D";

/* ---------- Animation variants ---------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.4 },
  },
};

/* ---------- Component ---------- */
export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* ---- Decorative gradient orb ---- */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-cyber-green/5 blur-3xl"
      />

      {/* ---- Content wrapper ---- */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* ===== Left: Text ===== */}
        <motion.div
          className="flex-1 flex flex-col items-start gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-lg border border-cyber-cyan/30 bg-cyber-cyan/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyber-cyan"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyber-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-cyan" />
            </span>
            Sonar de Amenazas IA
          </motion.span>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
          >
            <span className="bg-gradient-to-r from-cyber-cyan to-cyber-green bg-clip-text text-transparent">
              Phishing
            </span>
            <br />
            <span className="text-white">Detector</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-slate-400 max-w-lg leading-relaxed"
          >
            Navega seguro. Analizamos el mar de correos electrónicos con inteligencia
            artificial para detectar el anzuelo antes de que muerdas. Identifica enlaces
            maliciosos y tácticas de ingeniería social en aguas profundas.
          </motion.p>
        </motion.div>

        {/* ===== Right: 3D Shield ===== */}
        <motion.div
          className="flex-1 w-full h-[400px] lg:h-[500px]"
          variants={scaleInVariants}
          initial="hidden"
          animate="visible"
        >
          <CyberShield3D className="w-full h-full" />
        </motion.div>
      </div>
    </section>
  );
}
