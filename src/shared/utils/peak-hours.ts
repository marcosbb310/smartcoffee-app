import { PeakHourSettings, DAYS_OF_WEEK } from '../../../lib/types/peak-hours';

/**
 * Check if the current time (or provided time) is within peak hours
 * @param time - Optional Date object, defaults to current time
 * @returns boolean indicating if it's peak hour
 */
export const isPeakHour = (time?: Date): boolean => {
  const hour = time ? time.getHours() : new Date().getHours();
  return hour >= 7 && hour <= 9 || hour >= 12 && hour <= 14 || hour >= 17 && hour <= 19;
};

/**
 * Get default peak hour settings for a product with all days disabled
 * @returns PeakHourSettings with all days disabled
 */
export const getDefaultPeakHourSettings = (): PeakHourSettings => ({
  days: DAYS_OF_WEEK.map(day => ({
    day,
    enabled: false,
    peakHours: []
  })),
  globalMultiplier: 1.15
});

/**
 * Initialize peak hour settings with default enabled days and peak hours
 * This is used for initial setup with Monday-Friday enabled
 * @returns PeakHourSettings with Monday-Friday enabled and default peak hours
 */
export const initializePeakHourSettings = (): PeakHourSettings => ({
  days: DAYS_OF_WEEK.map((day, index) => ({
    day,
    enabled: index < 5, // Monday-Friday enabled
    peakHours: index < 5 ? [
      {
        id: `morning-${day.toLowerCase()}`,
        startTime: "07:00",
        endTime: "09:00",
        multiplier: 1.15,
        label: "Morning Rush"
      },
      {
        id: `lunch-${day.toLowerCase()}`,
        startTime: "12:00",
        endTime: "14:00",
        multiplier: 1.20,
        label: "Lunch Rush"
      }
    ] : [],
    minPrice: index < 5 ? (index === 0 ? 1.50 : 1.25) : undefined,
    maxPrice: index < 5 ? (index === 4 ? 5.00 : 4.50) : undefined
  })),
  globalMultiplier: 1.15
});

/**
 * Initialize peak hour settings for POS with evening rush included
 * This includes morning, lunch, and evening rush hours
 * @returns PeakHourSettings with Monday-Friday enabled and all peak hours
 */
export const initializePOSPeakHourSettings = (): PeakHourSettings => ({
  days: DAYS_OF_WEEK.map((day, index) => ({
    day,
    enabled: index < 5, // Enable Monday-Friday by default
    peakHours: index < 5 ? [
      {
        id: `morning-${day.toLowerCase()}`,
        startTime: "07:00",
        endTime: "09:00",
        multiplier: 1.15,
        label: "Morning Rush"
      },
      {
        id: `lunch-${day.toLowerCase()}`,
        startTime: "12:00",
        endTime: "14:00",
        multiplier: 1.20,
        label: "Lunch Rush"
      },
      {
        id: `evening-${day.toLowerCase()}`,
        startTime: "17:00",
        endTime: "19:00",
        multiplier: 1.25,
        label: "Evening Rush"
      }
    ] : []
  })),
  globalMultiplier: 1.15
});
