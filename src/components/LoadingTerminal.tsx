import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Terminal lines ---------- */
const TERMINAL_LINES = [
  "$ Inicializando sistema de sonar profundo...",
  "$ Lanzando boyas de detección IA...",
  "> Escaneando aguas superficiales (asunto)... [OK]",
  "> Desplegando red en profundidades (cuerpo)... [OK]",
  "> Rastreando corrientes de datos sospechosas...",
  "> Cruzando firmas con base de datos abisal...",
  "> Analizando señuelos de ingeniería social...",
  "> Calculando presión de amenaza...",
  "$ Escaneo completado. Izando resultados...",
] as const;

const LINE_INTERVAL_MS = 350;

/* ---------- Animation variants ---------- */
const lineVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

/* ---------- Component ---------- */
export default function LoadingTerminal() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= TERMINAL_LINES.length) return;

    const id = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= TERMINAL_LINES.length) {
          clearInterval(id);
          return prev;
        }
        return prev + 1;
      });
    }, LINE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [visibleCount]);

  const progress = (visibleCount / TERMINAL_LINES.length) * 100;
  const allDone = visibleCount >= TERMINAL_LINES.length;

  return (
    <motion.div
      layoutId="analysis-panel"
      className="mx-auto w-full max-w-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="overflow-hidden rounded-2xl border border-cyber-cyan/10 bg-[#020814]/80 backdrop-blur-xl shadow-2xl">
        {/* ---- Terminal header bar ---- */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-cyber-dark/80 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-cyber-red" />
          <span className="h-3 w-3 rounded-full bg-cyber-yellow" />
          <span className="h-3 w-3 rounded-full bg-[#00d4ff]" />
          <span className="ml-3 font-mono text-xs tracking-wide text-slate-500">
            sonar_deep_scan.sh
          </span>
        </div>

        {/* ---- Terminal content ---- */}
        <div className="min-h-[280px] p-5 font-mono text-sm text-cyber-cyan">
          <AnimatePresence>
            {TERMINAL_LINES.slice(0, visibleCount).map((line, i) => (
              <motion.p
                key={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="mb-1.5 leading-relaxed"
              >
                {line}
              </motion.p>
            ))}
          </AnimatePresence>

          {/* Blinking cursor */}
          {allDone && (
            <motion.span
              className="mt-1 inline-block h-4 w-2 bg-cyber-cyan"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "steps(2)" }}
            />
          )}
        </div>

        {/* ---- Progress bar ---- */}
        <div className="h-1 w-full bg-[#020814]/50">
          <motion.div
            className="h-full bg-cyber-cyan"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              boxShadow:
                "0 0 8px rgba(0,212,255,0.6), 0 0 20px rgba(0,212,255,0.3)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
