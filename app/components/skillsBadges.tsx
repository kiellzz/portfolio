"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import TechIcon from "./techIcon";

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
        border: `1px solid ${
          hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.09)"
        }`,
        background: hovered ? "rgba(255,255,255,0.05)" : "transparent",
        color: hovered ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 4px 24px rgba(0,0,0,0.4), inset 0 0 0 1px ${accent}30`
          : "none",
      }}
    >
      {/* accent dot */}
      <span
        className="w-[5px] h-[5px] rounded-full shrink-0 transition-all duration-200"
        style={{
          background: hovered ? accent : "rgba(255,255,255,0.18)",
          boxShadow: hovered ? `0 0 6px ${accent}` : "none",
        }}
      />
      <TechIcon name={name} className="w-[15px] h-[15px]" />
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
      transition={{
        duration: 0.55,
        delay: catIndex * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          className="w-[5px] h-[5px] rounded-full shrink-0"
          style={{
            background: category.color,
            boxShadow: `0 0 8px ${category.color}`,
          }}
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
export default function SkillsBadges({
  label,
  title,
  categories,
}: SkillsBadgesProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="min-h-screen pt-32 pb-24 px-8 md:px-16 lg:px-24"
    >
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
              background:
                "linear-gradient(105deg, #fff 40%, rgba(255,255,255,0.35) 100%)",
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
        )}
      </motion.div>

      <div
        className="w-full h-px mb-12"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      <div className="flex flex-col gap-12">
        {categories.map((cat, ci) => (
          <CategoryBlock
            key={cat.name}
            category={cat}
            catIndex={ci}
            inView={inView}
          />
        ))}
      </div>
    </section>
  );
}
