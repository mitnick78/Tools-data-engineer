// export function reindent(code: string, spaces = 4): string {
//   const indent = " ".repeat(spaces);
//   return code
//     .split("\n")
//     .map((line) => (line.trim() === "" ? "" : indent + line.trim()))
//     .join("\n");
// }

export function wrapInFunction(_name: string, body: string): string {
  return body.trimEnd() + "\n";
}

export function dagIdToFilename(dagId: string): string {
  return `${dagId}.py`;
}
