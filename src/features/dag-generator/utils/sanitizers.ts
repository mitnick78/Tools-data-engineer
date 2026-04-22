export function sanitizer(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/^[0-9]+/, "");
}

export function normaliseEmail(raw: string): string {
  return raw.trim().toLowerCase();
}
