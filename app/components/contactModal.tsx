"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "pt" | "en";
}

const translations = {
  pt: {
    label: "Contato",
    question: "Vamos conversar?",
    sub: "Sinta-se à vontade para me chamar no LinkedIn ou copiar meu e-mail abaixo.",
    confirm: "Conectar no LinkedIn",
    copy: "Copiar E-mail",
    copied: "Copiado!",
    cancel: "Agora não",
  },
  en: {
    label: "Contact",
    question: "Let's chat?",
    sub: "Feel free to reach out via LinkedIn or copy my email address below.",
    confirm: "Connect on LinkedIn",
    copy: "Copy Email",
    copied: "Copied!",
    cancel: "Not now",
  },
};

export default function ContactModal({ isOpen, onClose, lang }: ContactModalProps) {
  const linkedinUrl = "https://www.linkedin.com/in/ezequielborgesdev";
  const email = "ezequielborgesdev@gmail.com";
  const [copied, setCopied] = useState(false);
  const copy = translations[lang];

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] cursor-pointer"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md rounded-lg overflow-hidden"
            style={{
              background: "rgba(14,14,14,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />

            <div className="p-8 relative z-10">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 font-light mb-3">{copy.label}</p>
              <h2 className="font-syne font-extrabold text-[24px] text-white/90 mb-2">{copy.question}</h2>
              <p className="text-white/40 font-light text-[13px] mb-8">{copy.sub}</p>

              {/* Email Display / Box (Mantido como antes) */}
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-4 py-3 mb-8">
                <span className="text-sm text-white/70 font-light truncate">{email}</span>
                <button onClick={handleCopy} className="text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors">
                  {copied ? copy.copied : copy.copy}
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {/* Botão LinkedIn com o SVG/Icon solicitado */}
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-white text-[#080808] font-syne font-bold text-[12px] tracking-[0.08em] uppercase py-[14px] hover:bg-white/88 transition-all duration-200 hover:-translate-y-[1px]"
                >
                  <i className="devicon-linkedin-plain text-[20px]" />
                  {copy.confirm}
                </a>
                
                <button
                  onClick={onClose}
                  className="w-full py-[14px] text-[12px] tracking-[0.08em] uppercase font-light text-white/35 hover:text-white/70 transition-colors duration-200"
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