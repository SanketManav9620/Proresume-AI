import React from "react";
import PropTypes from "prop-types";
import { DollarSign, TrendingUp } from "lucide-react";

export const SalaryInsights = ({ salaryData }) => {
  if (!salaryData?.estimated_salary_range) return null;

  const range = salaryData.estimated_salary_range;
  const curr = (range.currency || "").toUpperCase();
  const isINR = curr.includes("INR") || curr.includes("₹");
  const isEUR = curr.includes("EUR") || curr.includes("€");
  const isGBP = curr.includes("GBP") || curr.includes("£");
  const sym = isINR ? "₹" : isEUR ? "€" : isGBP ? "£" : "$";
  const label = isINR ? "INR" : isEUR ? "EUR" : isGBP ? "GBP" : "USD";

  return (
    <div className="bg-[#0e0722]/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-lg text-white flex flex-col justify-between">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <DollarSign className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Estimated Market Salary
              </h2>
              <p className="text-xs text-purple-300/70">
                Estimated range based on location & profile
              </p>
            </div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-lg sm:text-xl">
            {sym}
            {range.low?.toLocaleString()} - {sym}
            {range.high?.toLocaleString()}{" "}
            <span className="text-xs font-semibold text-emerald-400/80">
              {label}
            </span>
          </div>
        </div>

        {salaryData.salary_factors?.length > 0 && (
          <div className="space-y-2 pt-2">
            {salaryData.salary_factors.map((factor, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-black/40 border border-purple-500/10 text-xs text-purple-200/90"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

SalaryInsights.propTypes = {
  salaryData: PropTypes.object,
};
