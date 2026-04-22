import type { DagType, DagTypeConfig, EditableFunction } from "../types";

export const DAG_TYPE_CONFIGS: Record<DagType, DagTypeConfig> = {
  elt: {
    label: "ELT",
    description: "Extract → Transform → Load pipeline",
    icon: "⇄",
    tags: ["elt", "data-pipeline"],
    functionIds: ["extract", "transform", "load"],
  },
  api: {
    label: "API",
    description: "Fetch and process external API data",
    icon: "⇡",
    tags: ["api", "ingestion"],
    functionIds: ["fetch_data", "process_response", "store_results"],
  },
  purge: {
    label: "Purge",
    description: "Archive and clean up old records",
    icon: "⊘",
    tags: ["purge", "maintenance"],
    functionIds: ["identify_records", "archive_records", "delete_records"],
  },
};

//ELT functions
const ELT_EXTRACT: EditableFunction = {
  id: "extract",
  name: "extract",
  description: "Extract raw data from the source",
  body: ["def extract():", '    print("Extract data")'].join("\n"),
};

const ELT_TRANSFORM: EditableFunction = {
  id: "transform",
  name: "transform",
  description: "Transform the extracted data",
  body: ["def transform():", '    print("Transform data")'].join("\n"),
};

const ELT_LOAD: EditableFunction = {
  id: "load",
  name: "load",
  description: "Load transformed data into the target",
  body: ["def load():", '    print("Load data")'].join("\n"),
};

// API functions
const API_FETCH: EditableFunction = {
  id: "fetch_data",
  name: "fetch_data",
  description: "Fetch data from the API",
  body: ["def fetch_data():", '    print("Fetch data from API")'].join("\n"),
};

const API_PROCESS: EditableFunction = {
  id: "process_response",
  name: "process_response",
  description: "Process the API response",
  body: ["def process_response():", '    print("Process API response")'].join(
    "\n",
  ),
};

const API_STORE: EditableFunction = {
  id: "store_results",
  name: "store_results",
  description: "Store processed results",
  body: ["def store_results():", '    print("Store results")'].join("\n"),
};

// Purge functions

const PURGE_IDENTIFY: EditableFunction = {
  id: "identify_records",
  name: "identify_records",
  description: "Identify records to purge",
  body: [
    "def identify_records():",
    '    print("Identify records to purge")',
  ].join("\n"),
};

const PURGE_ARCHIVE: EditableFunction = {
  id: "archive_records",
  name: "archive_records",
  description: "Archive records before deletion",
  body: ["def archive_records():", '    print("Archive records")'].join("\n"),
};

const PURGE_DELETE: EditableFunction = {
  id: "delete_records",
  name: "delete_records",
  description: "Delete archived records",
  body: ["def delete_records():", '    print("Delete records")'].join("\n"),
};

export const DEFAULT_FUNCTIONS: Record<DagType, EditableFunction[]> = {
  elt: [ELT_EXTRACT, ELT_TRANSFORM, ELT_LOAD],
  api: [API_FETCH, API_PROCESS, API_STORE],
  purge: [PURGE_IDENTIFY, PURGE_ARCHIVE, PURGE_DELETE],
};
