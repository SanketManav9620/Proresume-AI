import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import {
  Upload,
  Sparkles,
  Star,
  AlertTriangle,
  ChevronDown,
  ExternalLink,
  Clock,
  MapPin,
  Building2,
  Briefcase,
  DollarSign,
  CheckCircle,
  XCircle,
  Lightbulb,
  Award,
  TrendingUp,
  Target,
  Download,
  ShieldCheck,
  Heart,
  Play,
  FileText,
  Search,
} from "lucide-react";
import Waves from "./blocks/Backgrounds/Waves/Waves";
import useCanvasCursor from "./blocks/canvasCursor";
import { ScrollP } from "./componetsAll/scroll";

const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/analyze";
const API_URL = (rawApiUrl.endsWith("/analyze") || rawApiUrl.endsWith("/"))
  ? rawApiUrl
  : `${rawApiUrl}/analyze`;

const Navbar = ({ onDemoClick }) => (
  <header className="sticky top-0 z-40 w-full border-b border-purple-500/20 bg-[#05020f]/85 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between text-white">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
        <Sparkles className="w-5 h-5 text-purple-400" />
      </div>
      <div>
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          ProResume AI
        </span>
        <span className="hidden sm:inline-block ml-2.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-[10px] font-bold text-purple-300 uppercase tracking-widest">
          AI Intelligence v2.0
        </span>
      </div>
    </div>

    <div className="flex items-center gap-3">
      <button
        onClick={onDemoClick}
        className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/20 text-xs font-semibold text-purple-200 transition-all cursor-pointer"
      >
        <Play className="w-3.5 h-3.5 text-purple-400" />
        Try Demo Analysis
      </button>

      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-medium text-purple-300">
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />
        <span>Made by Sanket</span>
      </div>
    </div>
  </header>
);

Navbar.propTypes = {
  onDemoClick: PropTypes.func,
};

const Hero = ({ funcUpload, loading, onDemoClick }) => (
  <div className="w-full relative overflow-hidden flex flex-col items-center justify-center min-h-[calc(100vh-60px)] p-4 sm:p-6 text-white z-10">
    <div className="w-full max-w-4xl text-center space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-medium text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          AI-Powered Resume Analysis & Job Matching
        </div>
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-300 bg-clip-text text-transparent drop-shadow-md">
          ProResume AI
        </h1>
        <p className="text-lg sm:text-xl font-medium text-purple-200/90 max-w-2xl mx-auto">
          Transform your career with AI-driven scoring, skill gap evaluation, salary estimation, and live job matching.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block w-full max-w-xl mx-auto cursor-pointer group">
          <div className="bg-[#0e0722]/85 backdrop-blur-md p-8 sm:p-10 rounded-3xl border-2 border-dashed border-purple-500/40 hover:border-purple-400/80 transition-all duration-300 shadow-[0_0_40px_rgba(138,0,196,0.15)] group-hover:shadow-[0_0_60px_rgba(138,0,196,0.3)]">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-12 h-12 text-[#00e676]" />
              </div>
              <div>
                <p className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                  Drop your resume here
                </p>
                <p className="text-sm text-purple-300/60 mt-1">
                  or click to browse (PDF only, Max 5MB)
                </p>
              </div>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={funcUpload}
              className="hidden"
              disabled={loading}
            />
          </div>
        </label>

        {/* Demo Button */}
        <div className="pt-2">
          <button
            onClick={onDemoClick}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/20 text-xs sm:text-sm font-semibold text-purple-200 transition-all cursor-pointer shadow-md"
          >
            <Play className="w-4 h-4 text-purple-400" />
            No resume file? Try Sample Demo Resume
          </button>
        </div>
      </div>

      {!loading && (
        <div className="pt-4 flex justify-center animate-bounce">
          <ChevronDown className="w-8 h-8 text-purple-300/70" />
        </div>
      )}
    </div>
  </div>
);

Hero.propTypes = {
  funcUpload: PropTypes.func,
  loading: PropTypes.bool,
  onDemoClick: PropTypes.func,
};

const Loader = () => (
  <div className="min-h-screen w-screen p-4 sm:p-6 fixed inset-0 flex backdrop-blur-3xl items-center justify-center z-50 bg-black/80">
    <div className="w-full max-w-7xl">
      <div className="flex flex-col items-center justify-center gap-6 text-white">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-purple-500/20 border-t-purple-400 animate-spin" />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-purple-300 animate-pulse" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-xl font-bold bg-gradient-to-r from-purple-200 via-white to-purple-300 bg-clip-text text-transparent">
            Analyzing your resume with AI Engine...
          </p>
          <p className="text-xs text-purple-300/80 font-medium tracking-wide">
            Made with ❤️ by Sanket ✨
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Jobs = ({ jobs = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  if (!jobs?.length) return null;

  const filteredJobs = jobs.filter(
    (j) =>
      j.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
  );
};

Jobs.propTypes = {
  jobs: PropTypes.array,
};

export default function ResumeAnalyzer() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const fileUp = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to analyze resume");

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = () => {
    setLoading(true);
    setError(null);
    setResults(null);

    setTimeout(() => {
      setResults({
        score: {
          total: 86,
          breakdown: {
            skills: 23,
            experience: 22,
            achievements: 18,
            format: 13,
            education: 10,
          },
        },
        roles: [
          {
            title: "Full Stack Software Engineer",
            match_percentage: 92,
            key_qualifications: [
              "Proficiency in MERN Stack (React, Node.js, Express, MongoDB)",
              "3+ years building RESTful microservices and frontend web apps",
              "Strong knowledge of JavaScript / TypeScript and state management",
            ],
          },
          {
            title: "Frontend React Developer",
            match_percentage: 88,
            key_qualifications: [
              "Deep expertise in React, Tailwind CSS, and UI component architecture",
              "Experience optimizing Web Vitals and frontend page speed",
            ],
          },
          {
            title: "Backend Node.js Engineer",
            match_percentage: 84,
            key_qualifications: [
              "Scalable API development and asynchronous Node.js architecture",
              "Database design and integration with MongoDB and PostgreSQL",
            ],
          },
        ],
        skills_analysis: {
          strong_skills: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Git"],
          missing_skills: ["TypeScript", "AWS Cloud", "Docker", "CI/CD Pipelines", "Unit Testing (Jest)"],
          improvement_areas: [
            "Quantifying achievement metrics (e.g. % performance increase)",
            "Including cloud deployment experience on AWS or GCP",
            "Adding TypeScript type safety across projects",
          ],
        },
        detailed_feedback: {
          strengths: [
            "Excellent academic background with strong computer science foundations.",
            "Solid practical project portfolio featuring modern tech stacks (PERN, MERN, AI integration).",
            "Strong foundation in algorithmic problem-solving and full-stack software development.",
          ],
          weaknesses: [
            "Limited full-time industry experience with history focused mostly on projects and training.",
            "Lack of demonstrated exposure to cloud infrastructure, containerization (Docker), or CI/CD pipelines.",
            "Project descriptions lack quantifiable impact metrics (e.g., performance gains, user counts, latency reduction).",
          ],
          improvement_tips: [
            "Add quantifiable results to project achievements (e.g., 'improved page load times by 30%', 'handled X requests/sec').",
            "Incorporate containerization using Docker and set up simple GitHub Actions CI/CD pipelines for projects.",
            "Include unit and integration testing tools (e.g., Jest, Supertest) in backend projects to demonstrate software quality assurance.",
            "Highlight competitive programming ratings or specific platform handles if available.",
            "Explore cloud deployment on AWS or GCP beyond simple Vercel deployments.",
          ],
        },
        location: "New York, USA",
        experience_level: "Mid-Level (3+ years)",
        salary_insights: {
          estimated_salary_range: {
            low: 110000,
            high: 150000,
            currency: "USD",
          },
          salary_factors: [
            "High compensation tier for developers in the target market area",
            "3+ years experience positions candidate in competitive mid-senior tier",
            "Full-stack MERN expertise is in high market demand",
          ],
        },
        ats_compatibility: {
          score: 88,
          status: "Pass",
          checks: [
            { name: "Standard PDF Format", passed: true, tip: "PDF extracted cleanly" },
            { name: "Section Headers", passed: true, tip: "Core resume sections present" },
            { name: "Action Verbs & Impact", passed: true, tip: "Strong action verbs detected" },
            { name: "Keyword & Skill Density", passed: true, tip: "High skill density for developer roles" },
          ],
        },
        job_search_results: [
          {
            position: "Senior Full Stack Engineer (Realtime & Voice)",
            company: "Hopper",
            location: "New York, NY",
            agoTime: "1 week ago",
            jobUrl: "https://www.linkedin.com/jobs/",
            companyLogo: "https://media.licdn.com/dms/image/v2/C4D0BAQH3AvtQFmKeXQ/company-logo_100_100/company-logo_100_100/0/1631343924542?e=2147483647&v=beta&t=LdZYUjwsIErMX_tcdQSI7ve6kG-XsZj9UvC42CfPzuA",
          },
          {
            position: "Full Stack Engineer (Node.js & React)",
            company: "Precisely",
            location: "New York, NY",
            agoTime: "2 days ago",
            jobUrl: "https://www.linkedin.com/jobs/",
            companyLogo: "https://media.licdn.com/dms/image/v2/C560BAQEg6Dmz0SBf7w/company-logo_100_100/company-logo_100_100/0/1630603350078/preciselydata_logo?e=2147483647&v=beta&t=-sCnmOz6ght4o__xurN8PT4_nUcvBiJ9PDeekQXcHX0",
          },
        ],
      });
      setLoading(false);
    }, 1200);
  };

  const exportReport = () => {
    if (!results) return;
    const reportText = `ProResume AI - Resume Analysis Report
Date: ${new Date().toLocaleDateString()}
Candidate Location: ${results.location || 'N/A'}
Experience Level: ${results.experience_level || 'N/A'}

==================================================
OVERALL SCORE: ${results.score?.total || 0} / 100
==================================================
Skills: ${results.score?.breakdown?.skills || 0} / 25
Experience: ${results.score?.breakdown?.experience || 0} / 25
Achievements: ${results.score?.breakdown?.achievements || 0} / 20
Format: ${results.score?.breakdown?.format || 0} / 15
Education: ${results.score?.breakdown?.education || 0} / 15

ESTIMATED SALARY RANGE:
${results.salary_insights?.estimated_salary_range?.currency === 'INR' ? '₹' : '$'}${results.salary_insights?.estimated_salary_range?.low?.toLocaleString() || 0} - ${results.salary_insights?.estimated_salary_range?.currency === 'INR' ? '₹' : '$'}${results.salary_insights?.estimated_salary_range?.high?.toLocaleString() || 0} ${results.salary_insights?.estimated_salary_range?.currency || 'USD'}

STRONG SKILLS:
${results.skills_analysis?.strong_skills?.join(', ') || 'None'}

MISSING SKILLS:
${results.skills_analysis?.missing_skills?.join(', ') || 'None'}

IMPROVEMENT TIPS:
${results.detailed_feedback?.improvement_tips?.map((t, i) => `${i+1}. ${t}`).join('\n') || 'None'}

Report generated by ProResume AI - Made by Sanket
`;

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ProResume_AI_Report_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);

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
                        onClick={exportReport}
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

                  {/* Sub-category Progress Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
                    {results?.score?.breakdown &&
                      Object.entries(results.score.breakdown).map(
                        ([key, value]) => {
                          const maxScores = {
                            skills: 25,
                            experience: 25,
                            achievements: 20,
                            format: 15,
                            education: 15,
                          };

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
                        }
                      )}
                  </div>
                </div>

                {/* ATS Compatibility & Salary Insights Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* ATS Compatibility */}
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
                          {results.ats_compatibility?.score || 85}% ATS Score
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {(
                          results.ats_compatibility?.checks || [
                            { name: "Standard PDF Format", passed: true, tip: "Clean text layer detected" },
                            { name: "Section Headers", passed: true, tip: "Standard header tags present" },
                            { name: "Action Verbs & Impact", passed: true, tip: "High action verb ratio" },
                            { name: "Keyword & Skill Density", passed: true, tip: "Strong skill keyword match" },
                          ]
                        ).map((chk, i) => (
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

                  {/* Salary Insights */}
                  {results?.salary_insights?.estimated_salary_range && (
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

                          {(() => {
                            const range = results.salary_insights.estimated_salary_range;
                            const curr = (range.currency || "").toUpperCase();
                            const isINR = curr.includes("INR") || curr.includes("₹");
                            const isEUR = curr.includes("EUR") || curr.includes("€");
                            const isGBP = curr.includes("GBP") || curr.includes("£");
                            const sym = isINR ? "₹" : (isEUR ? "€" : (isGBP ? "£" : "$"));
                            const label = isINR ? "INR" : (isEUR ? "EUR" : (isGBP ? "GBP" : "USD"));
                            return (
                              <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-lg sm:text-xl">
                                {sym}{range.low?.toLocaleString()} - {sym}{range.high?.toLocaleString()}{" "}
                                <span className="text-xs font-semibold text-emerald-400/80">{label}</span>
                              </div>
                            );
                          })()}
                        </div>

                        {results.salary_insights.salary_factors?.length > 0 && (
                          <div className="space-y-2 pt-2">
                            {results.salary_insights.salary_factors.map((factor, i) => (
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
                  )}
                </div>

                {/* Career Improvement Action Plan Roadmap */}
                <div className="bg-[#0e0722]/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-lg text-white space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Target className="w-6 h-6 text-purple-400" />
                    Recommended Action Plan Roadmap
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { step: "01", title: "Add Missing Skills", desc: "Incorporate high-demand skills like TypeScript & AWS into project descriptions." },
                      { step: "02", title: "Quantify Achievements", desc: "Add percentage metrics (e.g. 'Boosted performance by 35%') to bullet points." },
                      { step: "03", title: "Format Section Headers", desc: "Ensure clean, standard headers for Summary, Skills, Experience, and Education." },
                      { step: "04", title: "Apply to Target Roles", desc: "Leverage direct position recommendations below to apply." },
                    ].map((st, i) => (
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

                {/* Recommended Roles */}
                {results?.roles?.length > 0 && (
                  <div className="bg-[#0e0722]/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-lg text-white">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                      <Target className="w-7 h-7 text-purple-400" />
                      Recommended Career Roles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {results.roles.map((role, idx) => (
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
                )}

                {/* Skills Assessment Dashboard */}
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
                        {results?.skills_analysis?.strong_skills?.length ? (
                          results.skills_analysis.strong_skills.map((skill, i) => (
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
                        {results?.skills_analysis?.missing_skills?.length ? (
                          results.skills_analysis.missing_skills.map((skill, i) => (
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
                        {results?.skills_analysis?.improvement_areas?.length ? (
                          results.skills_analysis.improvement_areas.map((area, i) => (
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

                {/* Detailed Feedback Section */}
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
                        {results?.detailed_feedback?.strengths?.map((s, i) => (
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
                        {results?.detailed_feedback?.weaknesses?.map((w, i) => (
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
                        {results?.detailed_feedback?.improvement_tips?.map((t, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Job Section */}
                {results?.job_search_results?.length > 0 && (
                  <div className="bg-[#0e0722]/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-500/30 shadow-lg text-white">
                    <Jobs jobs={results.job_search_results} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="w-full border-t border-purple-500/20 bg-[#05020f] py-8 text-center text-xs text-purple-300/70 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span>ProResume AI</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20 inline" /> by <strong className="text-white">Sanket</strong>
            </span>
          </div>
          <p className="text-[11px] text-purple-400/50">
            Advanced AI Career Analytics & Real-Time Market Intelligence
          </p>
        </footer>
      </div>
    </div>
  );
}
