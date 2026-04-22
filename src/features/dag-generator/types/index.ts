export type DagType = "elt" | "api" | "purge";

export interface CronPreset {
  label: string;
  value: string;
  description: string;
  airflowAlias?: string;
}

export interface EditableFunction {
  id: string;
  name: string; // name function (ex: "extract")
  description: string;
  body: string; // content editable by user
}

export interface DagFormValues {
  dagName: string;
  schedulePreset: string; // CRON_PRESETS or 'custom'
  customCron: string;
  retries: number;
  email: string;
  dagType: DagType;
}

export interface DagState extends DagFormValues {
  functions: EditableFunction[]; // add functions to state
}

export interface GeneratedDag {
  code: string;
  filename: string;
  dagId: string;
}

export interface CronValidationResult {
  isValid: boolean;
  error?: string;
}

export interface DagTypeConfig {
  label: string;
  description: string;
  icon: string;
  tags: string[];
  functionIds: string[];
}

export interface TemplateOptions {
  dagId: string;
  schedule: string;
  retries: number;
  email: string;
  fnBodies: string[];
}
