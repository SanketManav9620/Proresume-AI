import React from "react";
import { Sparkles } from "lucide-react";

export const Loader = () => (
  <div className="min-h-screen w-screen p-4 sm:p-6 fixed inset-0 flex backdrop-blur-3xl items-center justify-center z-50 bg-black/80">
    <div className="w-full max-w-7xl">
      <div className="flex flex-col items-center justify-center gap-6 text-white">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-purple-500/20 border-t-purple-400 animate-spin" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-purple-300 animate-pulse" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-xl font-bold bg-gradient-to-r from-purple-200 via-white to-purple-300 bg-clip-text text-transparent">
            Analyzing your resume with AI Engine...
          </p>
          <p className="text-xs text-purple-300/80 font-medium tracking-wide">
            Made with ❤️ by Sanket ✨
          </p>
        </div>
      </div>
    </div>
  </div>
);
 