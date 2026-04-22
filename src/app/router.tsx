import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

const HomePage = lazy(() => import("@/pages/HomePage"));
const DagGeneratorPage = lazy(() => import("@/pages/tools/DagGeneratorPage"));

const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="flex items-center gap-2 text-slate-500 font-mono text-sm">
      <span className="animate-pulse text-emerald-400">▊</span>
      Loading...
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: "/tools/dag-generator",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <DagGeneratorPage />
      </Suspense>
    ),
  },
  // Catch-all : redirige vers l'accueil plutôt qu'une 404
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
