// export function sanitizer(raw: string): string {
//   return raw
//     .toLowerCase()
//     .replace(/s+/g, "_")
//     .replace(/[^a-z0-9_]/g, "")
//     .replace(/^[0-9]+/, "")
//     .trim();
// }

export function sanitizer(raw: string): string {
  const trimmed = raw.trim();
  const cleaned = /[^a-zA-Z0-9_]/g.test(trimmed);
  if (cleaned) {
    return trimmed.toLocaleLowerCase();
  }
  return trimmed
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/^[0-9_]+/, "")
    .replace(/_+$/, "");
}

export function indentBlock(code: string, spaces: number): string {
  const indent = " ".repeat(spaces);
  return code
    .split("\n")
    .map((line) => (line.trim() === "" ? "" : indent + line))
    .join("\n");
}
