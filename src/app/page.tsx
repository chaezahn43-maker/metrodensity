'use client';

import { TrainProvider } from '../context/TrainContext';
import { Header } from '../components/Header';
import { RouteSelector } from '../components/RouteSelector';
import { TrainSelector } from '../components/TrainSelector';
import { Dashboard } from '../components/Dashboard';
import { RegisterCar } from '../components/RegisterCar';

export default function Home() {
  return (
    <TrainProvider>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">

        {/* App Header */}
        <Header />

        <main className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-5">

          {/* Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white p-6 shadow-xl shadow-blue-500/20">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full border-[24px] border-white" />
              <div className="absolute -right-4 -bottom-10 w-24 h-24 rounded-full border-[16px] border-white" />
            </div>
            <div className="relative">
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-1">Metro Density</p>
              <h2 className="text-xl font-black leading-snug mb-1.5">
                빈 칸을 찾아<br className="sm:hidden" /> 쾌적하게 탑승하세요
              </h2>
              <p className="text-blue-100 text-sm font-medium">
                호선과 열차를 선택하면 칸별 혼잡도를 바로 확인할 수 있어요.
              </p>
              {/* Crowd indicator pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[
                  { label: '여유', color: 'bg-emerald-400', text: '0–20명' },
                  { label: '보통', color: 'bg-yellow-400', text: '21–40명' },
                  { label: '혼잡', color: 'bg-orange-400', text: '41–60명' },
                  { label: '매우혼잡', color: 'bg-red-400', text: '61+명' },
                ].map(({ label, color, text }) => (
                  <span key={label} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-xs font-semibold text-white">
                    <span className={`w-2 h-2 rounded-full ${color}`} />
                    {label} <span className="text-blue-200 font-normal">{text}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Route & Train selectors */}
          <RouteSelector />
          <TrainSelector />

          {/* Congestion dashboard */}
          <Dashboard />

          {/* Register car */}
          <RegisterCar />

        </main>

        {/* Footer */}
        <footer className="mt-10 py-6 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <div className="max-w-4xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 dark:text-zinc-500">
            <span className="font-bold text-zinc-500 dark:text-zinc-400">Metro Density MVP</span>
            <span>혼잡도 데이터는 크라우드소싱 방식으로 수집됩니다.</span>
          </div>
        </footer>

      </div>
    </TrainProvider>
  );
}
