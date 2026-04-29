"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ─────────────────────────────────────────────────────────────────────
export type ProjectModalProps = {
  open: boolean;
  onClose: () => void;
  repoUrl: string;
  lang: "pt" | "en";
  projectName: string;
};

// ─── Translations ──────────────────────────────────────────────────────────────
const t = {
  pt: {
    question: "Deseja visitar o repositório deste projeto?",
    confirm: "Visitar repositório",
    cancel: "Agora não",
  },
  en: {
    question: "Would you like to visit this project's repository?",
    confirm: "Visit repository",
    cancel: "Not yet",
  },
};

// ─── Modal ─────────────────────────────────────────────────────────────────────
export default function ProjectModal({
  open,
  onClose,
  repoUrl,
  lang,
  projectName,
}: ProjectModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const copy = t[lang];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] cursor-pointer"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md"
            style={{
              background: "rgba(14,14,14,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(168,85,247,0.15)",
            }}
          >
            {/* Purple top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
            />

            <div className="p-8">
              {/* Project name */}
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 font-light mb-3">
                {projectName}
              </p>

              {/* Question */}
              <h2 className="font-syne font-extrabold text-[clamp(18px,2vw,24px)] text-white/90 leading-snug tracking-[-0.02em] mb-8">
                {copy.question}
              </h2>

              {/* GitHub URL preview */}
              <div
                className="flex items-center gap-3 px-4 py-3 mb-8"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-white/30 shrink-0">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="text-[11px] text-white/70 font-light truncate">{repoUrl}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white text-[#080808] font-syne font-bold text-[12px] tracking-[0.08em] uppercase py-[13px] hover:bg-white/88 transition-all duration-200 hover:-translate-y-[1px]"
                >
                  {copy.confirm}
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <button
                  onClick={onClose}
                  className="px-6 text-[12px] tracking-[0.08em] uppercase font-light text-white/35 hover:text-white/70 transition-colors duration-200"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {copy.cancel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
