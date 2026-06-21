'use client';

import React from 'react';
import { useTrain } from '../context/TrainContext';

const ROUTE_STYLES: Record<string, { color: string; activeText: string; bg: string; activeBg: string; border: string; activeBorder: string; dot: string; number: string }> = {
  'line-1': {
    number: '1',
    color: '#2563eb',
    dot: 'bg-blue-600',
    bg: 'hover:bg-blue-50 dark:hover:bg-blue-950/30',
    activeBg: 'bg-blue-600',
    border: 'border-zinc-200 dark:border-zinc-700',
    activeBorder: 'border-blue-600',
    activeText: 'text-white',
  },
  'line-2': {
    number: '2',
    color: '#16a34a',
    dot: 'bg-green-600',
    bg: 'hover:bg-green-50 dark:hover:bg-green-950/30',
    activeBg: 'bg-green-600',
    border: 'border-zinc-200 dark:border-zinc-700',
    activeBorder: 'border-green-600',
    activeText: 'text-white',
  },
  'bundang': {
    number: 'B',
    color: '#d97706',
    dot: 'bg-amber-500',
    bg: 'hover:bg-amber-50 dark:hover:bg-amber-950/30',
    activeBg: 'bg-amber-500',
    border: 'border-zinc-200 dark:border-zinc-700',
    activeBorder: 'border-amber-500',
    activeText: 'text-white',
  },
  'suin-bundang': {
    number: 'S',
    color: '#ca8a04',
    dot: 'bg-yellow-600',
    bg: 'hover:bg-yellow-50 dark:hover:bg-yellow-950/30',
    activeBg: 'bg-yellow-600',
    border: 'border-zinc-200 dark:border-zinc-700',
    activeBorder: 'border-yellow-600',
    activeText: 'text-white',
  },
};

export const RouteSelector: React.FC = () => {
  const { routes, selectedRouteId, setSelectedRouteId } = useTrain();

  return (
    <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Step 1</p>
            <h2 className="text-sm font-bold text-zinc-800 dark:text-zinc-100">노선 선택 · Select Route</h2>
          </div>
        </div>
      </div>

      {/* Route Buttons */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {routes.map((route) => {
          const isActive = route.id === selectedRouteId;
          const style = ROUTE_STYLES[route.id];

          return (
            <button
              key={route.id}
              id={`route-${route.id}`}
              onClick={() => setSelectedRouteId(route.id)}
              className={`relative flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 cursor-pointer group ${
                isActive
                  ? `${style.activeBg} ${style.activeBorder} ${style.activeText} shadow-lg`
                  : `bg-zinc-50 dark:bg-zinc-800/50 ${style.border} text-zinc-600 dark:text-zinc-400 ${style.bg}`
              }`}
            >
              {/* Circle line badge */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-black transition-all duration-200 ${
                  isActive ? 'bg-white/20' : ''
                }`}
                style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : style.color, color: '#fff' }}
              >
                {style.number}
              </div>
              <span className={`text-xs font-semibold text-center leading-tight ${isActive ? 'text-white' : 'text-zinc-700 dark:text-zinc-300'}`}>
                {route.name}
              </span>
              {isActive && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/60 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
