import React from "react";
import PropTypes from "prop-types";
import { ShieldCheck, CheckCircle } from "lucide-react";

export const AtsCompatibility = ({ atsData }) => {
  const checks = atsData?.checks || [
    { name: "Standard PDF Format", passed: true, tip: "Clean text layer detected" },
    { name: "Section Headers", passed: true, tip: "Standard header tags present" },
    { name: "Action Verbs & Impact", passed: true, tip: "High action verb ratio" },
    { name: "Keyword & Skill Density", passed: true, tip: "Strong skill keyword match" },
  ];

  return (
    <div className="bg-[#0e0722]/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-lg text-white flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
              <ShieldCheck className="w-6 h-6 text-purple-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                ATS Compatibility Check
              </h2>
              <p className="text-xs text-purple-300/70">
                Applicant Tracking System parser evaluation
              </p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            {atsData?.score || 85}% ATS Score
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {checks.map((chk, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-black/40 border border-purple-500/10 flex items-start gap-2.5"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white">{chk.name}</p>
                <p className="text-[11px] text-purple-300/60 mt-0.5">{chk.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

AtsCompatibility.propTypes = {
  atsData: PropTypes.object,
};
 