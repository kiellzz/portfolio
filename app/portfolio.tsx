"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import PortfolioFooter from "./components/portfolioFooter";
import SkillsBadges from "./components/skillsBadges";
import ProjectsSection from "./components/projects";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Lang = "pt" | "en";
type Section = "work" | "about" | "skills" | "contact";

// ─── Translations ──────────────────────────────────────────────────────────────
const translations = {
  pt: {
    nav: {
      work: "Trabalhos",
      about: "Sobre",
      skills: "Skills",
      contact: "Contato",
    },
    back: "Voltar",
    available: "Disponível para projetos",
    hero: {
      label: "Portfólio selecionado",
      title: "O que\nconstruí.",
      sub: "Projetos reais, soluções reais.",
    },
    projects: [
      {
        number: "01",
        name: "Ballers",
        type: "Website · Frontend · Game",
        desc: "Simulador de futebol interativo que combina o gerenciamento de cartas estilo FIFA a um motor de jogo focado em decisões e duelos de atributos.",
        tags: ["React", "TypeScript", "Vite"],
        video: "/videos/ballers.mp4",
        repo: "https://github.com/kiellzz/ballers-game",
      },
      {
        number: "02",
        name: "EZSaldo",
        type: "Webiste · Fullstack · App financeiro",
        desc: "Aplicação de gestão financeira fullstack com dashboard dinâmico, focada em uma experiência de usuário limpa e controle de saldo em tempo real.",
        tags: ["HTML", "CSS", "JavaScript", "Node.js"],
        video: "/videos/ezsaldo.mp4",
        repo: "https://github.com/kiellzz/financial-tracker",
      },
      {
        number: "03",
        name: "Slowed + Reverb Maker",
        type: "Website · Fullstack/Deploy · Áudio",
        desc: "Ferramenta web para criação de áudios slowed + reverb, que combina processamento de áudio via FFmpeg com uma interface moderna e sistema de pré-visualização antes do download",
        tags: ["HTML", "CSS5", "JavaScript", "Node.js", "FFMPEG"],
        video: "/videos/slowedreverb.mp4",
        repo: "https://github.com/kiellzz/slowed-reverb-maker",
      },
    ],
    about: {
      label: "Sobre mim",
      title: "Código com\nintenção.",
      p1: "Sou estudante de Análise e Desenvolvimento de Sistemas no 4º período da Faculdade Senac, com foco em resolver problemas e desenvolver projetos que aliam alto desempenho técnico a experiências de design memoráveis.",
      p2: "Estou em busca de oportunidades de estágio e emprego, onde cada detalhe importa, desde a arquitetura do sistema até a interface do usuário.",
      exp: "2024 - 2026",
      expLabel: "Atualmente cursando Análise e Desenvolvimento de Sistemas",
      projects: "B2 English",
      projectsLabel: "Intermediário avançado",
    },
    skills: {
      label: "Stack técnico",
      title: "Ferramentas\nque domino.",
      categories: [
        {
          name: "Frontend",
          color: "#818cf8",
          items: ["React", "JavaScript", "TypeScript", "Next.js", "React Native", "Framer Motion", "Tailwind CSS"],
        },
        {
          name: "Backend",
          color: "#34d399",
          items: ["Node.js", "Express.js", "Python", "MongoDB", "MySQL", "Multer", "FFMPEG"],
        },
        {
          name: "Ferramentas",
          color: "#fb923c",
          items: ["Git", "GitHub", "Vercel", "Render", "Figma", "Canva"],
        },
      ],
    },
    contact: {
      label: "Vamos conversar",
      title: "Próximo\nprojeto.",
      sub: "Aberto para freelance, trabalho remoto e colaborações criativas.",
      cta: "Enviar mensagem",
      email: "ezequielborgesdev@gmail.com",
    },
  },
  en: {
    nav: {
      work: "Work",
      about: "About",
      skills: "Skills",
      contact: "Contact",
    },
    back: "Back",
    available: "Available for projects",
    hero: {
      label: "Selected portfolio",
      title: "What I've\nbuilt.",
      sub: "Real projects, real solutions.",
    },
    projects: [
      {
        number: "01",
        name: "Ballers",
        type: "Website · Frontend · Game",
        desc: "Interactive football simulator that combines FIFA-style card management with a gameplay engine focused on decisions and attribute-based duels.",
        tags: ["React", "TypeScript", "Vite"],
        video: "/videos/ballers.mp4",
        repo: "https://github.com/kiellzz/ballers-game",
      },
      {
        number: "02",
        name: "EZSaldo",
        type: "Website · Fullstack · Financial App",
        desc: "Fullstack financial management application with a dynamic dashboard, focused on a clean user experience and real-time balance tracking.",
        tags: ["HTML", "CSS", "JavaScript", "Node.js"],
        video: "/videos/ezsaldo.mp4",
        repo: "https://github.com/kiellzz/financial-tracker",
      },
      {
        number: "03",
        name: "Slowed + Reverb Maker",
        type: "Website · Fullstack/Deploy · Audio",
        desc: "Web tool for creating slowed + reverb audios, combining FFmpeg audio processing with a modern interface and preview system before download.",
        tags: ["HTML", "CSS", "JavaScript", "FFMPEG"],
        video: "/videos/slowedreverb.mp4",
        repo: "https://github.com/kiellzz/slowed-reverb-maker",
      },
    ],
    about: {
      label: "About me",
      title: "Code with\nintention.",
      p1: "I'm a Systems Analysis and Development program student in my 4th semester at Senac College (Brazil), passionate about problem-solving and building interfaces that combine technical performance with memorable design.",
      p2: "I'm currently looking for internship and job opportunities, where every detail matters, from system architecture to the final UI on screen.",
      exp: "2024 - 2026",
      expLabel: "Currently pursuing Systems Analysis and Development",
      projects: "B2 English",
      projectsLabel: "Upper Intermediate",
    },
    skills: {
      label: "Tech stack",
      title: "Tools I\nmaster.",
      categories: [
        {
          name: "Frontend",
          color: "#818cf8",
          items: ["React", "JavaScript", "TypeScript", "Next.js", "React Native", "Framer Motion", "Tailwind CSS"],
        },
        {
          name: "Backend",
          color: "#34d399",
          items: ["Node.js", "Express.js", "Python", "MongoDB", "MySQL", "Multer", "FFMPEG"],
        },
        {
          name: "Tools",
          color: "#fb923c",
          items: ["Git", "GitHub", "Vercel", "Render", "Figma", "Canva"],
        },
      ],
    },
    contact: {
      label: "Let's talk",
      title: "Next\nproject.",
      sub: "Open for freelance, remote work and creative collaborations.",
      cta: "Send message",
      email: "ezequielborgesdev@gmail.com",
    },
  },
};

// ─── Header ────────────────────────────────────────────────────────────────────
function Header({
  active,
  onNav,
  onBack,
  t,
}: {
  active: Section;
  onNav: (s: Section) => void;
  onBack: () => void;
  t: (typeof translations)["en"];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems: Section[] = ["work", "about", "skills", "contact"];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 h-16"
      style={{
        background: "rgba(8,8,8,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Back button — more prominent ── */}
      <button
        onClick={onBack}
        className="group flex items-center gap-2 transition-colors duration-200"
      >
        <span
          className="flex items-center justify-center w-6 h-6 transition-all duration-200 group-hover:-translate-x-[2px]"
          style={{
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 1L3 5l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-[11px] tracking-[0.2em] uppercase font-light text-white/60 group-hover:text-white/90 transition-colors duration-200">
          {t.back}
        </span>
      </button>

      {/* ── Nav ── */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => onNav(item)}
            className="relative text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-200"
            style={{ color: active === item ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)" }}
          >
            {t.nav[item]}
            {active === item && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute -bottom-[3px] left-0 right-0 h-px bg-white/60"
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* ── Available badge — more prominent ── */}
      <div
        className="hidden md:flex items-center gap-2 px-3 py-[6px]"
        style={{
          border: "1px solid rgba(52,211,153,0.3)",
          background: "rgba(52,211,153,0.06)",
        }}
      >
        <span className="w-[6px] h-[6px] rounded-full bg-emerald-400 animate-pulse shrink-0" />
        <span className="text-[10px] tracking-[0.18em] uppercase text-emerald-400/80 font-light">
          {t.available}
        </span>
      </div>

      {/* ── Mobile hamburger ── */}
      <button
        className="md:hidden text-white/40 hover:text-white/80 transition-colors"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <path
            d={menuOpen ? "M1 1l16 10M1 11L17 1" : "M0 1h18M0 6h18M0 11h18"}
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 md:hidden flex flex-col py-4"
            style={{ background: "rgba(8,8,8,0.97)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => { onNav(item); setMenuOpen(false); }}
                className="px-8 py-3 text-left text-[11px] tracking-[0.2em] uppercase font-light transition-colors duration-200"
                style={{ color: active === item ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)" }}
              >
                {t.nav[item]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────────
function AboutSection({ t }: { t: (typeof translations)["en"] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-screen pt-32 pb-24 px-8 md:px-16 lg:px-24 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-16 md:gap-24 items-center"
      >
        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/25 font-light mb-6">
            {t.about.label}
          </p>
          <h2
            className="font-syne font-extrabold text-[clamp(40px,5.5vw,80px)] leading-[0.92] tracking-[-0.03em] mb-8"
            style={{
              background: "linear-gradient(105deg, #fff 40%, rgba(255,255,255,0.35) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.about.title.split("\n").map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h2>
          <p className="text-white/45 font-light text-[15px] leading-relaxed mb-4 max-w-md">
            {t.about.p1}
          </p>
          <p className="text-white/30 font-light text-[15px] leading-relaxed max-w-md">
            {t.about.p2}
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {[
            { value: t.about.exp, label: t.about.expLabel },
            { value: t.about.projects, label: t.about.projectsLabel },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="pl-6"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="font-syne font-extrabold text-[clamp(48px,5vw,72px)] leading-none tracking-[-0.03em] text-white/90">
                {value}
              </span>
              <p className="text-[11px] tracking-[0.2em] uppercase text-white/25 font-light mt-1">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Contact Section ───────────────────────────────────────────────────────────
function ContactSection({ t }: { t: (typeof translations)["en"] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-screen pt-32 pb-24 px-8 md:px-16 lg:px-24 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-2xl"
      >
        <p className="text-[11px] tracking-[0.25em] uppercase text-white/25 font-light mb-6">
          {t.contact.label}
        </p>
        <h2
          className="font-syne font-extrabold text-[clamp(52px,8vw,120px)] leading-[0.88] tracking-[-0.03em] mb-8"
          style={{
            background: "linear-gradient(105deg, #fff 40%, rgba(255,255,255,0.35) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t.contact.title.split("\n").map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h2>
        <p className="text-white/35 font-light text-[15px] leading-relaxed mb-12 max-w-sm">
          {t.contact.sub}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-white text-[#080808] font-syne font-bold text-[13px] tracking-[0.08em] uppercase px-10 py-[15px] hover:bg-white/88 transition-all duration-200 hover:-translate-y-[2px]">
            {t.contact.cta}
          </button>
          <a
            href={`mailto:${t.contact.email}`}
            className="group flex items-center gap-2 text-white/40 font-light text-[13px] hover:text-white/80 transition-colors duration-200 sm:pl-2"
          >
            {t.contact.email}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-1">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Portfolio Page ────────────────────────────────────────────────────────────
export default function Portfolio({
  lang = "en",
  onBack,
}: {
  lang?: Lang;
  onBack?: () => void;
}) {
  const [activeSection, setActiveSection] = useState<Section>("work");
  const t = translations[lang];

  // ── Auto-detect active section via IntersectionObserver ──
  useEffect(() => {
    const sections: Section[] = ["work", "about", "skills", "contact"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (section: Section) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full bg-[#080808] text-white overflow-x-hidden cursor-none relative">
      {/* Noise texture */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        }}
      />

      {/* Ambient blob */}
      <div
        className="fixed top-0 right-0 w-[50vw] h-[50vw] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(120,60,220,0.07) 0%, transparent 70%)" }}
      />

      <Header active={activeSection} onNav={scrollToSection} onBack={onBack ?? (() => {})} t={t} />

      <main className="relative z-10">
        <div id="work">
          <ProjectsSection
            label={t.hero.label}
            title={t.hero.title}
            sub={t.hero.sub}
            projects={t.projects}
            lang={lang}
          />
        </div>
        <div id="about"><AboutSection t={t} /></div>
        <div id="skills">
          <SkillsBadges
            label={t.skills.label}
            title={t.skills.title}
            categories={t.skills.categories}
          />
        </div>
        <div id="contact"><ContactSection t={t} /></div>
      </main>

      <PortfolioFooter lang={lang} />
    </div>
  );
}
