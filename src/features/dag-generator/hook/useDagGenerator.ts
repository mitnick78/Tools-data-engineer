import { useCallback, useState } from "react";
import type { DagState, DagType, GeneratedDag, EditableFunction } from "../types";
import { validateCron } from "../utils/cron";
import { DEFAULT_FUNCTIONS } from "../constants/dagTemplate";
import { generateDagCode } from "../services/dagCodeGenerator";

const initialState: DagState = {
  dagName: '',
  schedulePreset: 'daily',
  customCron: '',
  retries: 1,
  email: '',
  dagType: 'elt',
  functions: DEFAULT_FUNCTIONS['elt'],
};

export function useDagGenerator() {
  const [state, setState] = useState<DagState>(initialState);
  const [generated, setGen] = useState<GeneratedDag | null>(null);
  const [cronError, setCronErr] = useState<string | null>(null);

  // Setters
  const setDagName = useCallback((value: string) => {
    setState(s => ({ ...s, dagName: value }));
  }, []);

  const setSchedulePreset = useCallback((value: string) => {
    setState(s => ({ ...s, schedulePreset: value }));
    setCronErr(null);
  }, []);

  const setCustomCron = useCallback((value: string) => {
    setState(s => ({ ...s, customCron: value }));
    const result = validateCron(value);
    setCronErr(result.isValid ? null : result.error || null);
  }, []);

  const setRetries = useCallback((value: number) => {
    setState(s => ({ ...s, retries: Math.max(0, value) }));
  }, []);

  const setEmail = useCallback((value: string) => {
    setState(s => ({ ...s, email: value }));
  }, []);

  const setDagType = useCallback((type: DagType) => {
    setState(s => ({ ...s, dagType: type, functions: DEFAULT_FUNCTIONS[type] }));
    setGen(null);
  }, []);

  const updateFunction = useCallback((id: string, updates: Partial<EditableFunction>) => {
    setState(s => ({
      ...s,
      functions: s.functions.map(f => f.id === id ? { ...f, ...updates } : f),
    }));
  }, []);

  const resetFunctions = useCallback(() => {
    setState(s => ({ ...s, functions: DEFAULT_FUNCTIONS[s.dagType] }));
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
    setGen(null);
    setCronErr(null);
  }, []);

  const generate = useCallback(() => {
    if (state.schedulePreset === 'custom') {
      const r = validateCron(state.customCron);
      if (!r.isValid) {
        setCronErr(r.error || 'Invalid cron');
        return;
      }
    }
    setGen(generateDagCode(state));
  }, [state]);

  // Derived values
  const dagId = state.dagName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  
  const effectiveSchedule = state.schedulePreset === 'custom' ? state.customCron : state.schedulePreset;

  const isValid =
    state.dagName.trim().length > 0 &&
    state.email.trim().length > 0 &&
    (state.schedulePreset !== 'custom' || validateCron(state.customCron).isValid) &&
    !cronError;

  return {
    state,
    generated,
    cronError,
    isValid,
    dagId,
    effectiveSchedule,
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
  };
}