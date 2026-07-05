import { motion, AnimatePresence } from "framer-motion";
import ThreatGauge from "./ThreatGauge";

/* ---------- Types ---------- */
interface AnalysisResults {
  threatScore: number;
  maliciousLinks: string;
  tacticsUsed: string;
}

interface ResultsDashboardProps {
  results: AnalysisResults;
  onReset: () => void;
}

/* ---------- Animation variants ---------- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ---------- Helpers ---------- */
function getThreatLabel(score: number) {
  if (score <= 4) return { text: "Riesgo Bajo", cls: "text-cyber-green" };
  if (score <= 7) return { text: "Riesgo Medio", cls: "text-cyber-yellow" };
  return { text: "Riesgo Alto", cls: "text-cyber-red" };
}

/** Naïve URL detector */
function extractUrls(text: string): string[] {
  const urlRegex = /https?:\/\/[^\s,)>\]]+/gi;
  return text.match(urlRegex) ?? [];
}

function isClean(text: string): boolean {
  if (!text || text.trim() === "") return true;
  const lower = text.toLowerCase().trim();
  return (
    lower === "ninguno" ||
    lower === "ninguna" ||
    lower === "no se detectaron" ||
    lower === "none"
  );
}

/* ---------- Inline SVG Icons ---------- */
function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function LinkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function EyeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="20"
      height="20"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="18"
      height="18"
      className="text-cyber-cyan"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="16"
      height="16"
      className="text-cyber-red shrink-0"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

/* ---------- Sub-components ---------- */
function CardHeader({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5 text-slate-300">
      {icon}
      <h3 className="text-base font-semibold tracking-wide">{title}</h3>
    </div>
  );
}

/* ---------- Main Component ---------- */
export default function ResultsDashboard({
  results,
  onReset,
}: ResultsDashboardProps) {
  const { threatScore, maliciousLinks, tacticsUsed } = results;
  const label = getThreatLabel(threatScore);
  const urls = extractUrls(maliciousLinks);
  const linksClean = isClean(maliciousLinks) && urls.length === 0;

  // Parse comma-separated tactics
  const tacticsList = tacticsUsed
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const tacticsClean = isClean(tacticsUsed) || tacticsList.length === 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="results"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="mx-auto w-full max-w-5xl space-y-8"
      >
        {/* ---- Card grid ---- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* === Card 1: Threat Score === */}
          <motion.div variants={cardVariants} className="glass p-6 flex flex-col items-center">
            <CardHeader
              icon={<ShieldIcon className="text-cyber-cyan" />}
              title="Nivel de Amenaza"
            />
            <div className="my-4 flex-1 flex items-center justify-center">
              <ThreatGauge score={threatScore} />
            </div>
            <span className={`mt-2 text-sm font-semibold tracking-wide ${label.cls}`}>
              {label.text}
            </span>
          </motion.div>

          {/* === Card 2: Malicious Links === */}
          <motion.div variants={cardVariants} className="glass p-6">
            <CardHeader
              icon={<LinkIcon className="text-cyber-cyan" />}
              title="Enlaces Maliciosos"
            />

            {linksClean ? (
              <div className="flex items-center gap-2 text-cyber-cyan text-sm">
                <CheckIcon />
                <span>No se detectaron enlaces maliciosos</span>
              </div>
            ) : (
              <div className="space-y-2">
                {urls.length > 0 ? (
                  urls.map((url, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 rounded bg-cyber-black/50 p-2"
                    >
                      <WarningIcon />
                      <code className="font-mono text-sm text-cyber-red break-all">
                        {url}
                      </code>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {maliciousLinks}
                  </p>
                )}
              </div>
            )}
          </motion.div>

          {/* === Card 3: Tactics Used === */}
          <motion.div variants={cardVariants} className="glass p-6">
            <CardHeader
              icon={<EyeIcon className="text-cyber-cyan" />}
              title="Tácticas Detectadas"
            />

            {tacticsClean ? (
              <div className="flex items-center gap-2 text-cyber-cyan text-sm">
                <CheckIcon />
                <span>No se detectaron tácticas de phishing</span>
              </div>
            ) : (
              <ul className="space-y-2">
                {tacticsList.map((tactic, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyber-yellow" />
                    <span className="leading-relaxed">{tactic}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>

        {/* ---- Reset button ---- */}
        <motion.div
          variants={cardVariants}
          className="flex justify-center pt-2"
        >
          <button
            onClick={onReset}
            className="cursor-pointer rounded-xl border border-cyber-cyan/30 px-6 py-3 font-medium text-cyber-cyan transition-all hover:bg-cyber-cyan/10 active:scale-[0.98]"
          >
            Nuevo Escaneo Sonar
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
