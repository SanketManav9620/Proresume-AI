import React from "react";
import PropTypes from "prop-types";
import { Sparkles, Play, Heart } from "lucide-react";

export const Navbar = ({ onDemoClick }) => (
  <header className="sticky top-0 z-40 w-full border-b border-purple-500/20 bg-[#05020f]/85 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between text-white">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
        <Sparkles className="w-5 h-5 text-purple-400" />
      </div>
      <div>
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          ProResume AI
        </span>
        <span className="hidden sm:inline-block ml-2.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-[10px] font-bold text-purple-300 uppercase tracking-widest">
          AI Intelligence v2.0
        </span>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <button
        onClick={onDemoClick}
        className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/20 text-xs font-semibold text-purple-200 transition-all cursor-pointer"
      >
        <Play className="w-3.5 h-3.5 text-purple-400" />
        Try Demo Analysis
      </button>

      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-300">
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />
        <span>Made by Sanket</span>
      </div>
    </div>
  </header>
);

Navbar.propTypes = {
  onDemoClick: PropTypes.func,
};
