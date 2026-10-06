const linkedIn = require("linkedin-jobs-api");

/**
 * Searches LinkedIn jobs with a specified timeout limit
 * @param {Object} queryOptions Search filters (keyword, location, experienceLevel, etc.)
 * @returns {Promise<Array>} List of job results or empty array
 */
async function searchJobs(queryOptions) {
  try {
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Job search timeout")), 5000)
    );
    const response = await Promise.race([linkedIn.query(queryOptions), timeout]);
    return response || [];
  } catch (error) {
    console.error("Error searching jobs:", error.message);
    return [];
  }
}

module.exports = {
  searchJobs,
};
