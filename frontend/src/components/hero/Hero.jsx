import React from "react";
import PropTypes from "prop-types";
import { Sparkles, Upload, Play, ChevronDown } from "lucide-react";

export const Hero = ({ funcUpload, loading, onDemoClick }) => (
  <div className="w-full relative overflow-hidden flex flex-col items-center justify-center min-h-[calc(100vh-60px)] p-4 sm:p-6 text-white z-10">
    <div className="w-full max-w-4xl text-center space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-medium text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          AI-Powered Resume Analysis & Job Matching
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-md">
          ProResume AI
        </h1>
        <p className="text-lg sm:text-xl font-medium text-purple-200/90 max-w-2xl mx-auto">
          Transform your career with AI-driven scoring, skill gap evaluation, salary estimation, and live job matching.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block w-full max-w-xl mx-auto cursor-pointer group">
          <div className="bg-[#0e0722]/85 backdrop-blur-md p-8 sm:p-10 rounded-3xl border-2 border-dashed border-purple-500/40 hover:border-purple-400/80 transition-all duration-300 shadow-[0_0_40px_rgba(138,0,196,0.15)] group-hover:shadow-[0_0_60px_rgba(138,0,196,0.3)]">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-12 h-12 text-[#00e676]" />
              </div>
              <div>
                <p className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                  Drop your resume here
                </p>
                <p className="text-sm text-purple-300/60 mt-1">
                  or click to browse (PDF only, Max 5MB)
                </p>
              </div>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={funcUpload}
              className="hidden"
              disabled={loading}
            />
          </div>
        </label>

        {/* Demo Button */}
        <div className="pt-2">
          <button
            onClick={onDemoClick}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/20 text-xs sm:text-sm font-semibold text-purple-200 transition-all cursor-pointer shadow-md"
          >
            <Play className="w-4 h-4 text-purple-400" />
            No resume file? Try Sample Demo Resume
          </button>
        </div>
      </div>

      {!loading && (
        <div className="pt-4 flex justify-center animate-bounce">
          <ChevronDown className="w-8 h-8 text-purple-300/70" />
        </div>
      )}
    </div>
  </div>
);

Hero.propTypes = {
  funcUpload: PropTypes.func,
  loading: PropTypes.bool,
  onDemoClick: PropTypes.func,
};
