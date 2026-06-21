'use client';

import React from 'react';
import { useTrain } from '../context/TrainContext';

export const TrainSelector: React.FC = () => {
  const { trains, routes, selectedRouteId, selectedTrainId, setSelectedTrainId } = useTrain();

  // Find the selected route name to filter trains
  const currentRoute = routes.find((r) => r.id === selectedRouteId);
  const routeTrains = currentRoute
    ? trains.filter((t) => t.route === currentRoute.name)
    : [];

  if (routeTrains.length === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-150 dark:border-zinc-800 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Step 2: Select Train
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {routeTrains.map((train) => {
          const isActive = train.id === selectedTrainId;
          
          return (
            <button
              key={train.id}
              onClick={() => setSelectedTrainId(train.id)}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-md shadow-zinc-900/10'
                  : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {/* Subway Train icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z"
                  className="hidden" // Just a reference
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M5 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2M5 12a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2m-2-4h.008v.008H17V8Zm-4 0h.008v.008H13V8ZM9 16H5v2h4v-2Zm10 0h-4v2h4v-2Z"
                />
              </svg>
              {train.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
