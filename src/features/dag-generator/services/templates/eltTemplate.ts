import type { TemplateOptions } from "@/features/dag-generator/types";
import { indentBlock } from "@/features/dag-generator/utils/sanitizers";

export function generateEltDag({
  dagId,
  schedule,
  retries,
  email,
  fnBodies,
}: TemplateOptions): string {
  const [extractFn = "", loadFn = "", transformFn = ""] = fnBodies;

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
    catchup=False
) as dag:

${indentBlock(extractFn, 4)}
${indentBlock(transformFn, 4)}
${indentBlock(loadFn, 4)}
    extract_task = PythonOperator(task_id='extract', python_callable=extract)
    transform_task = PythonOperator(task_id='transform', python_callable=transform)
    load_task = PythonOperator(task_id='load', python_callable=load)

    extract_task >> transform_task >> load_task
`;
}
