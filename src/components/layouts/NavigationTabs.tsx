import React from "react";
import type { ViewType } from "../../types";

interface TabsProps {
  currentView: ViewType;
  setView: (v: ViewType) => void;
}

export default function NavigationTabs({ currentView, setView }: TabsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
      <div className="flex overflow-x-auto">
        <button
          onClick={() => setView("home")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            currentView === "home"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Inicio
        </button>
        <button
          onClick={() => setView("cuotas")}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            currentView === "cuotas"
              ? "border-blue-500 text-blue-600 dark:text-blue-400"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Cuotas
        </button>
      </div>
    </div>
  );
}
