"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ─── Inject Devicon stylesheet once ────────────────────────
function useDevicon() {
  useEffect(() => {
    const id = "devicon-css";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css";
    document.head.appendChild(link);
  }, []);
}

// ─── Mail Icon ──────────────────────────────────────────────
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />
    </svg>
  );
}

// ─── Toast Mail Icon ────────────────────────────────────────
function ToastMailIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.85)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />
    </svg>
  );
}

// ─── Types ─────────────────────────────────────────────────
type Lang = "pt" | "en";

const footerT = {
  pt: {
    copied: "Email copiado",
    available: "Disponível",
  },
  en: {
    copied: "Email copied",
    available: "Available",
  },
};

// ─── COMPONENT ─────────────────────────────────────────────
export default function PortfolioFooter({ lang = "pt" }: { lang?: Lang }) {
  useDevicon();

  const [toast, setToast] = useState(false);
  const t = footerT[lang];

  const copyEmail = async () => {
    await navigator.clipboard.writeText("ezequielborgesdev@gmail.com");
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  };

  return (
    <>
      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -28, scale: 0.88, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0,   scale: 1,    filter: "blur(0px)" }}
            exit={{   opacity: 0, y: -16,  scale: 0.94, filter: "blur(4px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[999]"
          >
            <div
              className="flex flex-col items-center gap-[5px] px-8 py-[18px] relative overflow-hidden"
              style={{
                background: "rgba(12, 12, 12, 0.95)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "14px",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.6)",
                backdropFilter: "blur(16px)",
              }}
            >
              {/* top shimmer line */}
              <span
                className="absolute top-0 left-[20%] right-[20%] h-px pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                }}
              />

              {/* shimmer sweep */}
              <motion.span
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "220%",  opacity: [0, 1, 0] }}
                transition={{ duration: 0.9, delay: 0.3, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  width: "40%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)",
                }}
              />

              {/* icon circle */}
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1,   opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center mb-[6px]"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <ToastMailIcon />
              </motion.div>

              {/* label */}
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                className="text-[10px] tracking-[0.24em] uppercase font-light"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {t.copied}
              </motion.span>

              {/* email */}
              <motion.span
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.32, ease: "easeOut" }}
                className="text-[11px] font-light tracking-[0.04em]"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                ezequielborgesdev@gmail.com
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 py-3"
        style={{
          background: "rgba(8,8,8,0.65)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Left */}
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/15 font-light">
          © 2026 Ezequiel Borges
        </span>

        {/* Center - Icons */}
        <div className="flex items-center gap-7 text-white/40">
          <a
            href="https://github.com/kiellzz"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-all duration-200 hover:scale-110 inline-flex"
            aria-label="GitHub"
          >
            <i className="devicon-github-original text-[26px]" />
          </a>

          <a
            href="https://linkedin.com/in/ezequielborgesdev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-all duration-200 hover:scale-110 inline-flex"
            aria-label="LinkedIn"
          >
            <i className="devicon-linkedin-plain text-[26px]" />
          </a>

          <button
            onClick={copyEmail}
            className="hover:text-white transition-all duration-200 hover:scale-110 text-white/40 inline-flex"
            aria-label="Copy email"
          >
            <MailIcon />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <span className="w-[5px] h-[5px] rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/15 font-light">
            {t.available}
          </span>
        </div>
      </motion.footer>
    </>
  );
}
