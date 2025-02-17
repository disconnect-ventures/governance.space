export const PDF_API_URL = process.env.API_PDF_BASE_URL || "";
export const API_BASE_URL = process.env.API_BASE_URL || "";
export const METADATA_BASE_URL = process.env.METADATA_BASE_URL || "";

function checkEnvironment() {
  if (!PDF_API_URL || !API_BASE_URL || !METADATA_BASE_URL) {
    console.warn("❗ Missing environment variables");
  }
}
checkEnvironment();
