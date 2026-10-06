import React from "react";
import PropTypes from "prop-types";
import { Award, CheckCircle, XCircle, Lightbulb } from "lucide-react";

export const SkillsAssessment = ({ skillsAnalysis }) => (
  <div className="bg-[#0e0722]/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-lg text-white">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
      <Award className="w-7 h-7 text-purple-400" />
      Skills Assessment
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Strong Skills */}
      <div className="bg-black/50 p-6 rounded-2xl border border-emerald-500/20">
        <h3 className="text-base text-emerald-400 font-bold mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Strong Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {skillsAnalysis?.strong_skills?.length ? (
            skillsAnalysis.strong_skills.map((skill, i) => (
              <span
                key={i}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs sm:text-sm font-semibold text-emerald-300"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-purple-300/50">None detected</span>
          )}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="bg-black/50 p-6 rounded-2xl border border-rose-500/20">
        <h3 className="text-base text-rose-400 font-bold mb-4 flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          Missing Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {skillsAnalysis?.missing_skills?.length ? (
            skillsAnalysis.missing_skills.map((skill, i) => (
              <span
                key={i}
                className="px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs sm:text-sm font-semibold text-rose-300"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-xs text-purple-300/50">None detected</span>
          )}
        </div>
      </div>

      {/* Improvement Areas */}
      <div className="bg-black/50 p-6 rounded-2xl border border-amber-500/20">
        <h3 className="text-base text-amber-400 font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Improvement Areas
        </h3>
        <div className="flex flex-wrap gap-2">
          {skillsAnalysis?.improvement_areas?.length ? (
            skillsAnalysis.improvement_areas.map((area, i) => (
              <span
                key={i}
                className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm font-semibold text-amber-300"
              >
                {area}
              </span>
            ))
          ) : (
            <span className="text-xs text-purple-300/50">None detected</span>
          )}
        </div>
      </div>
    </div>
  </div>
);

SkillsAssessment.propTypes = {
  skillsAnalysis: PropTypes.object,
};
 