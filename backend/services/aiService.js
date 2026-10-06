const fetch = require("node-fetch");
const { GEMINI_MODELS } = require("../config/constants");

/**
 * Builds the comprehensive resume evaluation prompt
 * @param {string} resumeText Extracted text from PDF resume
 * @returns {string} Formatted prompt string
 */
function buildAnalysisPrompt(resumeText) {
  return `
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
      },
      "ats_compatibility": {
        "score": <0-100>,
        "status": "<Pass | Needs Optimization>",
        "checks": [
          { "name": "Standard PDF Format", "passed": true, "tip": "PDF structure parsed cleanly" },
          { "name": "Section Headers", "passed": true, "tip": "Core resume headers present" },
          { "name": "Action Verbs & Impact", "passed": true, "tip": "Strong verbs used throughout" },
          { "name": "Keyword & Skill Density", "passed": true, "tip": "Industry keywords matching roles" }
        ]
      }
    }

    ### **Resume Content for Analysis:** 
    ${resumeText}

    **Final Instructions:**
    - **Ensure all breakdown scores are out of 100.**
    - **Do NOT scale them down—we will handle that separately.**
    - **Ensure all fields match the expected JSON structure.**
    - **Extract the location dynamically from the resume text.**
    - **Use AI to deduce the experience level, relevant skills, and other job-related attributes from the resume text.**
    - **Provide realistic salary insights based on the user's location, skills, and experience.**
    - **Search for jobs based on the extracted location, experience level, and skills.**
    `;
}

/**
 * Sends prompt to Google Gemini API with fallback models logic
 * @param {string} resumeText Extracted text content
 * @returns {Promise<Object>} Parsed analysis JSON response
 */
async function analyzeResumeWithAI(resumeText) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured in environment variables. Please add GEMINI_API_KEY."
    );
  }

  const prompt = buildAnalysisPrompt(resumeText);
  let response;
  let lastError = "";

  for (const modelName of GEMINI_MODELS) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.7,
            },
          }),
        }
      );
      if (res.ok) {
        response = res;
        break;
      }
      lastError = await res.text();
      console.warn(`Model ${modelName} returned status ${res.status}: ${lastError}`);
    } catch (err) {
      lastError = err.message;
    }
  }

  if (!response || !response.ok) {
    throw new Error(`API request failed across all models: ${lastError}`);
  }

  const completion = await response.json();
  const responseContent =
    completion?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  if (!responseContent) {
    throw new Error("Empty or invalid response content from AI provider");
  }

  try {
    const cleanedText = responseContent
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();
    const analysis = JSON.parse(cleanedText);
    return analysis;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    const parseErr = new Error("Failed to parse AI response");
    parseErr.details = error.message;
    throw parseErr;
  }
}

module.exports = {
  analyzeResumeWithAI,
};
 