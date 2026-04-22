import { motion, AnimatePresence } from "framer-motion";
import { useDagGenerator } from "@/features/dag-generator/hook/useDagGenerator";
import { DagForm } from "./DagForm";
import { EditableFunctions } from "./EditableFunction";
import { DagPreview } from "./DagPreview";
import { SummaryCards } from "./SummaryCards";
import { GeneratorActions } from "./GeneratorActions";

export function DagGeneratorView() {
  const {
    state,
    generated,
    cronError,
    effectiveSchedule,
    dagId,
    isValid,
    setDagName,
    setSchedulePreset,
    setCustomCron,
    setRetries,
    setEmail,
    setDagType,
    updateFunction,
    resetFunctions,
    generate,
    reset,
  } = useDagGenerator();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold font-mono tracking-tight text-slate-100">
              <span className="text-emerald-400">airflow</span>
              <span className="text-slate-600">/</span>
              dag-generator
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure your DAG and generate production-ready Python code
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-600 border border-slate-800 rounded px-2 py-1">
            Apache Airflow 2.x
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
                Configuration
              </h2>
              <DagForm
                dagName={state.dagName}
                schedulePreset={state.schedulePreset}
                customCron={state.customCron}
                retries={state.retries}
                email={state.email}
                dagType={state.dagType}
                cronError={cronError}
                dagId={dagId}
                onDagNameChange={setDagName}
                onSchedulePresetChange={setSchedulePreset}
                onCustomCronChange={setCustomCron}
                onRetriesChange={setRetries}
                onEmailChange={setEmail}
                onDagTypeChange={setDagType}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <EditableFunctions
                functions={state.functions}
                onUpdate={updateFunction}
                onReset={resetFunctions}
              />
            </div>
          </div>
        </div>

        <GeneratorActions
          isValid={isValid}
          hasGenerated={!!generated}
          onGenerate={generate}
          onReset={reset}
        />

        <AnimatePresence>
          {generated && (
            <motion.div
              key="output"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                  Generated DAG
                </h2>
                <SummaryCards
                  dagId={generated.dagId}
                  schedule={effectiveSchedule}
                  retries={state.retries}
                  email={state.email}
                  dagType={state.dagType}
                />
              </div>

              <DagPreview generated={generated} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
