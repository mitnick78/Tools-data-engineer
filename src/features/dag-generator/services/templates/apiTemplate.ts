import type { TemplateOptions } from "@/features/dag-generator/types";
import { indentBlock } from "@/features/dag-generator/utils/sanitizers";

export function generateApiDag({
  dagId,
  schedule,
  retries,
  email,
  fnBodies,
}: TemplateOptions): string {
  const [fetchBody = "", processBody = "", storeBody = ""] = fnBodies;

  const fetchFn = `def fetch_data():\n${fetchBody}`;
  const processFn = `def process_response():\n${processBody}`;
  const storeFn = `def store_results():\n${storeBody}`;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
 
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'retries': ${retries},
    'email': ['${email}']
}
 
with DAG(
    dag_id='${dagId}',
    default_args=default_args,
    schedule_interval='${schedule}',
    start_date=datetime(${year}, ${month}, ${day}),
    catchup=False,
    tags=['api', 'ingestion']
) as dag:
 
${indentBlock(fetchFn, 4)}
 
${indentBlock(processFn, 4)}
 
${indentBlock(storeFn, 4)}
 
    fetch_task = PythonOperator(task_id='fetch_data', python_callable=fetch_data)
    process_task = PythonOperator(task_id='process_response', python_callable=process_response)
    store_task = PythonOperator(task_id='store_results', python_callable=store_results)
 
    fetch_task >> process_task >> store_task
`;
}
