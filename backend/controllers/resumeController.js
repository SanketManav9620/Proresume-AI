const { extractTextFromPDF } = require("../services/pdfService");
const { analyzeResumeWithAI } = require("../services/aiService");
const { searchJobs } = require("../services/jobService");
const { scaleScores } = require("../utils/scoreScaler");

/**
 * Controller to handle resume upload and complete AI analysis
 */
async function analyzeResumeController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Step 1: Extract text from PDF
    let text;
    try {
      text = await extractTextFromPDF(req.file.buffer);
    } catch (pdfErr) {
      return res.status(400).json({
        error: pdfErr.message || "Failed to parse PDF document",
        details: pdfErr.details,
      });
    }

    // Step 2: Request AI analysis from Gemini
    let analysis;
    try {
      analysis = await analyzeResumeWithAI(text);
    } catch (aiErr) {
      return res.status(500).json({
        error: aiErr.message || "AI Analysis failed",
        details: aiErr.details,
      });
    }

    // Step 3: Validate and scale raw category scores
    if (!analysis.score?.breakdown) {
      return res.status(500).json({
        error: "Missing score breakdown in AI analysis response",
      });
    }

    const { scaledScores, totalScore } = scaleScores(analysis.score.breakdown);
    analysis.score.breakdown = scaledScores;
    analysis.score.total = totalScore;

    // Step 4: Perform job search matching if location and skills exist
    const strongSkills = analysis.skills_analysis?.strong_skills || [];
    const keyword = Array.isArray(strongSkills) ? strongSkills.join(", ") : "";

    if (analysis.location && keyword) {
      try {
        const jobQuery = {
          keyword: keyword,
          location: analysis.location,
          experienceLevel: analysis.experience_level || "Entry Level",
          limit: 5,
          page: "0",
        };
        const jobSearchResults = await searchJobs(jobQuery);
        analysis.job_search_results = jobSearchResults;
      } catch (jobErr) {
        console.error("Job search error:", jobErr);
        analysis.job_search_results = [];
      }
    } else {
      analysis.job_search_results = [];
    }

    return res.json(analysis);
  } catch (error) {
    console.error("Error in analyzeResumeController:", error);
    return res.status(500).json({
      error: "Analysis failed",
      details: error.message,
    });
  }
}

module.exports = {
  analyzeResumeController,
};
 