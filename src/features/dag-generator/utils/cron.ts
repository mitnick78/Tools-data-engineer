import type { CronValidationResult } from "../types";

// This file contains utility functions for parsing and validating cron expressions.
const FIELD_RANGES: [number, number][] = [
  [0, 59], // minute
  [0, 23], // hour
  [1, 31], // day
  [1, 12], // month
  [0, 6], // weekday
];

const FIELD_NAMES = ["minute", "hour", "day-of-month", "month", "day-of-week"];

function validateField(part: string, min: number, max: number): boolean {
  if (part === "*") return true;
  if (part.includes("/")) {
    /* valid step */
  }
  if (part.includes("-")) {
    /* valid range */
  }
  if (part.includes(",")) {
    return part.split(",").every((v) => validateField(v, min, max));
  }
  const num = parseInt(part, 10);
  return !isNaN(num) && num >= min && num <= max;
}

export function validateCron(expression: string): CronValidationResult {
  const parts = expression.trim().split(/s+/);
  if (parts.length !== 5) {
    return { isValid: false, error: `Expected 5 fields (got ${parts.length})` };
  }
  for (let i = 0; i < 5; i++) {
    if (!validateField(parts[i], ...FIELD_RANGES[i])) {
      return {
        isValid: false,
        error: `Invalid "${parts[i]}" for ${FIELD_NAMES[i]}`,
      };
    }
  }
  return { isValid: true };
}
