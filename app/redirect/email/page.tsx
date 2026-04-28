"use client";

import { useEffect, useState } from "react";

export default function EmailRedirectPage() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const email = "ezequielborgesdev@gmail.com";

    // tenta abrir o client de email
    window.location.href = `mailto:${email}?subject=Contato%20via%20Portfolio`;

    // fallback caso nada aconteça
    const timer = setTimeout(() => {
      setFailed(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (failed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white/60 gap-4">
        <p className="text-sm">Não foi possível abrir automaticamente.</p>

        <a
          href="mailto:ezequielborgesdev@gmail.com?subject=Contato%20via%20Portfolio"
          className="text-white underline text-sm"
        >
          Clique aqui para enviar o email
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-white/40 text-sm">
      Abrindo seu aplicativo de email...
    </div>
  );
}