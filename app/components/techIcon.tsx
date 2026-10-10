type TechIconProps = {
  name: string;
  className?: string;
};

const techIconUrl: Record<string, string> = {
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Framer Motion": "https://cdn.simpleicons.org/framer/0055FF",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  Supabase: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "Express.js": "https://cdn.simpleicons.org/express/FFFFFF",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  FFMPEG: "https://cdn.simpleicons.org/ffmpeg/007808",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  GitHub: "https://cdn.simpleicons.org/github/FFFFFF",
  Vercel: "https://cdn.simpleicons.org/vercel/FFFFFF",
  Render: "https://cdn.simpleicons.org/render/46E3B7",
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  Canva: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",
};

export default function TechIcon({ name, className = "w-3.5 h-3.5" }: TechIconProps) {
  const src = techIconUrl[name];

  if (src) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className={`${className} object-contain shrink-0`}
      />
    );
  }

  if (name === "WebSocket") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} shrink-0 text-[#a855f7]`}
      >
        <path d="M8 12a4 4 0 0 1 4-4h2" />
        <path d="M16 12a4 4 0 0 1-4 4h-2" />
        <path d="m14 5 3 3-3 3" />
        <path d="m10 19-3-3 3-3" />
      </svg>
    );
  }

  if (name === "Multer") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} shrink-0 text-[#fb923c]`}
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="m17 8-5-5-5 5" />
        <path d="M12 3v12" />
      </svg>
    );
  }

  if (name === "Prompt Engineering") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${className} shrink-0 text-[#10a37f]`}
      >
        <rect x="4" y="7" width="16" height="12" rx="3" />
        <path d="M9 12h.01M15 12h.01" />
        <path d="M9 16c1.5 1 4.5 1 6 0" />
        <path d="M12 7V4M10 4h4" />
      </svg>
    );
  }

  return null;
}
