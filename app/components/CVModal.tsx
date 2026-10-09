"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Lang = "pt" | "en";

export default function CVModal({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: Lang }) {
  const [activeLang, setActiveLang] = useState<Lang>(lang);
  
  useEffect(() => {
    if (isOpen) {
      setActiveLang(lang);
      document.body.style.overflow = "hidden";
    }
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen, lang]);

  const resumes = {
    pt: {
      file: "/EzequielBorges_portugueseCV.pdf",
      preview: "/images/ptpreview.png",
      download: "Baixar currículo em português",
      previewAlt: "Prévia do currículo ATS em português",
    },
    en: {
      file: "/EzequielBorges_englishCV.pdf",
      preview: "/images/enpreview.png",
      download: "Download English resume",
      previewAlt: "English ATS resume preview",
    }
  };

  const content = resumes[activeLang];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }} // Backdrop acompanhando a suavidade
            onClick={onClose}
            className="fixed inset-0 z-[100] cursor-pointer"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ 
              duration: 0.5, // Animação mais lenta/suave solicitada
              ease: [0.16, 1, 0.3, 1] // Curva premium (rápida no início, lenta no fim)
            }}
            className="fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-4xl rounded-lg overflow-hidden flex flex-col max-h-[90vh]"
            style={{
              background: "rgba(14,14,14,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
            }}
          >
            {/* Linha de Gradiente Superior */}
            <div className="absolute top-0 left-0 right-0 h-px z-20" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }} />

            {/* Header Fixo */}
            <div className="p-5 border-b border-white/5 flex items-center justify-between gap-4 relative z-10">
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/25 font-light ml-2">
                    {lang === "pt" ? "Currículos ATS" : "ATS resumes"}
                </p>
                <div className="flex items-center gap-2 ml-auto" role="tablist" aria-label={lang === "pt" ? "Idioma do currículo" : "Resume language"}>
                  {(["pt", "en"] as Lang[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      role="tab"
                      aria-selected={activeLang === option}
                      onClick={() => setActiveLang(option)}
                      className={`px-4 py-2 rounded text-[10px] tracking-[0.14em] uppercase transition-colors ${
                        activeLang === option
                          ? "bg-white text-black"
                          : "bg-white/5 text-white/55 hover:text-white"
                      }`}
                    >
                      {option === "pt" ? "Português" : "English"}
                    </button>
                  ))}
                </div>
                <button onClick={onClose} aria-label={lang === "pt" ? "Fechar" : "Close"} className="text-white/40 hover:text-white transition-all p-2">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            {/* Área de Scroll */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-10 custom-scrollbar bg-black/20">
              <div className="w-full flex justify-center">
                <img 
                  src={content.preview} 
                  alt={content.previewAlt}
                  className="w-full h-auto max-w-3xl shadow-2xl select-none"
                />
              </div>
            </div>

            {/* Footer Fixo com Download Estilizado */}
            <div className="p-6 border-t border-white/5 relative z-10">
                <motion.a 
                  href={content.file} 
                  download 
                  whileHover={{ scale: 1.01, backgroundColor: "#eee" }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-3 bg-white text-black font-syne font-bold text-[13px] tracking-[0.15em] uppercase py-5 rounded-md transition-all shadow-lg"
                >
                  {/* SVG de Download */}
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 100 100" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="mt-[-2px]"
                  >
                    <path 
                      d="M50 15V65M50 65L30 45M50 65L70 45" 
                      stroke="currentColor" 
                      strokeWidth="8" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M20 85H80" 
                      stroke="currentColor" 
                      strokeWidth="8" 
                      strokeLinecap="round"
                    />
                  </svg>
                  {content.download}
                </motion.a>
            </div>

            {/* Estilização da Scrollbar */}
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.02);
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.2);
              }
            `}</style>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
