'use client';

import React, { useState } from 'react';
import { useTrain } from '../context/TrainContext';

export const RegisterCar: React.FC = () => {
  const { selectedTrain, registerPassenger } = useTrain();
  const [selectedCarNum, setSelectedCarNum] = useState<number | null>(null);
  const [lastRegistered, setLastRegistered] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!selectedTrain) return null;

  const handleRegister = () => {
    if (selectedCarNum === null) return;
    registerPassenger(selectedTrain.id, selectedCarNum);
    setLastRegistered(selectedCarNum);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3500);
  };

  return (
    <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Step 3</p>
            <h2 className="text-sm font-bold text-zinc-800 dark:text-zinc-100">내 위치 등록 · Register My Car</h2>
          </div>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2.5 ml-8">
          탑승 중인 열차 칸을 선택하고 등록 버튼을 눌러 다른 승객들을 도와주세요.
        </p>
      </div>

      <div className="p-5 space-y-4">
        {/* Car selection grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {selectedTrain.cars.map((car) => {
            const isSelected = selectedCarNum === car.carNumber;
            return (
              <button
                key={car.carNumber}
                id={`register-car-${car.carNumber}`}
                type="button"
                onClick={() => { setSelectedCarNum(car.carNumber); setShowSuccess(false); }}
                className={`flex flex-col items-center justify-center gap-1 py-3.5 rounded-xl border-2 text-sm transition-all duration-150 ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                }`}
              >
                <span className="text-xs font-black">{car.carNumber}호</span>
                {isSelected && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Submit row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
          <button
            id="register-submit"
            type="button"
            onClick={handleRegister}
            disabled={selectedCarNum === null}
            className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              selectedCarNum === null
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed border border-zinc-200 dark:border-zinc-700'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 active:scale-95'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {selectedCarNum !== null ? `${selectedCarNum}호차 탑승 등록` : '칸을 선택해 주세요'}
          </button>

          {showSuccess && lastRegistered !== null && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 animate-fade-in">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <span className="text-xs font-semibold">
                {lastRegistered}호차 승객 수가 업데이트 되었습니다!
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
