"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import LanguageModal from "./components/language";
import Portfolio from "./portfolio"; // ← importe o componente que criamos

// ─── Types ────────────────────────────────────────────────────────────────────
type Lang = "pt" | "en";
type Page = "home" | "portfolio";

// ─── Translations ─────────────────────────────────────────────────────────────
const translations = {
  pt: {
    eyebrow: "Desenvolvedor & Criador",
    greeting: "Olá, eu sou",
    description: "React & TypeScript — de games a dashboards, foco em interfaces que têm alma",
    cta: "Veja meu portfólio",
    ghost: "",
    based: "Baseado em",
    location: "Recife, Brasil",
  },
  en: {
    eyebrow: "Developer & Creator",
    greeting: "Hi, I am",
    description: "React & TypeScript — from games to dashboards, building interfaces with soul",
    cta: "Take a look at my portfolio",
    ghost: "",
    based: "Based in",
    location: "Recife, Brazil",
  },
};

// ─── Arrow Icon ───────────────────────────────────────────────────────────────
function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="transition-transform duration-200 group-hover:translate-x-1"
    >
      <path
        d="M2 7h10M8 3l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}



// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState<Lang | null>(null);
  const [page, setPage] = useState<Page>("home");
  const t = lang ? translations[lang] : translations.en;

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.35 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // ── Renderiza portfólio se page === "portfolio" ─────────────────────────────
  if (page === "portfolio") {
    return (
      <Portfolio
        lang={lang ?? "en"}
        onBack={() => setPage("home")}
      />
    );
  }

  // ── Home ───────────────────────────────────────────────────────────────────
  return (
    <>
      <AnimatePresence mode="wait">
        {!lang && <LanguageModal onSelect={setLang} />}
      </AnimatePresence>

      <main className="h-screen w-full bg-[#080808] text-white overflow-hidden relative flex flex-col md:flex-row">

        {/* Noise texture */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
          }}
        />

        {/* Technical grid */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `
      linear-gradient(rgba(124,58,237,0.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(124,58,237,0.045) 1px, transparent 1px)
    `,
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 55%, transparent 75%)",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 55%, transparent 75%)",
          }}
        />

        {/* Ambient blobs */}
        <div
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full pointer-events-none z-0 animate-blob-1"
          style={{ background: "radial-gradient(ellipse, rgba(120,60,220,0.12) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[55vw] h-[55vw] rounded-full pointer-events-none z-0 animate-blob-2"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${1 + (i % 3) * 0.7}px`,
                height: `${1 + ((i * 5) % 3) * 0.65}px`,
                background: i % 3 === 0 ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.2)",
                left: `${30 + ((i * 19) % 40)}%`,
                bottom: `${3 + ((i * 23) % 42)}%`,
                animation: `floatParticle ${6 + ((i * 7) % 8)}s ease-in-out infinite`,
                animationDelay: `${((i * 0.43) % 5).toFixed(2)}s`,
              }}
            />
          ))}
        </div>

        {/* LEFT — Text section */}
        <motion.div
          key={lang ?? "default"}
          variants={container}
          initial="hidden"
          animate={lang ? "visible" : "hidden"}
          className="flex-[1.62] flex flex-col justify-center px-10 md:px-24 z-10 relative"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] tracking-[0.25em] uppercase text-white/55 font-light mb-7"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7C3AED] mr-3 mb-[1px] align-middle" />
            {t.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-syne font-extrabold leading-[0.93] tracking-[-0.03em] text-[clamp(52px,6.5vw,92px)] mb-7"
          >
            <span className="text-white/30 font-normal">{t.greeting}</span>
            <br />
            <span
              style={{
                background: "linear-gradient(105deg, #fff 30%, rgba(255,255,255,0.42) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ezequiel
              <br />
            </span>
            <span className="text-[#7C3AED]">
              Borges.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-white/40 font-light text-[clamp(14px,1.3vw,17px)] leading-relaxed max-w-[360px] mb-12"
          >
            {t.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-5">
            {/* ← botão agora chama setPage("portfolio") */}
            <button
              onClick={() => setPage("portfolio")}
              className="group flex items-center gap-3 bg-white text-[#080808] font-syne font-bold text-[13px] tracking-[0.08em] uppercase px-9 py-[15px] hover:bg-white/88 transition-all duration-200 hover:-translate-y-[2px]"
            >
              {t.cta}
              <ArrowRight />
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="absolute bottom-8 left-10 md:left-24 flex gap-6"
          >
          </motion.div>
        </motion.div>

        {/* RIGHT — Photo section */}
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={lang ? { opacity: 1, x: 0 } : { opacity: 0, x: 48 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="relative w-full md:w-[38vw] h-1/2 md:h-full overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-px z-30 bg-gradient-to-b from-transparent via-white/25 to-transparent" />

          <Image
            src="/images/ezequiel.jpg"
            alt="Ezequiel Borges"
            fill
            priority
            className="object-cover object-top grayscale contrast-105 scale-[1.03] hover:scale-[1.06] transition-transform duration-[8000ms] ease-in-out"
          />

          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #080808 0%, rgba(8,8,8,0.55) 22%, transparent 55%)" }}
          />
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to top, #080808 0%, transparent 28%)" }}
          />

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={lang ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-9 right-9 z-30 flex flex-col gap-1 px-5 py-3"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(124,58,237,0.35)",
              backdropFilter: "blur(12px)",
              borderRadius: "12px",
              boxShadow: "0 0 18px rgba(124,58,237,0.12), inset 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/50 font-light">
              {t.based}
            </span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]" />
              </span>
              <span className="font-syne font-bold text-[13px] tracking-tight text-white/90">
                {t.location}
              </span>
              <img
                src="https://flagcdn.com/w40/br.png"
                alt="Brasil"
                className="w-4 h-3 object-cover rounded-[1px]"
              />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
}
