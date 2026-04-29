"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectModal from "./projectModal";

// ─── Types ─────────────────────────────────────────────────────────────────────
export type ProjectItem = {
  number: string;
  name: string;
  type: string;
  desc: string;
  tags: string[];
  video?: string;
  repo?: string;
  year?: string;
};

export type ProjectsSectionProps = {
  label: string;
  title: string;
  sub: string;
  projects: ProjectItem[];
  lang: "pt" | "en";
};

// ─── Arrow Icon ────────────────────────────────────────────────────────────────
function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
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

// ─── Wave lines ────────────────────────────────────────────────────────────────
const WAVES = [
  {
    path: "M0,12 C30,2  60,22 90,12 C120,2  150,22 180,12 C210,2  240,22 270,12 C300,2  330,22 360,12",
    delay: 0,
    opacity: 0.9,
    width: 2.2,
  },
  {
    path: "M0,12 C25,24 55,0  85,12 C115,24 145,0  175,12 C205,24 235,0  265,12 C295,24 325,0  360,12",
    delay: 0.08,
    opacity: 0.6,
    width: 2,
  },
  {
    path: "M0,12 C35,4  65,20 95,12 C125,4  155,20 185,12 C215,4  245,20 275,12 C305,4  335,20 360,12",
    delay: 0.16,
    opacity: 0.35,
    width: 1.5,
  },
  {
    path: "M0,12 C28,22 58,2  88,12 C118,22 148,2  178,12 C208,22 238,2  268,12 C298,22 328,2  360,12",
    delay: 0.24,
    opacity: 0.2,
    width: 1.2,
  },
];

function WaveEffect({ visible }: { visible: boolean }) {
  return (
    <div
      className="absolute pointer-events-none overflow-hidden"
      style={{
        bottom: 0,
        left: 0,
        right: 372,
        height: 80,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      <svg
        viewBox="0 0 360 24"
        preserveAspectRatio="none"
        width="100%"
        height="80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {WAVES.map((w, i) => (
          <motion.path
            key={i}
            d={w.path}
            stroke="#a855f7"
            strokeWidth={w.width}
            strokeLinecap="round"
            fill="none"
            style={{ opacity: w.opacity }}
            initial={{ pathLength: 0 }}
            animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{
              pathLength: {
                duration: 0.7,
                delay: w.delay,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
          />
        ))}
        <motion.path
          d={WAVES[0].path}
          stroke="#c084fc"
          strokeWidth={8}
          strokeLinecap="round"
          fill="none"
          style={{ filter: "blur(6px)", opacity: 0.25 }}
          initial={{ pathLength: 0 }}
          animate={visible ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ pathLength: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
        />
      </svg>
    </div>
  );
}

// ─── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
  lang,
  onOpenModal,
}: {
  project: ProjectItem;
  index: number;
  lang: "pt" | "en";
  onOpenModal: (project: ProjectItem) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => project.repo && onOpenModal(project)}
      className="group relative border-b cursor-pointer"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      {/* Background Gradient Sutil (mantido para todos) */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Renderiza as ondas roxas apenas se NÃO for o projeto 04 */}
      {project.number !== "04" && <WaveEffect visible={hovered} />}

      <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-0 px-0 py-8 md:py-10">

        {/* Number */}
        <span className="text-[11px] tracking-[0.2em] text-white/20 font-light w-12 shrink-0">
          {project.number}
        </span>

        {/* Name + type */}
        <div className="flex-1 md:pr-8">
          <h3
            className="font-syne font-extrabold text-[clamp(22px,2.8vw,38px)] tracking-[-0.02em] leading-none transition-colors duration-200"
            style={{ color: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.85)" }}
          >
            {project.name}
          </h3>
          <p className="text-[11px] tracking-[0.18em] uppercase text-white/25 font-light mt-1">
            {project.type}
          </p>
        </div>

        {/* Video ou Espaçador Vazio */}
       {project.video ? (
          <div
            className="shrink-0 overflow-hidden border border-white/25"
            style={{
              width: 280,
              aspectRatio: "16/9",
            }}
          >
            <video
              src={project.video}
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div 
            className="shrink-0 hidden md:block" 
            style={{ width: 280, aspectRatio: "16/9" }} 
          />
        )}

        {/* Description + tags */}
        <div
          className="md:w-[260px] md:pl-8 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0.35 }}
        >
          <p className="text-[13px] text-white/50 font-light leading-relaxed">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.15em] uppercase px-2 py-[3px] font-light"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center gap-4 md:w-24 md:justify-end shrink-0">
          {project.year && (
            <span className="text-[11px] tracking-[0.15em] text-white/20 font-light">
              {project.year}
            </span>
          )}
          <div
            className="transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.3)",
              transform: hovered ? "translate(3px, -3px)" : "translate(0,0)",
            }}
          >
            <ArrowRight />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Projects Section ──────────────────────────────────────────────────────────
export default function ProjectsSection({ label, title, sub, projects, lang }: ProjectsSectionProps) {
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  return (
    <section className="min-h-screen pt-32 pb-24 px-8 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-[11px] tracking-[0.25em] uppercase text-white/25 font-light mb-6">
          {label}
        </p>
        <h2
          className="font-syne font-extrabold text-[clamp(48px,7vw,100px)] leading-[0.9] tracking-[-0.03em] mb-4"
          style={{
            background: "linear-gradient(105deg, #fff 40%, rgba(255,255,255,0.35) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {title.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </h2>
        <p className="text-white/30 font-light text-[14px] mb-16">{sub}</p>
      </motion.div>

      <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            lang={lang}
            onOpenModal={setModalProject}
          />
        ))}
      </div>

      <ProjectModal
        open={!!modalProject}
        onClose={() => setModalProject(null)}
        repoUrl={modalProject?.repo ?? ""}
        lang={lang}
        projectName={modalProject?.name ?? ""}
      />
    </section>
  );
}
