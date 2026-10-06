import React from "react";
import { Heart } from "lucide-react";

export const Footer = () => (
  <footer className="w-full border-t border-purple-500/20 bg-[#05020f] py-8 text-center text-xs text-purple-300/70 space-y-2">
    <div className="flex items-center justify-center gap-2">
      <span>ProResume AI</span>
      <span>•</span>
      <span className="flex items-center gap-1">
        Made with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20 inline" /> by{" "}
        <strong className="text-white">Sanket</strong>
      </span>
    </div>
    <p className="text-[11px] text-purple-400/50">
      Advanced AI Career Analytics & Real-Time Market Intelligence
    </p>
  </footer>
);
