import { motion } from "framer-motion";
import {
  AlertCircle,
  Hash,
  Mail,
  RefreshCw,
  Clock,
  Layers,
} from "lucide-react";
import type { DagType } from "@/features/dag-generator/types";
import {
  CRON_PRESETS,
  CUSTOM_CRON_VALUE,
} from "@/features/dag-generator/constants/cronPresets";
import { DAG_TYPE_CONFIGS } from "@/features/dag-generator/constants/dagTemplate";

interface DagFormProps {
  dagName: string;
  schedulePreset: string;
  customCron: string;
  retries: number;
  email: string;
  dagType: DagType;
  cronError: string | null;
  dagId: string;
  onDagNameChange: (v: string) => void;
  onSchedulePresetChange: (v: string) => void;
  onCustomCronChange: (v: string) => void;
  onRetriesChange: (v: number) => void;
  onEmailChange: (v: string) => void;
  onDagTypeChange: (v: DagType) => void;
}

const DAG_TYPES: DagType[] = ["elt", "api", "purge"];

export function DagForm({
  dagName,
  schedulePreset,
  customCron,
  retries,
  email,
  dagType,
  cronError,
  dagId,
  onDagNameChange,
  onSchedulePresetChange,
  onCustomCronChange,
  onRetriesChange,
  onEmailChange,
  onDagTypeChange,
}: DagFormProps) {
  const isCustom = schedulePreset === CUSTOM_CRON_VALUE;

  return (
    <div className="space-y-6">
      {/* DAG Name */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          <Hash size={12} />
          DAG Name
        </label>
        <input
          type="text"
          value={dagName}
          onChange={(e) => onDagNameChange(e.target.value)}
          placeholder="my_etl_pipeline"
          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
        />
        {dagName && (
          <p className="text-xs text-slate-500 font-mono">
            dag_id: <span className="text-emerald-400">{dagId}</span>
          </p>
        )}
      </div>

      {/* Schedule */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          <Clock size={12} />
          Schedule
        </label>
        <select
          value={schedulePreset}
          onChange={(e) => onSchedulePresetChange(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all appearance-none cursor-pointer"
        >
          {CRON_PRESETS.map((preset) => (
            <option key={preset.value} value={preset.value}>
              {preset.label}{" "}
              {preset.value !== "custom" ? `— ${preset.value}` : ""}
            </option>
          ))}
        </select>

        {isCustom && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1"
          >
            <input
              type="text"
              value={customCron}
              onChange={(e) => onCustomCronChange(e.target.value)}
              placeholder="*/15 * * * *"
              className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-600 font-mono text-sm focus:outline-none transition-all ${
                cronError
                  ? "border-red-500 focus:ring-1 focus:ring-red-500/30"
                  : "border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
              }`}
            />
            <div className="flex items-center gap-1 text-xs text-slate-600 font-mono">
              <span>minute</span>
              <span className="text-slate-700">·</span>
              <span>hour</span>
              <span className="text-slate-700">·</span>
              <span>day</span>
              <span className="text-slate-700">·</span>
              <span>month</span>
              <span className="text-slate-700">·</span>
              <span>weekday</span>
            </div>
            {cronError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 text-xs text-red-400"
              >
                <AlertCircle size={11} />
                {cronError}
              </motion.p>
            )}
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <RefreshCw size={12} />
            Retries
          </label>
          <input
            type="number"
            min={0}
            max={10}
            value={retries}
            onChange={(e) => onRetriesChange(parseInt(e.target.value, 10) || 0)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <Mail size={12} />
            Alert Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="ops@company.com"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
          <Layers size={12} />
          DAG Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          {DAG_TYPES.map((type) => {
            const config = DAG_TYPE_CONFIGS[type];
            const isActive = dagType === type;
            return (
              <button
                key={type}
                onClick={() => onDagTypeChange(type)}
                className={`relative flex flex-col items-start gap-1 p-3 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                    : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="dag-type-indicator"
                    className="absolute inset-0 rounded-lg bg-emerald-500/5"
                  />
                )}
                <span className="text-base">{config.icon}</span>
                <span className="text-sm font-bold font-mono">
                  {config.label}
                </span>
                <span className="text-[10px] leading-tight opacity-70">
                  {config.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
