import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight, GitBranch, Layers, Wrench } from "lucide-react";

const TOOLS = [
  {
    id: "dag-generator",
    path: "/tools/dag-generator",
    icon: <GitBranch size={20} className="text-emerald-400" />,
    title: "DAG Generator",
    description:
      "Configure and generate production-ready Apache Airflow DAGs with custom task functions.",
    tags: ["ELT", "API", "Purge"],
    status: "available" as const,
  },
  {
    id: "pipeline-builder",
    path: "#",
    icon: <Layers size={20} className="text-sky-400" />,
    title: "Pipeline Builder",
    description:
      "Visually design multi-step data pipelines and export them as code.",
    tags: ["Spark", "dbt", "SQL"],
    status: "coming-soon" as const,
  },
  {
    id: "schema-validator",
    path: "#",
    icon: <Wrench size={20} className="text-violet-400" />,
    title: "Schema Validator",
    description:
      "Validate JSON / Avro / Parquet schemas against your data contracts.",
    tags: ["JSON", "Avro", "Parquet"],
    status: "coming-soon" as const,
  },
];

type Tool = (typeof TOOLS)[number];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-mono text-emerald-400 tracking-widest uppercase mb-4">
            Data Engineering Toolkit
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-100 mb-4">
            Tools for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
              Data Engineers
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Generate, validate and manage your data infrastructure with
            precision. No boilerplate. Just working code.
          </p>
        </motion.div>
      </div>

      {/* Grille des outils */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              {tool.status === "available" ? (
                <Link
                  to={tool.path}
                  className="group flex flex-col h-full p-5 rounded-xl border border-slate-800 bg-slate-900 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all duration-200"
                >
                  <ToolCardContent tool={tool} />
                </Link>
              ) : (
                <div className="flex flex-col h-full p-5 rounded-xl border border-slate-800 bg-slate-900 opacity-50 cursor-not-allowed">
                  <ToolCardContent tool={tool} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolCardContent({ tool }: { tool: Tool }) {
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-slate-800">{tool.icon}</div>
        {tool.status === "coming-soon" && (
          <span className="text-[10px] font-mono text-slate-600 border border-slate-700 rounded px-1.5 py-0.5">
            Soon
          </span>
        )}
        {tool.status === "available" && (
          <ArrowRight
            size={15}
            className="text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all"
          />
        )}
      </div>
      <h3 className="font-semibold text-slate-100 mb-1">{tool.title}</h3>
      <p className="text-sm text-slate-500 flex-1 mb-4">{tool.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {tool.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono text-slate-500 bg-slate-800 rounded px-1.5 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
