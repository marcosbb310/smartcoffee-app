/**
 * Time-related constants for the application
 */

export const TIME_FORMATS = {
  HOUR_24: 'HH:mm',
  HOUR_12: 'h:mm A',
  DATE_TIME: 'MM/dd/yyyy HH:mm',
  DATE_ONLY: 'MM/dd/yyyy'
} as const;

export const PEAK_HOUR_RANGES = {
  MORNING: { start: 7, end: 9 },
  LUNCH: { start: 12, end: 14 },
  EVENING: { start: 17, end: 19 }
} as const;

export const BUSINESS_HOURS = {
  OPEN: 6,
  CLOSE: 22
} as const;
