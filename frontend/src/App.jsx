import React from "react";
import { AlertTriangle } from "lucide-react";
import Waves from "./blocks/Backgrounds/Waves/Waves";
import useCanvasCursor from "./blocks/canvasCursor";
import { ScrollP } from "./components/common/ScrollP";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { Loader } from "./components/common/Loader";
import { Hero } from "./components/hero/Hero";
import { HeaderOverview } from "./components/dashboard/HeaderOverview";
import { CategoryScores } from "./components/dashboard/CategoryScores";
import { AtsCompatibility } from "./components/dashboard/AtsCompatibility";
import { SalaryInsights } from "./components/dashboard/SalaryInsights";
import { ActionRoadmap } from "./components/dashboard/ActionRoadmap";
import { RecommendedRoles } from "./components/dashboard/RecommendedRoles";
import { SkillsAssessment } from "./components/dashboard/SkillsAssessment";
import { DetailedFeedback } from "./components/dashboard/DetailedFeedback";
import { JobMatches } from "./components/dashboard/JobMatches";
import { useResumeAnalysis } from "./hooks/useResumeAnalysis";

export default function ResumeAnalyzer() {
  const { results, loading, error, resultsRef, fileUp, handleDemo } =
    useResumeAnalysis();

  useCanvasCursor();

  return (
    <div className="relative min-h-screen w-full bg-[#05020f] text-white overflow-x-hidden">
      <canvas className="pointer-events-none fixed z-50 inset-0" id="canvas" />

      {/* Fixed Waves Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <Waves
          className="h-full w-full"
          lineColor="rgba(138, 0, 196, 0.55)"
          backgroundColor="rgba(5, 2, 15, 0.95)"
          waveSpeedX={0.01}
          waveSpeedY={0.006}
          waveAmpX={40}
          waveAmpY={22}
          friction={0.94}
          tension={0.005}
          maxCursorMove={180}
          xGap={10}
          yGap={18}
        />
      </div>

      <ScrollP />

      <Navbar onDemoClick={handleDemo} />

      <div className="relative z-10 w-full flex flex-col items-center">
        <Hero funcUpload={fileUp} loading={loading} onDemoClick={handleDemo} />
        {loading && <Loader />}

        {(results || error) && (
          <div
            ref={resultsRef}
            id="results-container"
            className="w-full max-w-7xl px-4 sm:px-8 pb-16"
          >
            {error && (
              <div className="bg-red-500/20 backdrop-blur-lg text-red-200 p-6 sm:p-8 rounded-3xl border border-red-500/40">
                <AlertTriangle className="w-12 h-12 mb-4 text-red-400" />
                <h3 className="text-xl font-semibold mb-2">Analysis Failed</h3>
                <p>{error}</p>
              </div>
            )}

            {results && !loading && (
              <div className="w-full space-y-8 animate-fadeIn">
                {/* Header Overview Card */}
                <HeaderOverview results={results} />

                {/* Sub-category Progress Cards */}
                <CategoryScores breakdown={results?.score?.breakdown} />

                {/* ATS Compatibility & Salary Insights Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <AtsCompatibility atsData={results?.ats_compatibility} />
                  <SalaryInsights salaryData={results?.salary_insights} />
                </div>

                {/* Career Improvement Action Plan Roadmap */}
                <ActionRoadmap />

                {/* Recommended Roles */}
                <RecommendedRoles roles={results?.roles} />

                {/* Skills Assessment Dashboard */}
                <SkillsAssessment skillsAnalysis={results?.skills_analysis} />

                {/* Detailed Feedback Section */}
                <DetailedFeedback feedback={results?.detailed_feedback} />

                {/* Job Matches Section */}
                <JobMatches jobs={results?.job_search_results} />
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
 