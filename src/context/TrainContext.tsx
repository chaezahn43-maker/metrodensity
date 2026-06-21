'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Route, Train, Car } from '../types';

interface TrainContextType {
  routes: Route[];
  trains: Train[];
  selectedRouteId: string;
  setSelectedRouteId: (id: string) => void;
  selectedTrainId: string;
  setSelectedTrainId: (id: string) => void;
  selectedTrain: Train | null;
  registerPassenger: (trainId: string, carNumber: number) => void;
  resetToMockData: () => void;
}

const DEFAULT_ROUTES: Route[] = [
  { id: 'line-1', name: 'Line 1' },
  { id: 'line-2', name: 'Line 2' },
  { id: 'bundang', name: 'Bundang Line' },
  { id: 'suin-bundang', name: 'Suin-Bundang Line' },
];

const generateInitialTrains = (): Train[] => {
  const trains: Train[] = [];
  const trainNames = ['Train A', 'Train B', 'Train C'];

  DEFAULT_ROUTES.forEach((route) => {
    trainNames.forEach((name, index) => {
      const trainId = `${route.id}_train_${String.fromCharCode(65 + index).toLowerCase()}`;
      
      const cars: Car[] = Array.from({ length: 6 }, (_, carIdx) => {
        const carNumber = carIdx + 1;
        // Generate passenger counts across categories (Low, Medium, High, Very High)
        let passengers = 12;
        if (carIdx === 0) passengers = 12 + index * 4;       // Low (12, 16, 20)
        else if (carIdx === 1) passengers = 25 + index * 5;  // Medium (25, 30, 35)
        else if (carIdx === 2) passengers = 42 - index * 3;  // High/Medium (42, 39, 36)
        else if (carIdx === 3) passengers = 8 + index * 2;   // Low (8, 10, 12)
        else if (carIdx === 4) passengers = 65 - index * 6;  // Very High/High (65, 59, 53)
        else passengers = 18 + index * 6;                    // Low/Medium (18, 24, 30)
        
        return { carNumber, passengers };
      });

      trains.push({
        id: trainId,
        name,
        route: route.name,
        cars,
      });
    });
  });

  return trains;
};

const TrainContext = createContext<TrainContextType | undefined>(undefined);

export const TrainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>('line-1');
  const [selectedTrainId, setSelectedTrainId] = useState<string>('');

  // Hydrate state from localStorage or initialize with mock data on mount
  useEffect(() => {
    const stored = localStorage.getItem('metro_density_trains');
    if (stored) {
      try {
        setTrains(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored trains, resetting...', e);
        const initial = generateInitialTrains();
        setTrains(initial);
        localStorage.setItem('metro_density_trains', JSON.stringify(initial));
      }
    } else {
      const initial = generateInitialTrains();
      setTrains(initial);
      localStorage.setItem('metro_density_trains', JSON.stringify(initial));
    }
  }, []);

  // When selected route changes, set selected train to the first train of that route
  useEffect(() => {
    if (selectedRouteId && trains.length > 0) {
      const routeObj = DEFAULT_ROUTES.find((r) => r.id === selectedRouteId);
      if (routeObj) {
        const routeTrains = trains.filter((t) => t.route === routeObj.name);
        if (routeTrains.length > 0) {
          // If we already have a selected train on this route, keep it, otherwise select the first one
          const currentSelected = routeTrains.find((t) => t.id === selectedTrainId);
          if (!currentSelected) {
            setSelectedTrainId(routeTrains[0].id);
          }
        }
      }
    }
  }, [selectedRouteId, trains, selectedTrainId]);

  // Register passenger (Increment by 1)
  const registerPassenger = (trainId: string, carNumber: number) => {
    setTrains((prevTrains) => {
      const updatedTrains = prevTrains.map((train) => {
        if (train.id === trainId) {
          const updatedCars = train.cars.map((car) => {
            if (car.carNumber === carNumber) {
              return { ...car, passengers: car.passengers + 1 };
            }
            return car;
          });
          return { ...train, cars: updatedCars };
        }
        return train;
      });
      localStorage.setItem('metro_density_trains', JSON.stringify(updatedTrains));
      return updatedTrains;
    });
  };

  // Reset helper
  const resetToMockData = () => {
    const initial = generateInitialTrains();
    setTrains(initial);
    localStorage.setItem('metro_density_trains', JSON.stringify(initial));
    // Select Train A of current route
    const routeObj = DEFAULT_ROUTES.find((r) => r.id === selectedRouteId);
    if (routeObj) {
      const routeTrains = initial.filter((t) => t.route === routeObj.name);
      if (routeTrains.length > 0) {
        setSelectedTrainId(routeTrains[0].id);
      }
    }
  };

  // Find currently active train
  const selectedTrain = trains.find((t) => t.id === selectedTrainId) || null;

  return (
    <TrainContext.Provider
      value={{
        routes: DEFAULT_ROUTES,
        trains,
        selectedRouteId,
        setSelectedRouteId,
        selectedTrainId,
        setSelectedTrainId,
        selectedTrain,
        registerPassenger,
        resetToMockData,
      }}
    >
      {children}
    </TrainContext.Provider>
  );
};

export const useTrain = () => {
  const context = useContext(TrainContext);
  if (context === undefined) {
    throw new Error('useTrain must be used within a TrainProvider');
  }
  return context;
};
