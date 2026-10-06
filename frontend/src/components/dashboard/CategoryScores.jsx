import React from "react";
import PropTypes from "prop-types";

export const CategoryScores = ({ breakdown }) => {
  if (!breakdown) return null;

  const maxScores = {
    skills: 25,
    experience: 25,
    achievements: 20,
    format: 15,
    education: 15,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {Object.entries(breakdown).map(([key, value]) => {
        const maxScore = maxScores[key] || 20;
        const pct = Math.round((value / maxScore) * 100);

        return (
          <div
            key={key}
            className="bg-black/60 p-4 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all group"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-semibold capitalize text-purple-200 group-hover:text-white transition-colors">
                {key}
              </h3>
              <span className="text-[11px] text-purple-300/70 font-mono">
                {value}/{maxScore}
              </span>
            </div>
            <div className="w-full bg-purple-950/40 h-2 rounded-full overflow-hidden p-0.5 border border-purple-800/30">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-purple-300 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, pct)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

CategoryScores.propTypes = {
  breakdown: PropTypes.object,
};
 