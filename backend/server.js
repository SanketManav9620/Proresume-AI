require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdf = require("pdf-parse");
const fetch = require("node-fetch");
const linkedIn = require("linkedin-jobs-api");
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ProResume AI Backend is running");
});


const MAX_LIMITS = {
  skills: 25,
  experience: 25,
  achievements: 20,
  format: 15,
  education: 15,
};
function scaleScores(rawScores) {
  let scaledScores = {};
  let totalScore = 0;

  Object.keys(rawScores).forEach((key) => {
    let raw = rawScores[key];
    let maxLimit = MAX_LIMITS[key];
    let scaled = Math.round((raw / 100) * maxLimit);
    scaledScores[key] = scaled;
    totalScore += scaled;
  });
  return { scaledScores, totalScore };
}
async function searchJobs(queryOptions) {
  try {
    const response = await linkedIn.query(queryOptions);
    return response;
  } catch (error) {
    console.error("Error searching jobs:", error);
    return [];
  }
}

app.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const data = await pdf(req.file.buffer);
    const text = data.text.trim();

    if (!text) {
      return res.status(400).json({ error: "Unable to extract text from PDF" });
    }
    const prompt = `
    As a senior career coach and resume analyst with 20 years of experience in talent acquisition and career development, analyze the following resume. Follow these exact guidelines without deviation. Your analysis must be structured only in the JSON format provided below. Do not include any additional text, comments, or explanations outside of the JSON response.

    ### **Scoring Rules:**
    - **Evaluate all categories out of 100.**
    - Do **NOT** adjust them to fit any predefined limit. We will scale them mathematically.

    ### **STRICT Output Rules**
    - **DO NOT** include any fields outside of the required JSON structure.
    - **detailed_feedback** must always be present with meaningful insights.
    - Ensure all sections have valid JSON structure and correct data types.
    - **DO NOT** add extra comments, explanations, or text outside the JSON.

    ### **Expected JSON Output Format:**
    {
      "score": {
        "total": <0-100>, 
        "breakdown": {
          "skills": <0-100>, 
          "experience": <0-100>, 
          "achievements": <0-100>, 
          "format": <0-100>, 
          "education": <0-100>
        }
      },
      "roles": [
        {
          "title": "<role title>", 
          "match_percentage": <0-100>,
          "key_qualifications": ["<qual1>", "<qual2>", "<qual3>"]
        }
      ],
      "skills_analysis": {
        "strong_skills": ["<skill1>", "<skill2>", "<skill3>"],
        "missing_skills": ["<skill1>", "<skill2>", "<skill3>"],
        "improvement_areas": ["<area1>", "<area2>", "<area3>"]
      },
      "detailed_feedback": {
        "strengths": ["<strength1>", "<strength2>", "<strength3>"],
        "weaknesses": ["<weakness1>", "<weakness2>", "<weakness3>"],
        "improvement_tips": ["<tip1>", "<tip2>", "<tip3>", "<tip4>", "<tip5>"]
      },
      "location": "<location extracted from resume>",
      "experience_level": "<experience level extracted or inferred from resume>",
      "salary_insights": {
        "estimated_salary_range": {
          "low": <salary_low>,
          "high": <salary_high>,
          "currency": "<currency>"
        },
        "salary_factors": ["<factor1>", "<factor2>", "<factor3>"]
      }
    }

    ### **Resume Content for Analysis:** 
    ${text}

    **Final Instructions:**
    - **Ensure all breakdown scores are out of 100.**
    - **Do NOT scale them down—we will handle that separately.**
    - **Ensure all fields match the expected JSON structure.**
    - **Extract the location dynamically from the resume text.**
    - **Use AI to deduce the experience level, relevant skills, and other job-related attributes from the resume text.**
    - **Provide realistic salary insights based on the user's location, skills, and experience.**
    - **Search for jobs based on the extracted location, experience level, and skills.**
    `;
    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "command-r-plus",
        message: prompt,
        temperature: 0.7,
      }),
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("API Error:", errorMessage);
      throw new Error(`API request failed: ${errorMessage}`);
    }
    const completion = await response.json();
    console.log("Raw AI Response:", completion);
    const responseContent = completion?.text || completion?.generations?.[0]?.text || "";
    if (!responseContent) {
      throw new Error("Empty or invalid response content from AI provider");
    }

    let analysis;
    try {
      const cleanedText = responseContent
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      analysis = JSON.parse(cleanedText);
      console.log("Parsed AI Response:", analysis);
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      console.log("Raw response:", responseContent);
      res.status(500).json({
        error: "Failed to parse AI response",
        details: error.message,
      });
      return;
    }
    if (!analysis.score?.breakdown) {
      throw new Error("Missing score breakdown in the response");
    }
    const { scaledScores, totalScore } = scaleScores(analysis.score.breakdown);
    analysis.score.breakdown = scaledScores;
    analysis.score.total = totalScore;
    
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

    res.json(analysis);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Analysis failed",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 8080;
if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server running on port ${PORT}`)
  );
}

module.exports = app;
