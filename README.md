# Airflow DAG Generator

A web tool to generate production-ready Apache Airflow DAGs from a simple form — no boilerplate, just working Python code.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

## Features

- **3 DAG types** — ELT, API, Purge
- **6 cron presets** + custom expression with live validation
- **Editable task functions** — write your own Python logic in-browser
- **Live preview** — syntax-highlighted Python code
- **Export** — download as `.py` or copy to clipboard

## Getting started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build
```

## Tech stack

- **React 19** + **TypeScript** — type-safe component architecture
- **Vite** — instant dev server and optimized builds
- **Tailwind CSS v4** — utility-first styling
- **React Router v7** — client-side routing with lazy loading
- **Framer Motion** — animations
- **Lucide React** — icons

## Project structure

```
src/
├── app/                      # App-level config (routing)
├── pages/                    # Route shells — no business logic
│   └── tools/
├── features/                 # Feature-based modules
│   └── dag-generator/
│       ├── components/       # UI components
│       ├── constants/        # Presets, templates
│       ├── hooks/            # State management
│       ├── services/         # Code generation
│       │   └── templates/    # One file per DAG type
│       ├── types/            # TypeScript contracts
│       └── utils/            # Cron validation, sanitizers...
└── lib/                      # Shared utilities
```

## Roadmap

- [x] DAG Generator (ELT, API, Purge)
- [ ] Pipeline Builder — visual multi-step designer
- [ ] Schema Validator — JSON / Avro / Parquet validation

## License

MIT
