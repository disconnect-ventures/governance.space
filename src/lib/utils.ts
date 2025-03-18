import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { i18n, Locale } from "~/config/i18n";
import { EPOCH_LENGTH_MS, FIRST_EPOCH_START } from "./constants";

export type Maybe<T> = T | undefined;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(input: string) {
  return input.charAt(0).toUpperCase() + input.substring(1);
}

export function formatVotingPower(input: number) {
  input = input / 1e6; // Divide by 1000000 to account for api without explicit fracional part
  if (input >= 1e9) return (input / 1e9).toFixed(2) + "B";
  if (input >= 1e6) return (input / 1e6).toFixed(2) + "M";
  if (input >= 1e3) return (input / 1e3).toFixed(2) + "K";
  return input.toFixed(2);
}

export function formatCamelCase(input: string) {
  return input.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export const formatAda = (amount: number | string) => {
  return `₳ ${
    typeof amount === "string"
      ? amount
      : amount.toLocaleString("en-US", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })
  }`;
};

export const truncateMiddle = (input: string, maxLength: number): string => {
  if (input.length <= maxLength) return input;
  const half = Math.floor((maxLength - 3) / 2);
  const start = input.slice(0, half);
  const end = input.slice(-half);
  return `${start}...${end}`;
};

export function localizePath(locale: Locale, path: string) {
  const urlParts = path.slice(1).split("/");
  const locales = i18n.locales.map((l) => l.key);

  // Absolute path, don't modify
  if (!path.startsWith("/")) {
    return path;
  }

  // Replace locale if present
  if (urlParts.length && locales.includes(urlParts[0] as Locale)) {
    return `/${locale}/` + urlParts.slice(1).join("/");
  }

  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return `/${locale}${normalizedPath.length ? "/" : ""}${normalizedPath}`;
}

export function calculateEpochNumber(
  timestamp: number | string = Date.now()
): number {
  if (typeof timestamp === "string") {
    timestamp = new Date(timestamp).getTime();
  }
  const msSinceStart = timestamp - FIRST_EPOCH_START;
  return Math.floor(msSinceStart / EPOCH_LENGTH_MS);
}

export const formatDate = (
  date: string,
  epoch: number,
  options?: Intl.DateTimeFormatOptions
) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
    ...options,
  });
  return `${formattedDate} (Epoch ${epoch})`;
};
