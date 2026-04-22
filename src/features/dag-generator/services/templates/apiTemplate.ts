export function generateApiDag({
  dagId,
  schedule,
  retries,
  email,
  fnBodies,
}): string {
  const [fetchFn, processFn, storeFn] = fnBodies;

  return `
# Type : API (Fetch → Process → Store)

...imports...

${fetchFn}
${processFn}
${storeFn}

with DAG(
    dag_id="${dagId}",
    tags=["api", "ingestion"],
    ...
) as dag:
    t_fetch   = PythonOperator(task_id="fetch_data", ...)
    t_process = PythonOperator(task_id="process_response", ...)
    t_store   = PythonOperator(task_id="store_results", ...)

    t_fetch >> t_process >> t_store
`;
}
