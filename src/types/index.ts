export interface Car {
  carNumber: number;
  passengers: number;
}

export interface Train {
  id: string; // e.g. "bundang_train_1", "line2_train_a"
  name: string; // e.g. "Train A", "Train B", "Train C"
  route: string; // e.g. "Line 1", "Line 2", "Bundang Line", "Suin-Bundang"
  cars: Car[];
}

export type CrowdStatus = 'Low' | 'Medium' | 'High' | 'Very High';

export interface Route {
  id: string; // e.g. "line1", "line2", "bundang", "suin_bundang"
  name: string; // e.g. "Line 1", "Line 2", "Bundang Line", "Suin-Bundang"
}

export const getCrowdStatus = (passengers: number): CrowdStatus => {
  if (passengers <= 20) return 'Low';
  if (passengers <= 40) return 'Medium';
  if (passengers <= 60) return 'High';
  return 'Very High';
};

export const getCrowdColorClass = (status: CrowdStatus): { bg: string; text: string; border: string; rawHex: string } => {
  switch (status) {
    case 'Low':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/20',
        text: 'text-emerald-700 dark:text-emerald-400',
        border: 'border-emerald-200 dark:border-emerald-800/40',
        rawHex: '#10b981', // green
      };
    case 'Medium':
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/20',
        text: 'text-amber-700 dark:text-amber-400',
        border: 'border-amber-200 dark:border-amber-800/40',
        rawHex: '#f59e0b', // yellow
      };
    case 'High':
      return {
        bg: 'bg-orange-50 dark:bg-orange-950/20',
        text: 'text-orange-700 dark:text-orange-400',
        border: 'border-orange-200 dark:border-orange-800/40',
        rawHex: '#f97316', // orange
      };
    case 'Very High':
      return {
        bg: 'bg-red-50 dark:bg-red-950/20',
        text: 'text-red-700 dark:text-red-400',
        border: 'border-red-200 dark:border-red-800/40',
        rawHex: '#ef4444', // red
      };
  }
};
