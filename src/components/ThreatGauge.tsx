import { motion } from "framer-motion";

/* ---------- Constants ---------- */
const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* ---------- Helpers ---------- */
function getColor(score: number): string {
  if (score <= 4) return "#00ff41";
  if (score <= 7) return "#ffaa00";
  return "#ff0040";
}

function getGlowId(score: number): string {
  if (score <= 4) return "glow-green";
  if (score <= 7) return "glow-yellow";
  return "glow-red";
}

/* ---------- Props ---------- */
interface ThreatGaugeProps {
  score: number;
}

/* ---------- Component ---------- */
export default function ThreatGauge({ score }: ThreatGaugeProps) {
  const clampedScore = Math.max(0, Math.min(10, score));
  const offset = CIRCUMFERENCE - (clampedScore / 10) * CIRCUMFERENCE;
  const color = getColor(clampedScore);
  const glowId = getGlowId(clampedScore);

  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="0 0 120 120"
        width="160"
        height="160"
        className="drop-shadow-lg"
      >
        {/* ---- Glow filter ---- */}
        <defs>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ---- Background ring ---- */}
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="#1e1e2e"
          strokeWidth="8"
        />

        {/* ---- Progress ring ---- */}
        <motion.circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          transform="rotate(-90 60 60)"
          filter={`url(#${glowId})`}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
        />

        {/* ---- Center score text ---- */}
        <text
          x="60"
          y="56"
          textAnchor="middle"
          dominantBaseline="central"
          fill={color}
          fontSize="28"
          fontWeight="bold"
          fontFamily="'Inter', sans-serif"
        >
          {clampedScore}
        </text>

        {/* ---- "/10" label ---- */}
        <text
          x="60"
          y="78"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#64748b"
          fontSize="12"
          fontFamily="'Inter', sans-serif"
        >
          /10
        </text>
      </svg>
    </div>
  );
}
