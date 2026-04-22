export function generatePurgeDag({
  dagId,
  schedule,
  retries,
  email,
  fnBodies,
}): string {
  const [identifyFn, archiveFn, deleteFn] = fnBodies;

  return `
# Type : Purge (Identify → Archive → Delete)

${identifyFn}   ← SELECT ids WHERE created_at < NOW()-90j
${archiveFn}    ← copie vers cold storage
${deleteFn}     ← DELETE — CAUTION: archive doit réussir

with DAG(
    dag_id="${dagId}",
    tags=["purge", "maintenance"],
    ...
) as dag:
    t_identify = PythonOperator(task_id="identify_records", ...)
    t_archive  = PythonOperator(task_id="archive_records", ...)
    t_delete   = PythonOperator(task_id="delete_records", ...)

    # Archive MUST succeed before deletion
    t_identify >> t_archive >> t_delete
`;
}
