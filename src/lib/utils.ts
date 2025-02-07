import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

export const truncateMiddle = (input: string, maxLength: number): string => {
  if (input.length <= maxLength) return input;
  const half = Math.floor((maxLength - 3) / 2);
  const start = input.slice(0, half);
  const end = input.slice(-half);
  return `${start}...${end}`;
};
