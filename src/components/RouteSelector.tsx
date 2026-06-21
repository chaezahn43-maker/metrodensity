'use client';

import React from 'react';
import { useTrain } from '../context/TrainContext';

// Helper to get line indicator color classes
const getLineBadgeColor = (routeId: string) => {
  switch (routeId) {
    case 'line-1':
      return {
        active: 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20',
        inactive: 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-600 dark:hover:text-blue-400',
        bullet: 'bg-blue-600',
      };
    case 'line-2':
      return {
        active: 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-500/20',
        inactive: 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:text-emerald-600 dark:hover:text-emerald-400',
        bullet: 'bg-emerald-600',
      };
    case 'bundang':
      return {
        active: 'bg-amber-500 text-zinc-950 border-amber-500 shadow-md shadow-amber-500/20 font-semibold',
        inactive: 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:text-amber-600 dark:hover:text-amber-500',
        bullet: 'bg-amber-500',
      };
    case 'suin-bundang':
      return {
        active: 'bg-yellow-600 text-white border-yellow-600 shadow-md shadow-yellow-500/20',
        inactive: 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-yellow-50 dark:hover:bg-yellow-950/20 hover:text-yellow-600 dark:hover:text-yellow-500',
        bullet: 'bg-yellow-600',
      };
    default:
      return {
        active: 'bg-zinc-900 text-white border-zinc-900',
        inactive: 'bg-zinc-50 text-zinc-700 border-zinc-200',
        bullet: 'bg-zinc-900',
      };
  }
};

export const RouteSelector: React.FC = () => {
  const { routes, selectedRouteId, setSelectedRouteId } = useTrain();

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-150 dark:border-zinc-800 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Step 1: Select Route
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {routes.map((route) => {
          const isActive = route.id === selectedRouteId;
          const colors = getLineBadgeColor(route.id);
          
          return (
            <button
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                isActive ? colors.active : colors.inactive
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : colors.bullet}`} />
              {route.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
