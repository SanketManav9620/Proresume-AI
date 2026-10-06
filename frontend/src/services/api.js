const rawApiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/analyze";
export const API_URL =
  rawApiUrl.endsWith("/analyze") || rawApiUrl.endsWith("/")
    ? rawApiUrl
    : `${rawApiUrl}/analyze`;

/**
 * Sends PDF file to backend for resume analysis
 * @param {File} file Resume PDF file
 * @returns {Promise<Object>} Analyzed response JSON
 */
export async function analyzeResumeApi(file) {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg =
      data?.details ||
      data?.error ||
      `Server error (${response.status}). Please check environment variables and backend logs.`;
    throw new Error(errorMsg);
  }

  return data;
}
