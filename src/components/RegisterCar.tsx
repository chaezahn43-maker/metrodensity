'use client';

import React, { useState } from 'react';
import { useTrain } from '../context/TrainContext';

export const RegisterCar: React.FC = () => {
  const { selectedTrain, registerPassenger } = useTrain();
  const [selectedCarNum, setSelectedCarNum] = useState<number | null>(null);
  const [lastRegisteredCar, setLastRegisteredCar] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!selectedTrain) return null;

  const handleRegister = () => {
    if (selectedCarNum === null) return;
    
    registerPassenger(selectedTrain.id, selectedCarNum);
    setLastRegisteredCar(selectedCarNum);
    setShowSuccess(true);
    
    // Clear success message after 3 seconds
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-150 dark:border-zinc-800 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Step 3: Register Current Car
        </h2>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Are you on this train? Help others find space by registering your car! Select the car you are riding in:
        </p>

        {/* Car Grid Buttons */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {selectedTrain.cars.map((car) => {
            const isSelected = selectedCarNum === car.carNumber;
            return (
              <button
                key={car.carNumber}
                type="button"
                onClick={() => {
                  setSelectedCarNum(car.carNumber);
                  setShowSuccess(false); // Hide success if they change selection
                }}
                className={`py-3 px-2 text-center rounded-xl border text-sm font-semibold transition-all duration-150 ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                }`}
              >
                Car {car.carNumber}
              </button>
            );
          })}
        </div>

        {/* Submit action */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleRegister}
            disabled={selectedCarNum === null}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
              selectedCarNum === null
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-700 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/15 active:scale-95'
            }`}
          >
            Register Current Ride
          </button>

          {/* Success Notification */}
          {showSuccess && lastRegisteredCar !== null && (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 animate-fade-in bg-emerald-50 dark:bg-emerald-950/20 px-4 py-2 rounded-xl border border-emerald-100 dark:border-emerald-900/30 w-full sm:w-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span className="text-xs font-semibold">
                Car {lastRegisteredCar} count increased!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
