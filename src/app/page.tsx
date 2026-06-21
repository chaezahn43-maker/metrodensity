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
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-200">
        {/* Navigation / Header */}
        <Header />
        
        {/* Main Content Layout */}
        <main className="max-w-4xl mx-auto py-8 px-4 md:px-6 space-y-6">
          {/* Instructions Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-md shadow-blue-500/10">
            <h2 className="text-lg font-bold mb-1">Commute smarter, commute emptier.</h2>
            <p className="text-sm text-blue-100 font-medium">
              Select your line and train below to view real-time density. Help your fellow commuters by checking in to your current car.
            </p>
          </div>

          {/* Section 1: Route & Train Selection */}
          <div className="grid grid-cols-1 gap-6">
            <RouteSelector />
            <TrainSelector />
          </div>

          {/* Section 2: Congestion Dashboard */}
          <Dashboard />

          {/* Section 3: Register Current Car */}
          <RegisterCar />
        </main>

        {/* Footer */}
        <footer className="w-full text-center py-8 text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-900 mt-12">
          <div className="max-w-4xl mx-auto px-4">
            <p className="font-semibold text-zinc-500 dark:text-zinc-400">Metro Density MVP</p>
            <p className="mt-1">Real-time crowd monitoring inspired by public transportation dashboards.</p>
          </div>
        </footer>
      </div>
    </TrainProvider>
  );
}
