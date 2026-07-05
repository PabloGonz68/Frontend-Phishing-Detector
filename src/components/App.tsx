import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "./HeroSection";
import AnalyzerForm from "./AnalyzerForm";
import LoadingTerminal from "./LoadingTerminal";
import ResultsDashboard from "./ResultsDashboard";
import ErrorToast from "./ErrorToast";
import BackgroundOcean3D from "./BackgroundOcean3D";
import { analyzeEmail, RateLimitError, type AnalyzeResponse } from "../lib/api";

type AppState = "idle" | "loading" | "results";

export default function App() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [results, setResults] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (subject: string, body: string) => {
    setAppState("loading");
    setError(null);
    setResults(null);

    try {
      const response = await analyzeEmail(subject, body);
      // Small delay to let the terminal animation feel complete
      await new Promise((resolve) => setTimeout(resolve, 800));
      setResults(response);
      setAppState("results");
    } catch (err) {
      setAppState("idle");
      if (err instanceof RateLimitError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error inesperado. Verifica que el backend esté activo.");
      }
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState("idle");
    setResults(null);
    setError(null);
  }, []);

  const handleCloseError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#020617] overflow-hidden">
      {/* Background gradient orbs (Deep Sea / Radar vibe) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[700px] h-[700px] bg-cyber-cyan/[0.04] rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-cyber-green/[0.03] rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-blue-600/[0.05] rounded-full blur-[150px]" />
      </div>

      <BackgroundOcean3D />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />

        <div className="py-12 md:py-20">
          <AnimatePresence mode="wait">
            {appState === "idle" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <AnalyzerForm onSubmit={handleSubmit} isLoading={false} />
              </motion.div>
            )}

            {appState === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <LoadingTerminal />
              </motion.div>
            )}

            {appState === "results" && results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ResultsDashboard results={results} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Error Toast */}
      <AnimatePresence>
        {error && <ErrorToast message={error} onClose={handleCloseError} />}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-white/5">
        <p className="text-xs text-slate-600">
          Phishing Analyzer AI — Hecha por{" "}
          <a
            href="https://pablogonz68.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyber-cyan hover:underline hover:text-white transition-colors duration-300"
          >
            Pablo González Silva
          </a>
        </p>
      </footer>
    </main>
  );
}
