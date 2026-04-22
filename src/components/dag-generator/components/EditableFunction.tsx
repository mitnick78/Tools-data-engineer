import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, RotateCcw, Code2 } from "lucide-react";
import type { EditableFunction } from "@/features/dag-generator/types";

interface EditableFunctionsProps {
  functions: EditableFunction[];
  onUpdate: (id: string, updates: Partial<EditableFunction>) => void;
  onReset: () => void;
}

export function EditableFunctions({
  functions,
  onUpdate,
  onReset,
}: EditableFunctionsProps) {
  const [expanded, setExpanded] = useState<string | null>(
    functions[0]?.id ?? null,
  );

  const toggle = (id: string) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          <Code2 size={12} />
          Task Functions
          <span className="ml-1 text-slate-600 font-normal normal-case tracking-normal">
            ({functions.length})
          </span>
        </h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-400 transition-colors"
        >
          <RotateCcw size={11} />
          Reset to defaults
        </button>
      </div>

      <div className="space-y-2">
        {functions.map((fn, index) => {
          // Ensure a minimum height for the editor (e.g. 4 lines) for better UX when the function body is short or empty
          const linesCount = Math.max(fn.body.split("\n").length, 4);
          return (
            <motion.div
              key={fn.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-slate-800 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggle(fn.id)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded bg-emerald-500/15 text-emerald-400 text-xs font-bold font-mono">
                    {index + 1}
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-mono text-slate-100">
                      def <span className="text-emerald-400">{fn.name}</span>
                      <span className="text-slate-500">(ti, **kwargs):</span>
                    </p>
                    <p className="text-xs text-slate-500">{fn.description}</p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expanded === fn.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={14} className="text-slate-500" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {expanded === fn.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="relative bg-slate-950 border-t border-slate-800">
                      <div className="flex">
                        <div className="select-none px-3 py-3 text-right text-xs font-mono text-slate-700 border-r border-slate-800 min-w-[2.5rem]">
                          {Array.from({ length: linesCount }).map((_, i) => (
                            <div key={i} className="leading-5">
                              {i + 1}
                            </div>
                          ))}
                        </div>
                        <textarea
                          value={fn.body}
                          onChange={(e) =>
                            onUpdate(fn.id, { body: e.target.value })
                          }
                          spellCheck={false}
                          rows={linesCount}
                          className="flex-1 bg-transparent px-4 py-3 text-xs font-mono text-slate-300 leading-5 resize-none focus:outline-none"
                          style={{ tabSize: 4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
