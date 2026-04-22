/**
 * DagGeneratorPage — routing shell only.
 *
 * Convention: une `Page` est responsable UNIQUEMENT de :
 *   1. Recevoir les route params / search params depuis React Router
 *   2. Définir le document.title / meta
 *   3. Rendre la View correspondante
 *
 * ❌ Pas de business logic
 * ❌ Pas de useState / useReducer
 * ❌ Pas d'éléments UI directs
 *
 * Tout le contenu vit dans features/dag-generator/components/DagGeneratorView.tsx
 */
import { useEffect } from "react";
import { DagGeneratorView } from "@/components/dag-generator/components/DagGeneratorView";

export default function DagGeneratorPage() {
  useEffect(() => {
    document.title = "DAG Generator — Airflow Tools";
  }, []);

  return <DagGeneratorView />;
}
