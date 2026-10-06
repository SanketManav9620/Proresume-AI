import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Briefcase,
  Search,
  Building2,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";

export const JobMatches = ({ jobs = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  if (!jobs?.length) return null;

  const filteredJobs = jobs.filter(
    (j) =>
      j.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0e0722]/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-lg text-white">
      <div className="w-full space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-white">
              <Briefcase className="w-7 h-7 text-purple-400" />
              Matching Job Opportunities
            </h2>
            <p className="text-xs text-purple-300/70 mt-1">
              Real-time career opportunities matched to your skill profile
            </p>
          </div>

          {/* Filter Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-black/60 border border-purple-500/20 rounded-xl text-xs text-white placeholder-purple-400/50 focus:outline-none focus:border-purple-400/60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-black/60 p-5 rounded-2xl border border-purple-500/20 hover:border-purple-400/60 transition-all flex flex-col justify-between group"
            >
              <div>
                {job.companyLogo && (
                  <div className="mb-4">
                    <img
                      src={job.companyLogo}
                      alt={`${job.company} logo`}
                      className="w-10 h-10 rounded-xl object-contain bg-white/10 p-1"
                    />
                  </div>
                )}

                <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors mb-2 line-clamp-2">
                  {job.position}
                </h3>

                <div className="flex items-center gap-2 text-purple-300/90 text-xs mb-3">
                  <Building2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span className="font-semibold truncate">{job.company}</span>
                </div>

                <div className="space-y-1.5 text-xs text-purple-300/70 mb-5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-400/80 flex-shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-purple-400/80 flex-shrink-0" />
                    <span className="truncate">{job.agoTime}</span>
                  </div>
                </div>
              </div>

              <a
                href={job.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-purple-200 border border-purple-500/30 rounded-xl transition-all text-xs font-semibold"
              >
                View Position
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

JobMatches.propTypes = {
  jobs: PropTypes.array,
};
 