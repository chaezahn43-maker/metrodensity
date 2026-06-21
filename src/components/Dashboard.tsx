'use client';

import React from 'react';
import { useTrain } from '../context/TrainContext';
import { getCrowdStatus, getCrowdColorClass } from '../types';
import type { CrowdStatus } from '../types';

// Icon for crowd level
const CrowdIcon: React.FC<{ status: CrowdStatus }> = ({ status }) => {
  if (status === 'Low') return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );
  if (status === 'Medium') return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  );
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
    </svg>
  );
};

// Large card color styles keyed by status
const CARD_STYLES: Record<CrowdStatus, {
  cardBg: string; cardBorder: string; badgeBg: string; badgeText: string;
  countColor: string; barBg: string; barFill: string; iconColor: string; labelKo: string;
}> = {
  'Low': {
    cardBg: 'bg-emerald-50 dark:bg-emerald-950/25',
    cardBorder: 'border-emerald-200 dark:border-emerald-800/50',
    badgeBg: 'bg-emerald-500',
    badgeText: 'text-white',
    countColor: 'text-emerald-700 dark:text-emerald-300',
    barBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    barFill: 'bg-emerald-500',
    iconColor: 'text-emerald-500',
    labelKo: '여유',
  },
  'Medium': {
    cardBg: 'bg-yellow-50 dark:bg-yellow-950/25',
    cardBorder: 'border-yellow-300 dark:border-yellow-700/50',
    badgeBg: 'bg-yellow-400',
    badgeText: 'text-yellow-900',
    countColor: 'text-yellow-700 dark:text-yellow-300',
    barBg: 'bg-yellow-100 dark:bg-yellow-900/40',
    barFill: 'bg-yellow-400',
    iconColor: 'text-yellow-500',
    labelKo: '보통',
  },
  'High': {
    cardBg: 'bg-orange-50 dark:bg-orange-950/25',
    cardBorder: 'border-orange-300 dark:border-orange-700/50',
    badgeBg: 'bg-orange-500',
    badgeText: 'text-white',
    countColor: 'text-orange-700 dark:text-orange-300',
    barBg: 'bg-orange-100 dark:bg-orange-900/40',
    barFill: 'bg-orange-500',
    iconColor: 'text-orange-500',
    labelKo: '혼잡',
  },
  'Very High': {
    cardBg: 'bg-red-50 dark:bg-red-950/25',
    cardBorder: 'border-red-300 dark:border-red-700/50',
    badgeBg: 'bg-red-500',
    badgeText: 'text-white',
    countColor: 'text-red-700 dark:text-red-300',
    barBg: 'bg-red-100 dark:bg-red-900/40',
    barFill: 'bg-red-500',
    iconColor: 'text-red-500',
    labelKo: '매우혼잡',
  },
};

export const Dashboard: React.FC = () => {
  const { selectedTrain } = useTrain();

  if (!selectedTrain) {
    return (
      <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-12 shadow-sm text-center">
        <div className="text-4xl mb-3">🚇</div>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium">노선과 열차를 선택해 주세요</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">Select a route and train to view congestion</p>
      </section>
    );
  }

  const totalPassengers = selectedTrain.cars.reduce((sum, c) => sum + c.passengers, 0);
  const avgPassengers = Math.round(totalPassengers / selectedTrain.cars.length);
  const avgStatus = getCrowdStatus(avgPassengers);
  const avgStyle = CARD_STYLES[avgStatus];

  return (
    <section className="space-y-4">
      {/* Summary bar */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-5 pt-5 pb-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">
              {selectedTrain.route}
            </span>
            <h2 className="text-lg font-black text-zinc-900 dark:text-white mt-0.5">
              {selectedTrain.name} 혼잡도 현황
            </h2>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2">
              <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
              <div>
                <div className="text-[10px] text-zinc-400 font-medium leading-none">총 승객</div>
                <div className="text-sm font-black text-zinc-800 dark:text-zinc-200">{totalPassengers}명</div>
              </div>
            </div>
            <div className={`flex items-center gap-2 rounded-xl px-4 py-2 border ${avgStyle.cardBg} ${avgStyle.cardBorder}`}>
              <span className={`${avgStyle.iconColor}`}>
                <CrowdIcon status={avgStatus} />
              </span>
              <div>
                <div className="text-[10px] text-zinc-400 font-medium leading-none">평균 혼잡</div>
                <div className={`text-sm font-black ${avgStyle.countColor}`}>{avgStyle.labelKo}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="px-5 py-3 flex flex-wrap gap-x-5 gap-y-2 bg-zinc-50/60 dark:bg-zinc-800/30">
          {(['Low', 'Medium', 'High', 'Very High'] as CrowdStatus[]).map((s) => {
            const st = CARD_STYLES[s];
            return (
              <div key={s} className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <span className={`w-2.5 h-2.5 rounded-full ${st.badgeBg}`} />
                <span className="font-medium">{st.labelKo}</span>
                <span className="text-zinc-400">({s === 'Low' ? '0–20' : s === 'Medium' ? '21–40' : s === 'High' ? '41–60' : '61+'}명)</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Car Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {selectedTrain.cars.map((car) => {
          const status = getCrowdStatus(car.passengers);
          const s = CARD_STYLES[status];
          const pct = Math.min((car.passengers / 80) * 100, 100);

          return (
            <div
              key={car.carNumber}
              className={`relative rounded-2xl border-2 p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${s.cardBg} ${s.cardBorder}`}
            >
              {/* Top: car number + status badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">{car.carNumber}호차</span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${s.badgeBg} ${s.badgeText}`}>
                  {s.labelKo}
                </span>
              </div>

              {/* Passenger count */}
              <div className="flex flex-col items-center py-2">
                <span className={`text-4xl font-black leading-none ${s.countColor}`}>
                  {car.passengers}
                </span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1 font-medium">명 탑승중</span>
              </div>

              {/* Progress bar */}
              <div className={`w-full h-2 rounded-full overflow-hidden ${s.barBg}`}>
                <div
                  className={`h-full rounded-full transition-all duration-700 ${s.barFill}`}
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* Icon */}
              <div className={`flex justify-center ${s.iconColor}`}>
                <CrowdIcon status={status} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
