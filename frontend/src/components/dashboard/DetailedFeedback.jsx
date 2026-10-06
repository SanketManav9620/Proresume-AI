import React from "react";
import PropTypes from "prop-types";
import { CheckCircle, XCircle, Lightbulb } from "lucide-react";

export const DetailedFeedback = ({ feedback }) => (
  <div className="bg-[#0e0722]/85 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-purple-500/30 shadow-lg text-white space-y-6">
    <div className="space-y-1">
      <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
        Detailed AI Feedback
      </h2>
      <p className="text-xs sm:text-sm text-purple-300/70">
        In-depth qualitative breakdown of your resume strengths, weaknesses, and actionable tips.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Strengths */}
      <div className="bg-black/60 p-7 sm:p-8 rounded-3xl border border-emerald-500/30 hover:border-emerald-400/60 transition-all space-y-4 shadow-md">
        <h3 className="text-lg sm:text-xl text-emerald-400 font-extrabold flex items-center gap-2.5">
          <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          Strengths
        </h3>
        <ul className="space-y-3.5 text-sm sm:text-base text-purple-100/95 leading-relaxed">
          {feedback?.strengths?.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 mt-2" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Weaknesses */}
      <div className="bg-black/60 p-7 sm:p-8 rounded-3xl border border-rose-500/30 hover:border-rose-400/60 transition-all space-y-4 shadow-md">
        <h3 className="text-lg sm:text-xl text-rose-400 font-extrabold flex items-center gap-2.5">
          <XCircle className="w-6 h-6 text-rose-400 flex-shrink-0" />
          Weaknesses
        </h3>
        <ul className="space-y-3.5 text-sm sm:text-base text-purple-100/95 leading-relaxed">
          {feedback?.weaknesses?.map((w, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 flex-shrink-0 mt-2" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Improvement Tips */}
      <div className="bg-black/60 p-7 sm:p-8 rounded-3xl border border-amber-500/30 hover:border-amber-400/60 transition-all space-y-4 shadow-md">
        <h3 className="text-lg sm:text-xl text-amber-400 font-extrabold flex items-center gap-2.5">
          <Lightbulb className="w-6 h-6 text-amber-400 flex-shrink-0" />
          Improvement Tips
        </h3>
        <ul className="space-y-3.5 text-sm sm:text-base text-purple-100/95 leading-relaxed">
          {feedback?.improvement_tips?.map((t, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

DetailedFeedback.propTypes = {
  feedback: PropTypes.object,
};
