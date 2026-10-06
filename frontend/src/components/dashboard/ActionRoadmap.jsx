import React from "react";
import { Target } from "lucide-react";

export const ActionRoadmap = () => {
  const steps = [
    {
      step: "01",
      title: "Add Missing Skills",
      desc: "Incorporate high-demand skills like TypeScript & AWS into project descriptions.",
    },
    {
      step: "02",
      title: "Quantify Achievements",
      desc: "Add percentage metrics (e.g. 'Boosted performance by 35%') to bullet points.",
    },
    {
      step: "03",
      title: "Format Section Headers",
      desc: "Ensure clean, standard headers for Summary, Skills, Experience, and Education.",
    },
    {
      step: "04",
      title: "Apply to Target Roles",
      desc: "Leverage direct position recommendations below to apply.",
    },
  ];

  return (
    <div className="bg-[#0e0722]/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-lg text-white space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        <Target className="w-6 h-6 text-purple-400" />
        Recommended Action Plan Roadmap
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((st, i) => (
          <div
            key={i}
            className="bg-black/50 p-5 rounded-2xl border border-purple-500/20 space-y-2 relative overflow-hidden group hover:border-purple-400/50 transition-all"
          >
            <div className="text-3xl font-black text-purple-500/20 group-hover:text-purple-400/30 transition-colors">
              {st.step}
            </div>
            <h3 className="text-sm font-bold text-white">{st.title}</h3>
            <p className="text-xs text-purple-300/70">{st.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
 