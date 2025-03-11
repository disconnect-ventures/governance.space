export const PUBLIC_APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN || "https://governancespace.com";

export const PDF_API_URL = process.env.API_PDF_BASE_URL || "";
export const API_BASE_URL = process.env.API_BASE_URL || "";
export const METADATA_BASE_URL = process.env.METADATA_BASE_URL || "";

export const FIRST_EPOCH_START = 1506203091000; //September 23, 2017, 21:44:51 UTC
export const EPOCH_LENGTH_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

export function checkEnvironment() {
  if (!PDF_API_URL || !API_BASE_URL || !METADATA_BASE_URL) {
    console.warn("❗ Missing environment variables");
  }
}
