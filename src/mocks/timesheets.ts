import { CalendarDay } from '../types/timesheet';

export const mockTimesheets: CalendarDay[] = [
  // April 2024
  { date: new Date(2024, 3, 2), hours: 4, task: 'Feature dev' },
  { date: new Date(2024, 3, 3), hours: 6, task: 'Bug fix' },
  { date: new Date(2024, 3, 7), hours: 5, task: 'Code review' },

  // May 2024 (gaps between days)
  { date: new Date(2024, 4, 1), hours: 3, task: 'Feature dev' },
  { date: new Date(2024, 4, 5), hours: 7, task: 'Bug fix' },
  { date: new Date(2024, 4, 15), hours: 2, task: 'Code review' },

  // December 2024
  { date: new Date(2024, 11, 10), hours: 8, task: 'Feature dev' },
  { date: new Date(2024, 11, 11), hours: 4, task: 'Bug fix' },

  // January 2025
  { date: new Date(2025, 0, 2), hours: 6, task: 'Feature dev' },
  { date: new Date(2025, 0, 20), hours: 5, task: 'Code review' },

  // May 2025 (as before, but with some gaps)
  { date: new Date(2025, 4, 4), hours: 2, task: 'Feature dev' },
  { date: new Date(2025, 4, 3), hours: 7, task: 'Code review' },
  { date: new Date(2025, 4, 7), hours: 8, task: 'Feature dev' },
  { date: new Date(2025, 4, 10), hours: 3, task: 'Feature dev' },
  { date: new Date(2025, 4, 15), hours: 8, task: 'Code review' },
  { date: new Date(2025, 4, 20), hours: 2, task: 'Bug fix' },
  { date: new Date(2025, 4, 25), hours: 4, task: 'Feature dev' },
  { date: new Date(2025, 4, 30), hours: 8, task: 'Feature dev' },

  // June 2025 (single entry)
  { date: new Date(2025, 5, 12), hours: 5, task: 'Bug fix' },
];