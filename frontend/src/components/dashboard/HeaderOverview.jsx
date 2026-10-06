import React from "react";
import PropTypes from "prop-types";
import { Sparkles, MapPin, Briefcase, Download } from "lucide-react";
import { exportReport } from "../../utils/exportReport";

export const HeaderOverview = ({ results }) => (
  <div className="bg-[#0e0722]/85 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-purple-500/30 shadow-[0_0_50px_rgba(138,0,196,0.2)] text-white">
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-purple-500/20">
      <div className="space-y-2 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-purple-400 font-semibold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-purple-300" />
          AI Analysis Complete
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Resume Analysis Dashboard
        </h2>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
          {results.location && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-medium text-purple-300">
              <MapPin className="w-3.5 h-3.5" />
              {results.location}
            </span>
          )}
          {results.experience_level && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-medium text-indigo-300">
              <Briefcase className="w-3.5 h-3.5" />
              {results.experience_level}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Export Button */}
        <button
          onClick={() => exportReport(results)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-500/20 border border-purple-400/40 hover:bg-purple-500/30 text-xs font-bold text-purple-200 transition-all cursor-pointer shadow-md"
        >
          <Download className="w-4 h-4 text-purple-300" />
          Export Report (.txt)
        </button>

        {/* Circular Score Badge */}
        <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 via-black to-purple-950/60 border border-purple-400/30 shadow-inner">
          <div className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-purple-200 via-white to-purple-400 bg-clip-text text-transparent">
            {results?.score?.total || 0}
          </div>
          <div className="text-[10px] font-bold text-purple-300 uppercase tracking-widest mt-1">
            Overall Score / 100
          </div>
        </div>
      </div>
    </div>
  </div>
);

HeaderOverview.propTypes = {
  results: PropTypes.object.isRequired,
};
 