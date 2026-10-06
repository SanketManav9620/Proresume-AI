const pdf = require("pdf-parse/lib/pdf-parse.js");

/**
 * Extracts plain text from an uploaded PDF file buffer
 * @param {Buffer} fileBuffer PDF file buffer from Multer
 * @returns {Promise<string>} Extracted plain text content
 */
async function extractTextFromPDF(fileBuffer) {
  if (!fileBuffer) {
    throw new Error("No file buffer provided for PDF parsing");
  }

  let data;
  try {
    data = await pdf(new Uint8Array(fileBuffer));
  } catch (pdfErr) {
    const error = new Error("Failed to parse PDF document");
    error.details = pdfErr.message;
    throw error;
  }

  const text = (data?.text || "").trim();
  if (!text) {
    throw new Error("Unable to extract text from PDF");
  }

  return text;
}

module.exports = {
  extractTextFromPDF,
};
 