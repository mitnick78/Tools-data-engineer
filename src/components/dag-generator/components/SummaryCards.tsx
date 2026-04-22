import { Clock, RefreshCw, Mail, Layers } from "lucide-react";
import type { DagType } from "@/features/dag-generator/types";
import { DAG_TYPE_CONFIGS } from "@/features/dag-generator/constants/dagTemplate";

interface SummaryCardsProps {
  dagId: string;
  schedule: string;
  retries: number;
  email: string;
  dagType: DagType;
}

export function SummaryCards({
  dagId,
  schedule,
  retries,
  email,
  dagType,
}: SummaryCardsProps) {
  const typeConfig = DAG_TYPE_CONFIGS[dagType];

  const cards = [
    {
      icon: <Layers size={13} className="text-emerald-400" />,
      label: "dag_id",
      value: dagId,
      mono: true,
    },
    {
      icon: <Clock size={13} className="text-sky-400" />,
      label: "schedule",
      value: schedule,
      mono: true,
    },
    {
      icon: <RefreshCw size={13} className="text-violet-400" />,
      label: "retries",
      value: String(retries),
      mono: true,
    },
    {
      icon: <Mail size={13} className="text-amber-400" />,
      label: "email_on_failure",
      value: email || "—",
      mono: false,
    },
    {
      icon: <span className="text-sm">{typeConfig.icon}</span>,
      label: "type",
      value: typeConfig.label,
      mono: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="flex flex-col gap-1.5 p-3 rounded-lg bg-slate-900 border border-slate-800"
        >
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
            {card.icon}
            {card.label}
          </div>
          <p
            className={`text-sm truncate text-slate-100 ${card.mono ? "font-mono" : ""}`}
            title={card.value}
          >
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
