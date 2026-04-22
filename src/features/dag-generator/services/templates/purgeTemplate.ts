import type { TemplateOptions } from "@/features/dag-generator/types";
import { indentBlock } from "@/features/dag-generator/utils/sanitizers";

export function generatePurgeDag({
  dagId,
  schedule,
  retries,
  email,
  fnBodies,
}: TemplateOptions): string {
  const [identifyBody = "", archiveBody = "", deleteBody = ""] = fnBodies;

  const identifyFn = `def identify_records():\n${identifyBody}`;
  const archiveFn = `def archive_records():\n${archiveBody}`;
  const deleteFn = `def delete_records():\n${deleteBody}`;

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
    tags=['purge', 'maintenance']
) as dag:
 
${indentBlock(identifyFn, 4)}
 
${indentBlock(archiveFn, 4)}
 
${indentBlock(deleteFn, 4)}
 
    identify_task = PythonOperator(task_id='identify_records', python_callable=identify_records)
    archive_task = PythonOperator(task_id='archive_records', python_callable=archive_records)
    delete_task = PythonOperator(task_id='delete_records', python_callable=delete_records)
 
    # Archive MUST succeed before deletion
    identify_task >> archive_task >> delete_task
`;
}
