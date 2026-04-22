import type { DagState, GeneratedDag } from "../types";
import { sanitizer } from "../utils/sanitizers";
import { dagIdToFilename, wrapInFunction } from "../utils/python";
import { generateEltDag } from "./templates/eltTemplate";
import { generateApiDag } from "./templates/apiTemplate";
import { generatePurgeDag } from "./templates/purgeTemplate";

export function generateDagCode(state: DagState): GeneratedDag {
  const dagId = sanitizer(state.dagName) || "my_dag";
  const schedule =
    state.schedulePreset === "custom" ? state.customCron : state.schedulePreset;

  const fnBodies = state.functions.map((f) => wrapInFunction(f.name, f.body));

  let dagBody = "";

  switch (state.dagType) {
    case "elt":
      dagBody = generateEltDag({
        dagId,
        schedule,
        retries: state.retries,
        email: state.email,
        fnBodies,
      });
      break;
    case "api":
      dagBody = generateApiDag({
        dagId,
        schedule,
        retries: state.retries,
        email: state.email,
        fnBodies,
      });
      break;
    case "purge":
      dagBody = generatePurgeDag({
        dagId,
        schedule,
        retries: state.retries,
        email: state.email,
        fnBodies,
      });
      break;
    default:
      break;
  }

  return {
    code: dagBody,
    filename: dagIdToFilename(dagId),
    dagId,
  };
}
