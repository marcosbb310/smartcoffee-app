export interface PeakHour {
  id: string;
  startTime: string;
  endTime: string;
  multiplier: number;
  label?: string;
}

export interface DayPeakHours {
  day: string;
  enabled: boolean;
  peakHours: PeakHour[];
  defaultMultiplier?: number;
}

export interface PeakHourSettings {
  days: DayPeakHours[];
  globalMultiplier: number;
}

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday', 
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
] as const;

export type DayOfWeek = typeof DAYS_OF_WEEK[number];
