'use client';

import React from 'react';
import { useTrain } from '../context/TrainContext';
import { getCrowdStatus, getCrowdColorClass } from '../types';

export const Dashboard: React.FC = () => {
  const { selectedTrain } = useTrain();

  if (!selectedTrain) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-150 dark:border-zinc-800 p-8 shadow-sm text-center">
        <p className="text-zinc-500 dark:text-zinc-400">
          Select a route and train to view the crowd dashboard.
        </p>
      </div>
    );
  }

  // Calculate overall train averages for summary stats
  const totalPassengers = selectedTrain.cars.reduce((sum, car) => sum + car.passengers, 0);
  const avgPassengers = Math.round(totalPassengers / selectedTrain.cars.length);
  const trainStatus = getCrowdStatus(avgPassengers);
  const trainColor = getCrowdColorClass(trainStatus);

  return (
    <div className="space-y-6">
      {/* Train Summary Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-150 dark:border-zinc-800 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {selectedTrain.route}
            </span>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              {selectedTrain.name} Dashboard
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2">
              <span className="block text-xs text-zinc-400 dark:text-zinc-500 font-medium">Total Passengers</span>
              <span className="text-base font-bold text-zinc-800 dark:text-zinc-200">{totalPassengers}</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2">
              <span className="block text-xs text-zinc-400 dark:text-zinc-500 font-medium">Average Congestion</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: trainColor.rawHex }} />
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{trainStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Train Visual Component */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-150 dark:border-zinc-800 p-5 shadow-sm overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-2 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-blue-600" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Train Car Density
          </h2>
        </div>

        {/* Horizontal connected train cars */}
        <div className="flex items-center min-w-[700px] pb-4 px-2">
          {/* Train Front/Engine block */}
          <div className="relative flex-shrink-0 w-16 h-28 bg-zinc-700 dark:bg-zinc-600 rounded-l-3xl flex items-center justify-center text-white font-bold border-y-2 border-l-2 border-zinc-800 dark:border-zinc-500 shadow-sm">
            <div className="absolute right-2 top-4 w-4 h-6 bg-zinc-800 dark:bg-zinc-700 rounded" />
            <div className="text-center rotate-270 text-[10px] uppercase font-bold tracking-widest text-zinc-300">
              FRONT
            </div>
            {/* Front windshield */}
            <div className="absolute left-1.5 top-5 w-6 h-18 bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-800 rounded-l-2xl rounded-r" />
          </div>

          {selectedTrain.cars.map((car, index) => {
            const status = getCrowdStatus(car.passengers);
            const colors = getCrowdColorClass(status);
            // Cap visual percentage for the progress bar at 100
            const percentage = Math.min((car.passengers / 80) * 100, 100);

            return (
              <React.Fragment key={car.carNumber}>
                {/* Coupler linking cars */}
                <div className="flex-shrink-0 w-3 h-1 bg-zinc-400 dark:bg-zinc-600 border-y border-zinc-500" />

                {/* Car Box */}
                <div className="relative flex-grow flex-shrink-0 w-36 h-28 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-md transition-all p-3 flex flex-col justify-between">
                  {/* Car Header */}
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      Car {car.carNumber}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Passenger Count */}
                  <div className="text-center my-1.5">
                    <span className="text-2xl font-black text-zinc-800 dark:text-zinc-100">
                      {car.passengers}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 ml-1 font-medium">
                      riders
                    </span>
                  </div>

                  {/* Crowd Level Bar */}
                  <div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-750 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: colors.rawHex,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}

          {/* Train Rear coupler */}
          <div className="flex-shrink-0 w-3 h-1 bg-zinc-400 dark:bg-zinc-600 border-y border-zinc-500" />
          {/* Train Rear end */}
          <div className="flex-shrink-0 w-6 h-28 bg-zinc-700 dark:bg-zinc-600 rounded-r-lg border-y-2 border-r-2 border-zinc-800 dark:border-zinc-500 shadow-sm" />
        </div>
        
        {/* Horizontal scroll instructions for mobile */}
        <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center mt-2 md:hidden">
          ← Swipe to see more cars →
        </p>
      </div>

      {/* Legend Card */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-150 dark:border-zinc-800 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-400 dark:text-zinc-500">Legend:</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Low (0-20)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Medium (21-40)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            <span>High (41-60)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span>Very High (61+)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
