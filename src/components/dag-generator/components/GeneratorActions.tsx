import { motion } from "framer-motion";
import { Zap, RotateCcw, AlertCircle } from "lucide-react";

interface GeneratorActionsProps {
  isValid: boolean;
  hasGenerated: boolean;
  onGenerate: () => void;
  onReset: () => void;
}

export function GeneratorActions({
  isValid,
  hasGenerated,
  onGenerate,
  onReset,
}: GeneratorActionsProps) {
  return (
    <div className="flex items-center gap-3">
      <motion.button
        onClick={onGenerate}
        disabled={!isValid}
        whileTap={isValid ? { scale: 0.97 } : undefined}
        className={`relative flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
          isValid
            ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20 cursor-pointer"
            : "bg-slate-800 text-slate-600 cursor-not-allowed"
        }`}
      >
        <Zap size={14} />
        {hasGenerated ? "Regenerate" : "Generate DAG"}
      </motion.button>

      {hasGenerated && (
        <motion.button
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-500 transition-all cursor-pointer"
        >
          <RotateCcw size={13} />
          Reset
        </motion.button>
      )}

      {!isValid && (
        <p className="flex items-center gap-1.5 text-xs text-slate-600">
          <AlertCircle size={11} />
          Fill in DAG name and email to generate
        </p>
      )}
    </div>
  );
}
