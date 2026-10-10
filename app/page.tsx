"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Portfolio from "./portfolio"; // ← importe o componente que criamos

// ─── Types ────────────────────────────────────────────────────────────────────
type Lang = "pt" | "en";
type Page = "home" | "portfolio";

// ─── Translations ─────────────────────────────────────────────────────────────
const translations = {
  pt: {
    eyebrow: "Desenvolvedor & Criador",
    greeting: "Olá, eu sou",
    description: "Produtos digitais com React e TypeScript — de plataformas de comunidade e dashboards a jogos interativos, unindo arquitetura sólida, performance e experiência de usuário.",
    cta: "Veja meu portfólio",
    specialties: "Web · Mobile · Dados",
    edition: "Portfólio / 2026",
    based: "Baseado em",
    location: "Recife, Brasil",
  },
  en: {
    eyebrow: "Developer & Creator",
    greeting: "Hi, I am",
    description: "Digital products with React and TypeScript — from community platforms and dashboards to interactive games, combining solid architecture, performance, and user experience.",
    cta: "Take a look at my portfolio",
    specialties: "Web · Mobile · Data",
    edition: "Portfolio / 2026",
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
  const [lang, setLang] = useState<Lang>("pt");
  const [page, setPage] = useState<Page>("home");
  const t = translations[lang];

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
        lang={lang}
        onLangChange={setLang}
        onBack={() => setPage("home")}
      />
    );
  }

  // ── Home ───────────────────────────────────────────────────────────────────
  return (
    <>
      <main className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-[#08070b] text-white lg:h-[100svh] lg:flex-row">

        {/* Noise texture */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.045]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
          }}
        />

        {/* Technical grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: `
      linear-gradient(rgba(165,126,255,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(165,126,255,0.035) 1px, transparent 1px)
    `,
            backgroundSize: "64px 64px",
            maskImage: "linear-gradient(to right, black 0%, rgba(0,0,0,0.35) 65%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, rgba(0,0,0,0.35) 65%, transparent 85%)",
          }}
        />

        <div className="pointer-events-none absolute -left-[18vw] top-[8vh] z-0 h-[75vw] w-[75vw] rounded-full bg-[radial-gradient(circle,rgba(95,42,167,0.18),transparent_65%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-violet-300/35 to-transparent" />

        {/* LEFT — Text section */}
        <motion.div
          key={lang}
          variants={container}
          initial="hidden"
          animate="visible"
          className="relative z-20 flex flex-col justify-center px-7 pb-12 pt-24 sm:px-12 lg:w-[57%] lg:shrink-0 lg:px-[clamp(64px,6.2vw,120px)] lg:pb-20 lg:pt-20"
        >
          <motion.div variants={fadeUp} className="mb-12 flex max-w-[690px] items-center justify-between gap-4 border-t border-white/15 pt-4 sm:mb-16 lg:absolute lg:left-[clamp(64px,6.2vw,120px)] lg:right-[clamp(64px,6.2vw,120px)] lg:top-12 lg:mb-0">
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-white/70">EB<span className="text-violet-400">.</span></span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/45">{t.edition}</span>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mb-5 text-[11px] font-medium uppercase tracking-[0.25em] text-violet-200/85"
          >
            <span className="mr-3 mb-[2px] inline-block h-1.5 w-1.5 rounded-full bg-[#a46bff] align-middle shadow-[0_0_14px_rgba(164,107,255,0.8)]" />
            {t.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mb-8 font-syne text-[clamp(55px,7vw,120px)] font-extrabold leading-[0.91] tracking-[-0.065em]"
          >
            <span className="mb-2 block font-normal text-[0.6em] leading-[1.05] tracking-[-0.06em] text-white/72">{t.greeting}</span>
            <span className="block text-[#f7f4ff]">Ezequiel</span>
            <span className="block bg-gradient-to-r from-[#b891ff] via-[#9558f6] to-[#6931cf] bg-clip-text text-transparent">Borges<span className="text-[#e8d8ff]">.</span></span>
          </motion.h1>

          <motion.div variants={fadeUp} className="mb-9 flex max-w-[590px] gap-5 border-l-2 border-violet-400/70 pl-5 sm:pl-6">
            <p className="max-w-[530px] text-[clamp(15px,1.15vw,18px)] leading-[1.65] text-white/70">{t.description}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => setPage("portfolio")}
              className="group inline-flex min-h-14 items-center justify-between gap-4 bg-[#f7f4ff] px-6 text-[#150e23] shadow-[0_14px_38px_rgba(0,0,0,0.22)] transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[0_18px_44px_rgba(92,44,171,0.24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 sm:gap-10 sm:px-8"
            >
              <span className="whitespace-nowrap font-syne text-[12px] font-bold uppercase tracking-[0.05em] sm:tracking-[0.08em]">{t.cta}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ddd0f6] text-[#4f208d]"><ArrowRight /></span>
            </button>
            <span className="text-[10px] uppercase tracking-[0.19em] text-white/45">01 / 02</span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex max-w-[690px] items-center gap-4 border-t border-white/15 pt-4 lg:absolute lg:bottom-10 lg:left-[clamp(64px,6.2vw,120px)] lg:right-[clamp(64px,6.2vw,120px)] lg:mt-0"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/50">{t.specialties}</span>
          </motion.div>
        </motion.div>

        {/* RIGHT — Photo section */}
        <motion.div
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="relative min-h-[420px] w-full overflow-hidden lg:min-h-0 lg:flex-1"
        >
          <Image
            src="/images/ezequiel.jpg"
            alt="Ezequiel Borges"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 43vw"
            className="object-cover object-[center_27%] grayscale contrast-[1.12] brightness-[0.93] transition-transform duration-[1200ms] ease-out hover:scale-[1.025] lg:object-[center_22%]"
          />

          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, #08070b 0%, rgba(8,7,11,0.72) 8%, transparent 38%)" }}
          />
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "linear-gradient(0deg, rgba(8,7,11,0.94) 0%, transparent 36%, rgba(8,7,11,0.18) 100%)" }}
          />
          <div className="pointer-events-none absolute inset-0 z-10 bg-violet-700/[0.08] mix-blend-screen" />
          <div className="pointer-events-none absolute inset-5 z-20 border border-white/[0.11] sm:inset-8" />
          <div className="pointer-events-none absolute left-5 top-5 z-20 h-10 w-10 border-l border-t border-violet-300/70 sm:left-8 sm:top-8" />

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute bottom-10 right-8 z-30 flex flex-col gap-1 px-5 py-3 sm:bottom-12 sm:right-12"
            style={{
              background: "rgba(10,8,16,0.72)",
              border: "1px solid rgba(191,166,235,0.25)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 14px 32px rgba(0,0,0,0.22)",
            }}
          >
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/55 font-light">
              {t.based}
            </span>
            <div className="flex items-center gap-2">
              <span className="mr-1 h-2 w-2 rounded-full bg-violet-400" />
              <span className="font-syne font-bold text-[13px] tracking-tight text-white">
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
