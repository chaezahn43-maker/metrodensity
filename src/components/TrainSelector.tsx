'use client';

import React from 'react';
import { useTrain } from '../context/TrainContext';

export const TrainSelector: React.FC = () => {
  const { trains, routes, selectedRouteId, selectedTrainId, setSelectedTrainId } = useTrain();

  const currentRoute = routes.find((r) => r.id === selectedRouteId);
  const routeTrains = currentRoute ? trains.filter((t) => t.route === currentRoute.name) : [];

  if (routeTrains.length === 0) return null;

  return (
    <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/40 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2M5 12a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Step 2</p>
            <h2 className="text-sm font-bold text-zinc-800 dark:text-zinc-100">열차 선택 · Select Train</h2>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-wrap gap-3">
        {routeTrains.map((train) => {
          const isActive = train.id === selectedTrainId;
          return (
            <button
              key={train.id}
              id={`train-${train.id}`}
              onClick={() => setSelectedTrainId(train.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white text-white dark:text-zinc-900 shadow-lg'
                  : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2M5 12a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2m-7-4v8m4-8v8M7 16H5v2h2v-2Zm12 0h-2v2h2v-2Z" />
              </svg>
              {train.name}
            </button>
          );
        })}
      </div>
    </section>
  );
};
