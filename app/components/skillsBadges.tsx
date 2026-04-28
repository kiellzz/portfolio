"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Types ──────────────────────────────────────────────────────────────────
type SkillCategory = {
  name: string;
  color: string;
  items: string[];
};

type SkillsBadgesProps = {
  label?: string;
  title?: string;
  categories: SkillCategory[];
};

// ─── Multi-path icons (React, JS, TS, Canva need multiple paths/fills) ────────
const iconSVGs: Record<string, React.ReactNode> = {
  React: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-50 shrink-0">
      {/* nucleus */}
      <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      {/* orbit 1 — horizontal */}
      <ellipse cx="12" cy="12" rx="9" ry="3.2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      {/* orbit 2 — 60° */}
      <ellipse cx="12" cy="12" rx="9" ry="3.2" stroke="currentColor" strokeWidth="1.2" fill="none"
        transform="rotate(60 12 12)" />
      {/* orbit 3 — 120° */}
      <ellipse cx="12" cy="12" rx="9" ry="3.2" stroke="currentColor" strokeWidth="1.2" fill="none"
        transform="rotate(120 12 12)" />
    </svg>
  ),
  JavaScript: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-50 shrink-0">
      {/* square background */}
      <rect x="2" y="2" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="1.3" />
      {/* J letter */}
      <path d="M14 8v8c0 1.5-.8 2.5-2.5 2.5S9 17.5 9 16" stroke="currentColor" strokeWidth="1.4"
        strokeLinecap="round" fill="none" />
      {/* S letter */}
      <path d="M17.5 10.5c-.4-.7-1-.8-1.7-.8-1 0-1.6.5-1.6 1.2 0 .8.6 1.1 1.7 1.5 1.3.5 2 1 2 2.2 0 1.3-1 2.1-2.4 2.1-1.1 0-2-.5-2.5-1.4"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  ),
  TypeScript: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-50 shrink-0">
      {/* square background */}
      <rect x="2" y="2" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="1.3" />
      {/* T crossbar */}
      <path d="M6 10h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* T stem */}
      <path d="M9.5 10v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* S letter */}
      <path d="M14.5 10.8c.3-.5.9-.8 1.6-.8 1 0 1.8.5 1.8 1.3 0 .7-.5 1-1.3 1.3l-.4.15c-.9.35-1.5.8-1.5 1.65 0 .9.8 1.55 1.9 1.55.8 0 1.4-.3 1.8-.9"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  ),
  Canva: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-50 shrink-0">
      {/* outer circle */}
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.3" />
      {/* C letter inside */}
      <path d="M15 9.5A4 4 0 1 0 15 14.5" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" fill="none" />
    </svg>
  ),
};

// ─── Single-path icon map ─────────────────────────────────────────────────────
const iconPaths: Record<string, string> = {
  "Tailwind CSS":
    "M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.09 2.15 4.1 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C16.12 7.15 15.01 6 13 6h-1Zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 16.85 9.49 18 11.5 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C11.12 13.15 10.01 12 8 12H7Z",
  "Framer Motion":
    "M12 3L3 8.5v7L12 21l9-5.5v-7L12 3ZM12 3v18M3 8.5l9 5.5 9-5.5",
  "Node.js":
    "M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5",
  "Express.js":
    "M3 8h18M3 12h18M3 16h18",
  MongoDB:
    "M12 2C9 2 7 5 7 9c0 3 1.5 5 3 6.5V20h4v-4.5C15.5 14 17 12 17 9c0-4-2-7-5-7Z",
  Multer:
    "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
  FFMPEG:
    "M15 10l4.553-2.277A1 1 0 0 1 21 8.68v6.64a1 1 0 0 1-1.447.899L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z",
  Git:
    "M15 3l4 4-4 4M9 21l-4-4 4-4M20 7H9a4 4 0 0 0-4 4v1M4 17h11a4 4 0 0 0 4-4v-1",
  GitHub:
    "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  Render:
    "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm4 1v10M12 7v10M16 7v10",
  Figma:
    "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5ZM12 2h3.5a3.5 3.5 0 1 1 0 7H12V2ZM12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0ZM5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0ZM5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5Z",
};

function SkillIcon({ name }: { name: string }) {
  // Multi-path icons take priority
  if (iconSVGs[name]) return <>{iconSVGs[name]}</>;

  const d = iconPaths[name];
  if (!d) return null;
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-50 shrink-0"
    >
      <path d={d} />
    </svg>
  );
}

// ─── Badge ───────────────────────────────────────────────────────────────────
function Badge({
  name,
  accent,
  delay,
  inView,
}: {
  name: string;
  accent: string;
  delay: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.88, y: 6 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-flex items-center gap-2 px-3 py-[8px] text-[11px] tracking-[0.12em] uppercase font-light select-none cursor-default transition-all duration-200"
      style={{
        border: `1px solid ${hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.09)"}`,
        background: hovered ? "rgba(255,255,255,0.05)" : "transparent",
        color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? `0 4px 24px rgba(0,0,0,0.4), inset 0 0 0 1px ${accent}30` : "none",
      }}
    >
      <span
        className="w-[5px] h-[5px] rounded-full shrink-0 transition-all duration-200"
        style={{
          background: hovered ? accent : "rgba(255,255,255,0.18)",
          boxShadow: hovered ? `0 0 6px ${accent}` : "none",
        }}
      />
      <SkillIcon name={name} />
      {name}
    </motion.span>
  );
}

// ─── Category Block ──────────────────────────────────────────────────────────
function CategoryBlock({
  category,
  catIndex,
  inView,
}: {
  category: SkillCategory;
  catIndex: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: catIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className="w-[5px] h-[5px] rounded-full shrink-0"
          style={{ background: category.color, boxShadow: `0 0 8px ${category.color}` }}
        />
        <p
          className="text-[10px] tracking-[0.28em] uppercase font-light"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          {category.name}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.items.map((item, ii) => (
          <Badge
            key={item}
            name={item}
            accent={category.color}
            delay={catIndex * 0.1 + ii * 0.06}
            inView={inView}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function SkillsBadges({ label, title, categories }: SkillsBadgesProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="min-h-screen pt-32 pb-24 px-8 md:px-16 lg:px-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        {label && (
          <p
            className="text-[11px] tracking-[0.25em] uppercase font-light mb-6"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            {label}
          </p>
        )}
        {title && (
          <h2
            className="font-syne font-extrabold text-[clamp(40px,5.5vw,80px)] leading-[0.92] tracking-[-0.03em]"
            style={{
              background: "linear-gradient(105deg, #fff 40%, rgba(255,255,255,0.35) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {title.split("\n").map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h2>
        )}
      </motion.div>

      <div className="w-full h-px mb-12" style={{ background: "rgba(255,255,255,0.06)" }} />

      <div className="flex flex-col gap-12">
        {categories.map((cat, ci) => (
          <CategoryBlock key={cat.name} category={cat} catIndex={ci} inView={inView} />
        ))}
      </div>
    </section>
  );
}
