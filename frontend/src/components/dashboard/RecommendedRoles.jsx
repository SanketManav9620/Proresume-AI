import React from "react";
import PropTypes from "prop-types";
import { Target, CheckCircle } from "lucide-react";

export const RecommendedRoles = ({ roles = [] }) => {
  if (!roles.length) return null;

  return (
    <div className="bg-[#0e0722]/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-lg text-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
        <Target className="w-7 h-7 text-purple-400" />
        Recommended Career Roles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role, idx) => (
          <div
            key={idx}
            className="bg-black/60 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/60 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-4 gap-2">
                <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                  {role?.title ?? "Target Role"}
                </h3>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/40 text-purple-300 rounded-full text-xs font-bold whitespace-nowrap">
                  {role?.match_percentage ?? 0}% Match
                </span>
              </div>
              <div className="space-y-2.5 text-xs text-purple-300/90">
                {role?.key_qualifications?.map((qual, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>{qual}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

RecommendedRoles.propTypes = {
  roles: PropTypes.array,
};
 