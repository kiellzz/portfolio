"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import PortfolioFooter from "./components/portfolioFooter";
import SkillsBadges from "./components/skillsBadges";
import ProjectsSection from "./components/projects";
import ContactModal from "./components/contactModal";
import CVModal from "./components/CVModal"; 

// ─── Types ─────────────────────────────────────────────────────────────────────
type Lang = "pt" | "en";
type Section = "projects" | "about" | "skills" | "contact";

// ─── Translations ──────────────────────────────────────────────────────────────
const translations = {
  pt: {
    nav: {
      projects: "Projetos",
      about: "Sobre",
      skills: "Skills",
      contact: "Contato e CV",
    },
    back: "Voltar",
    hero: {
      label: "Meu portfólio",
      title: "O que\nconstruí.",
      sub: "Projetos reais, soluções reais.",
    },
    projects: [
      {
        number: "01",
        name: "Ballers",
        type: "Website · Frontend · Game",
        desc: "Simulador de futebol interativo que combina o gerenciamento de cartas inspirado no EA FC a um motor de jogo focado em decisões e duelos de atributos.",
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
      title: "Código com\nintenção",
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
          items: ["Node.js", "Express.js", "MongoDB", "MySQL", "Multer", "FFMPEG"],
        },
        {
          name: "Tools",
          color: "#fb923c",
          items: ["Git", "GitHub", "Vercel", "Render", "Figma", "Canva", "Prompt Engineering"],
        },
      ],
    },
    contact: {
      label: "Vamos conversar!",
      title: "Próximo\nprojeto",
      sub: "Pronto para encarar desafios, adaptável a diferentes contextos e aberto a oportunidades freelance, presenciais e remotas, com foco em soluções criativas.",
      cta: "Envie-me uma mensagem",
      email: "", 
      cvLabel: "Meu currículo",
      cvTitle: "Acesse meu\nhistórico",
      cvDesc: "Arquivo PDF com minhas skills, formação acadêmica e portfólio",
      cvCta: "Visualizar meu currículo",
    },
  },
  en: {
    nav: {
      projects: "Projects",
      about: "About",
      skills: "Skills",
      contact: "Contact & CV",
    },
    back: "Go Back",
    hero: {
      label: "My Portfolio",
      title: "What I've\nbuilt.",
      sub: "Real projects, real solutions.",
    },
    projects: [
      {
        number: "01",
        name: "Ballers",
        type: "Website · Frontend · Game",
        desc: "An interactive football simulator blending EA FC style card management with a decision-driven game engine centered on attribute-based duels.",
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
      title: "Code with\nintention",
      p1: "I'm a Systems Analysis and Development program student in my 4th semester at Senac College (Brazil), passionate about problem-solving and building interfaces that combine technical performance with memorable design.",
      p2: "I'm currently looking for internship and job opportunities, where every detail matters, from system architecture to the final UI on screen.",
      exp: "2024 - 2026",
      expLabel: "Currently pursuing Systems Analysis and Development",
      projects: "B2 English",
      projectsLabel: "Upper Intermediate",
    },
    skills: {
      label: "Tech stack",
      title: "Tools I\nmaster",
      categories: [
        {
          name: "Frontend",
          color: "#818cf8",
          items: ["React", "JavaScript", "TypeScript", "Next.js", "React Native", "Framer Motion", "Tailwind CSS"],
        },
        {
          name: "Backend",
          color: "#34d399",
          items: ["Node.js", "Express.js", "MongoDB", "MySQL", "Multer", "FFMPEG"],
        },
        {
          name: "Tools",
          color: "#fb923c",
          items: ["Git", "GitHub", "Vercel", "Render", "Figma", "Canva", "Prompt Engineering"],
        },
      ],
    },
    contact: {
      label: "Let's talk!",
      title: "Next\nproject",
      sub: "Ready to take on challenges, adaptable to different contexts, and open to freelance and remote opportunities, with a focus on creative solutions.",
      cta: "Send me a message",
      email: "", 
      cvLabel: "Resume",
      cvTitle: "Check my\nbackground",
      cvDesc: "PDF file with my skills, academic background, and portfolio.",
      cvCta: "View Resume",
    },
  },
};

// ─── Header ────────────────────────────────────────────────────────────────────
function Header({
  active,
  onNav,
  onBack,
  lang,
  onLangChange,
  t,
}: {
  active: Section;
  onNav: (s: Section) => void;
  onBack: () => void;
  lang: Lang;
  onLangChange: (l: Lang) => void;
  t: (typeof translations)["en"];
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems: Section[] = ["projects", "about", "skills", "contact"];

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
      {/* ── Back button ── */}
      <button
        onClick={onBack}
        className="group flex items-center gap-2 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 486.975 486.975"
          width="16"
          height="16"
          fill="currentColor"
          className="text-white/50 group-hover:text-white/90 transition-colors duration-200 group-hover:-translate-x-[2px] transition-transform"
        >
          <path d="M473.475,230.025h-427.4l116-116c5.3-5.3,5.3-13.8,0-19.1c-5.3-5.3-13.8-5.3-19.1,0l-139,139c-5.3,5.3-5.3,13.8,0,19.1l139,139c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1l-116-116h427.5c7.5,0,13.5-6,13.5-13.5S480.975,230.025,473.475,230.025z"/>
        </svg>
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

      {/* ── Language switcher (desktop) ── */}
      <div className="hidden md:flex items-center gap-2">
        {(["pt", "en"] as Lang[]).map((l) => (
          <button
            key={l}
            onClick={() => onLangChange(l)}
            title={l === "pt" ? "Português" : "English"}
            className="relative overflow-hidden transition-all duration-200 hover:-translate-y-[1px]"
            style={{
              width: 28,
              height: 20,
              borderRadius: 2,
              outline: lang === l
                ? "1.5px solid rgba(255,255,255,0.55)"
                : "1.5px solid rgba(255,255,255,0.12)",
              filter: lang === l ? "none" : "grayscale(1) brightness(0.6)",
              boxShadow: lang === l ? "0 0 0 1px rgba(255,255,255,0.08)" : "none",
            }}
          >
            <img
              src={
                l === "pt"
                  ? "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.11.1/flags/4x3/br.svg"
                  : "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.11.1/flags/4x3/us.svg"
              }
              alt={l === "pt" ? "PT" : "EN"}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </button>
        ))}
      </div>

      {/* ── Mobile hamburger ── */}
      <button
        className="md:hidden text-white/60 hover:text-white/80 transition-colors"
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

            {/* ── Language switcher (mobile) ── */}
            <div className="flex items-center gap-3 px-8 pt-4 pb-1">
              {(["pt", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => { onLangChange(l); setMenuOpen(false); }}
                  title={l === "pt" ? "Português" : "English"}
                  className="relative overflow-hidden transition-all duration-200"
                  style={{
                    width: 28,
                    height: 20,
                    borderRadius: 2,
                    outline: lang === l
                      ? "1.5px solid rgba(255,255,255,0.55)"
                      : "1.5px solid rgba(255,255,255,0.12)",
                    filter: lang === l ? "none" : "grayscale(1) brightness(0.6)",
                  }}
                >
                  <img
                    src={
                      l === "pt"
                        ? "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.11.1/flags/4x3/br.svg"
                        : "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.11.1/flags/4x3/us.svg"
                    }
                    alt={l === "pt" ? "PT" : "EN"}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </button>
              ))}
            </div>
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
          <p className="text-white/60 font-light text-[15px] leading-relaxed mb-4 max-w-md">
            {t.about.p1}
          </p>
          <p className="text-white/50 font-light text-[15px] leading-relaxed max-w-md">
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
function ContactSection({ 
  t, 
  onOpenModal, 
  onOpenCV 
}: { 
  t: any, 
  onOpenModal: () => void, 
  onOpenCV: () => void 
}) {
  return (
    <section className="relative w-full min-h-screen py-32 px-8 md:px-16 lg:px-24 flex items-center bg-transparent">
      {/* Removido o mx-auto e centralização do container. 
          Agora ele se alinha à esquerda acompanhando o padding da section (px-8/16/24)
      */}
      <div className="grid md:grid-cols-2 w-full max-w-[1400px] items-stretch">
        
        {/* LADO ESQUERDO: CONTATO (Mesma posição de 'Ferramentas que domino') */}
        <div className="flex flex-col items-start text-left">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/25 mb-8">
            {t.contact.label}
          </p>
          <h2 className="font-syne font-extrabold text-[clamp(45px,6vw,90px)] leading-[0.9] tracking-[-0.03em] mb-10 text-white whitespace-pre-line">
            {t.contact.title}
          </h2>
          <p className="text-white/55 font-light text-[16px] leading-relaxed mb-12 max-w-sm">
            {t.contact.sub}
          </p>
          <button 
            onClick={onOpenModal}
            className="bg-white text-black font-syne font-bold text-[13px] uppercase px-10 py-5 hover:bg-[#eee] transition-all mt-auto"
          >
            {t.contact.cta}
          </button>
        </div>

        {/* LADO DIREITO: CURRÍCULO (Arrastado para a direita) */}
        <div className="flex flex-col items-start text-left md:ml-auto md:pl-20">
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/25 mb-8">
            {t.contact.cvLabel}
          </p>
          <h2 className="font-syne font-extrabold text-[clamp(45px,6vw,90px)] leading-[0.9] tracking-[-0.03em] mb-10 text-white whitespace-pre-line">
            {t.contact.cvTitle}
          </h2>
          <p className="text-white/55 font-light text-[16px] leading-relaxed mb-12 max-w-sm">
            {t.contact.cvDesc}
          </p>
          
          <button 
            onClick={onOpenCV}
            className="bg-white text-black font-syne font-bold text-[13px] uppercase px-10 py-5 hover:bg-[#eee] transition-all flex items-center gap-3 group mt-auto"
          >
            {t.contact.cvCta}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}

// ─── Portfolio Page ────────────────────────────────────────────────────────────
export default function Portfolio({
  lang: initialLang = "en",
  onBack,
}: {
  lang?: Lang;
  onBack?: () => void;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [activeSection, setActiveSection] = useState<Section>("projects");
  
  // Estados dos Modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  
  const t = translations[lang];

  // ── Auto-detect active section via IntersectionObserver ──
  useEffect(() => {
    const sections: Section[] = ["projects", "about", "skills", "contact"];
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
      
      {/* Modais com AnimatePresence para transições suaves */}
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <ContactModal 
            key="contact-modal"
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            lang={lang} 
          />
        )}
        {isCVModalOpen && (
          <CVModal 
            key="cv-modal"
            isOpen={isCVModalOpen} 
            onClose={() => setIsCVModalOpen(false)} 
            lang={lang} 
          />
        )}
      </AnimatePresence>

      {/* Noise texture & Background FX */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        }}
      />
      <div
        className="fixed top-0 right-0 w-[50vw] h-[50vw] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(120,60,220,0.07) 0%, transparent 70%)" }}
      />

      <Header
        active={activeSection}
        onNav={scrollToSection}
        onBack={onBack ?? (() => {})}
        lang={lang}
        onLangChange={setLang}
        t={t}
      />

      <main className="relative z-10">
        <section id="projects">
          <ProjectsSection
            label={t.hero.label}
            title={t.hero.title}
            sub={t.hero.sub}
            projects={t.projects}
            lang={lang}
          />
        </section>
        
        <section id="about">
          <AboutSection t={t} />
        </section>
        
        <section id="skills">
          <SkillsBadges
            label={t.skills.label}
            title={t.skills.title}
            categories={t.skills.categories}
          />
        </section>
        
        <section id="contact">
          <ContactSection 
            t={t} 
            onOpenModal={() => setIsModalOpen(true)} 
            onOpenCV={() => setIsCVModalOpen(true)} 
          />
        </section>
      </main>

      <PortfolioFooter lang={lang} />
    </div>
  );
}