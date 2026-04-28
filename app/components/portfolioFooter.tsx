"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// ─── SVG ICONS ─────────────────────────────────────────────

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M12 .5C5.73.5.75 5.7.75 12.2c0 5.2 3.44 9.6 8.2 11.2.6.1.8-.3.8-.6v-2.2c-3.34.7-4.04-1.6-4.04-1.6-.5-1.3-1.24-1.6-1.24-1.6-1.02-.7.08-.7.08-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.7.6 2.1 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.4-5.5-6 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.3a11 11 0 0 1 6 0C17.2 4.2 18.2 4.5 18.2 4.5c.6 1.6.2 2.8.1 3.1.8.9 1.2 2 1.2 3.3 0 4.6-2.8 5.7-5.5 6 .5.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6 4.8-1.6 8.2-6 8.2-11.2C23.25 5.7 18.27.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.9 3.87 6 2.48 6S0 4.9 0 3.5 1.11 1 2.48 1s2.5 1.1 2.5 2.5zM0 8h4.9v15H0V8zm7.5 0H12v2.1h.1c.6-1.1 2.1-2.3 4.4-2.3 4.7 0 5.6 3.1 5.6 7.1V23h-4.9v-6.8c0-1.6 0-3.7-2.3-3.7s-2.6 1.7-2.6 3.6V23H7.5V8z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
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
  const [toast, setToast] = useState(false);
  const t = footerT[lang];

  const copyEmail = async () => {
    await navigator.clipboard.writeText("ezequielborgesdev@gmail.com");
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };

  return (
    <>
      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[999]"
          >
            <div
              className="px-5 py-3 text-[11px] tracking-[0.25em] uppercase text-white/90 font-light relative overflow-hidden"
              style={{
                background: "rgba(25, 10, 40, 0.85)",
                border: "1px solid rgba(168, 85, 247, 0.35)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 0 25px rgba(168, 85, 247, 0.35), 0 10px 40px rgba(0,0,0,0.4)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, rgba(168,85,247,0.25), transparent 70%)",
                  opacity: 0.8,
                }}
              />
              <span className="relative z-10">{t.copied}</span>
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

        {/* Center - ICONS ONLY */}
        <div className="flex items-center gap-7 text-white/40">
          <a
            href="https://github.com/kiellzz"
            target="_blank"
            className="hover:text-white transition-transform duration-200 hover:scale-110"
          >
            <GithubIcon />
          </a>

          <a
            href="https://linkedin.com/in/ezequielborgesdev"
            target="_blank"
            className="hover:text-white transition-transform duration-200 hover:scale-110"
          >
            <LinkedinIcon />
          </a>

          <button
            onClick={copyEmail}
            className="hover:text-white transition-transform duration-200 hover:scale-110 text-white/40"
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
