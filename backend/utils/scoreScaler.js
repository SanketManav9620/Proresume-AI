const { MAX_LIMITS } = require("../config/constants");

/**
 * Scales raw category scores out of 100 to predefined category maximum limits
 * @param {Object} rawScores Raw scores object out of 100 for each category
 * @returns {Object} Scaled scores and computed total score
 */
function scaleScores(rawScores) {
  let scaledScores = {};
  let totalScore = 0;

  Object.keys(rawScores).forEach((key) => {
    let raw = rawScores[key];
    let maxLimit = MAX_LIMITS[key] || 20;
    let scaled = Math.round((raw / 100) * maxLimit);
    scaledScores[key] = scaled;
    totalScore += scaled;
  });

  return { scaledScores, totalScore };
}

module.exports = {
  scaleScores,
};
 