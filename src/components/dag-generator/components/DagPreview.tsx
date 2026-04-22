import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Download, Terminal } from "lucide-react";
import type { GeneratedDag } from "@/features/dag-generator/types";
import {
  copyToClipboard,
  downloadFile,
} from "@/features/dag-generator/utils/download";

interface DagPreviewProps {
  generated: GeneratedDag;
}

/**
 * Python — découpe le code en segments puis applique les couleurs
 * dans le bon ordre.
 *
 * Ordre de priorité :
 *   1. Comments (#...)           slate-500
 *   2. Strings                   amber-300
 *   3. Numbers                   orange-300
 *   4. Keywords.                 violet-400 / sky-400
 */
function highlight(code: string): string {
  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Regex pour identifier les tokens : commentaires, chaînes, nombres, identifiants
  const TOKEN_RE =
    /(#[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_][A-Za-z0-9_]*\b)/g;

  const KEYWORDS = new Set([
    "from",
    "import",
    "as",
    "def",
    "with",
    "return",
    "if",
    "else",
    "elif",
    "for",
    "in",
    "not",
    "and",
    "or",
    "True",
    "False",
    "None",
    "class",
    "pass",
    "raise",
    "try",
    "except",
    "finally",
    "lambda",
    "yield",
    "__future__",
    "annotations",
  ]);

  const BUILTINS = new Set([
    "DAG",
    "PythonOperator",
    "BashOperator",
    "timedelta",
    "datetime",
    "logging",
    "days_ago",
    "getLogger",
    "requests",
  ]);

  let result = "";
  let lastIndex = 0;

  for (const match of code.matchAll(TOKEN_RE)) {
    const [token, comment, str, num, ident] = match;
    const start = match.index ?? 0;

    if (start > lastIndex) {
      result += escapeHtml(code.slice(lastIndex, start));
    }

    if (comment) {
      result += `<span class="text-slate-500 italic">${escapeHtml(comment)}</span>`;
    } else if (str) {
      result += `<span class="text-amber-300">${escapeHtml(str)}</span>`;
    } else if (num) {
      result += `<span class="text-orange-300">${num}</span>`;
    } else if (ident) {
      if (KEYWORDS.has(ident)) {
        result += `<span class="text-violet-400">${ident}</span>`;
      } else if (BUILTINS.has(ident)) {
        result += `<span class="text-sky-400">${ident}</span>`;
      } else {
        result += escapeHtml(ident);
      }
    } else {
      result += escapeHtml(token);
    }

    lastIndex = start + token.length;
  }

  if (lastIndex < code.length) {
    result += escapeHtml(code.slice(lastIndex));
  }

  // color function names after 'def' keyword
  result = result.replace(
    /<span class="text-violet-400">def<\/span> ([A-Za-z_]\w*)/g,
    '<span class="text-violet-400">def</span> <span class="text-emerald-400">$1</span>',
  );

  return result;
}

export function DagPreview({ generated }: DagPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(generated.code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadFile(generated.code, generated.filename);
  };

  const lines = generated.code.split("\n");
  const lineCount = lines.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-slate-700 overflow-hidden bg-slate-950"
    >
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <Terminal size={13} className="text-emerald-400" />
          <span className="text-xs font-mono text-slate-400">
            {generated.filename}
          </span>
          <span className="text-[10px] text-slate-600 border border-slate-700 rounded px-1.5 py-0.5">
            {lineCount} lines
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded-md transition-all"
          >
            <Download size={11} />
            .py
          </button>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border transition-all ${
              copied
                ? "text-emerald-300 border-emerald-600 bg-emerald-500/10"
                : "text-slate-300 hover:text-white border-slate-700 hover:border-slate-500"
            }`}
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="flex overflow-auto max-h-[60vh]">
        <div className="sticky left-0 select-none bg-slate-950 px-3 pt-4 pb-4 text-right text-xs font-mono text-slate-700 border-r border-slate-800 min-w-[3rem]">
          {lines.map((_, i) => (
            <div key={i} className="leading-5">
              {i + 1}
            </div>
          ))}
        </div>

        <pre className="flex-1 px-5 py-4 text-xs font-mono leading-5 text-slate-300 overflow-x-auto">
          <code
            dangerouslySetInnerHTML={{ __html: highlight(generated.code) }}
          />
        </pre>
      </div>
    </motion.div>
  );
}
