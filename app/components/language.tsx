"use client";

import React from "react";

interface LanguageModalProps {
  onSelect: (lang: "pt" | "en") => void;
}

export default function LanguageModal({ onSelect }: LanguageModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl">
      <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-[2.5rem] text-center max-w-sm w-full mx-4 shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        
        <h2 className="text-3xl font-bold mb-3 tracking-tighter text-white font-syne">
          Select Language
        </h2>
        <p className="text-gray-500 mb-10 text-[13px] font-medium uppercase tracking-[0.2em]">
          PICK YOUR PREFERENCE
        </p>

        <div className="flex flex-col gap-4">
          {/* Opção Português */}
          <button
            onClick={() => onSelect("pt")}
            className="flex items-center gap-5 bg-white/[0.03] hover:bg-white text-gray-400 hover:text-black border border-white/5 hover:border-white p-5 rounded-2xl transition-all duration-500 group"
          >
            <div className="relative w-10 h-7 overflow-hidden rounded-sm shadow-lg">
              <img 
                src="https://flagcdn.com/w80/br.png" 
                alt="Brasil" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110" 
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-lg leading-none font-syne">Português</span>
              <span className="text-[10px] opacity-40 uppercase mt-1 tracking-wider">Brasil</span>
            </div>
          </button>

          {/* Opção Inglês */}
          <button
            onClick={() => onSelect("en")}
            className="flex items-center gap-5 bg-white/[0.03] hover:bg-white text-gray-400 hover:text-black border border-white/5 hover:border-white p-5 rounded-2xl transition-all duration-500 group"
          >
            <div className="relative w-10 h-7 overflow-hidden rounded-sm shadow-lg">
              <img 
                src="https://flagcdn.com/w80/us.png" 
                alt="USA" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110" 
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-bold text-lg leading-none font-syne">English</span>
              <span className="text-[10px] opacity-40 uppercase mt-1 tracking-wider">International</span>
            </div>
          </button>
        </div>

        <p className="mt-8 text-gray-600 text-[12px] italic font-light">
          Experience tailored for your region.
        </p>
      </div>
    </div>
  );
}