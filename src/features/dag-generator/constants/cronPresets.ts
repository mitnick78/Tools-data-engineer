import type { CronPreset } from "../types";

export const CRON_PRESETS: CronPreset[] = [
  {
    label: "Every 30 minutes",
    value: "*/30 * * * *",
    description: "Runs every 30 minutes",
  },
  {
    label: "Hourly",
    value: "0 * * * *",
    description: "Every hour at minute 0",
    airflowAlias: "@hourly",
  },
  {
    label: "Daily (midnight)",
    value: "0 0 * * *",
    description: "Every day at midnight",
    airflowAlias: "@daily",
  },
  {
    label: "Custom",
    value: "custom",
    description: "Enter a custom cron expression",
  },
];

export const CUSTOM_CRON_VALUE = "custom";

export const CRON_FIELD_LABELS = ["minute", "hour", "day", "month", "weekday"];
