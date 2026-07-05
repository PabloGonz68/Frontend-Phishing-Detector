import { useState } from "react";
import { motion } from "framer-motion";

interface AnalyzerFormProps {
  onSubmit: (subject: string, body: string) => void;
  isLoading: boolean;
}

export default function AnalyzerForm({ onSubmit, isLoading }: AnalyzerFormProps) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;
    onSubmit(subject, body);
  };

  const isValid = subject.trim().length > 0 && body.trim().length > 0;

  return (
    <motion.section
      id="analyzer-form"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4"
    >
      <form onSubmit={handleSubmit} className="glass p-6 md:p-8 space-y-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/20 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-cyber-cyan"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Analizar Correo Electrónico
            </h2>
            <p className="text-xs text-slate-500">
              Introduce el asunto y cuerpo del email sospechoso
            </p>
          </div>
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <label
            htmlFor="email-subject"
            className="block text-sm font-medium text-slate-300"
          >
            Asunto del Correo
          </label>
          <input
            id="email-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ej: Urgente - Verifica tu cuenta ahora"
            disabled={isLoading}
            className="w-full px-4 py-3 bg-[#020814]/80 border border-cyber-cyan/10 rounded-xl text-white placeholder-slate-600 text-sm
                       focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/20
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Body Field */}
        <div className="space-y-2">
          <label
            htmlFor="email-body"
            className="block text-sm font-medium text-slate-300"
          >
            Cuerpo del Correo
          </label>
          <textarea
            id="email-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Pega aquí el contenido completo del correo electrónico sospechoso..."
            rows={8}
            disabled={isLoading}
            className="w-full px-4 py-3 bg-[#020814]/80 border border-cyber-cyan/10 rounded-xl text-white placeholder-slate-600 text-sm
                       resize-none focus:outline-none focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/20
                       transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={!isValid || isLoading}
          whileHover={isValid && !isLoading ? { scale: 1.02 } : {}}
          whileTap={isValid && !isLoading ? { scale: 0.98 } : {}}
          className={`w-full relative py-3.5 px-6 rounded-xl font-semibold text-sm tracking-wide uppercase
                      transition-all duration-300 overflow-hidden
                      ${
                        isValid && !isLoading
                          ? "bg-cyber-cyan text-cyber-black hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] cursor-pointer"
                          : "bg-slate-800 text-slate-500 cursor-not-allowed"
                      }`}
        >
          {/* Button Glow Effect */}
          {isValid && !isLoading && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {/* Sonar Radar Icon */}
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animationDuration: '6s' }}
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="12" cy="12" r="1" />
              <path d="M12 2v20M2 12h20" />
            </svg>
            Lanzar Escáner Submarino
          </span>
        </motion.button>
      </form>
    </motion.section>
  );
}
