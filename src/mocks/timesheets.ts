import { CalendarDay } from '../types/timesheet';

const projectCodes = [
  'PRJ-1001',
  'PRJ-1002',
  'PRJ-1003',
  'PRJ-1004',
  'PRJ-1005',
  'PRJ-1006',
  'PRJ-1007',
  'PRJ-1008',
  'PRJ-1009',
  'PRJ-1010',
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomEntries(): { projectCode: string; hours: number }[] {
  const entryCount = getRandomInt(1, 3); // 1-3 entries per day
  const usedCodes = new Set<string>();
  const entries = [];
  for (let i = 0; i < entryCount; i++) {
    let code: string;
    do {
      code = projectCodes[getRandomInt(0, projectCodes.length - 1)];
    } while (usedCodes.has(code));
    usedCodes.add(code);
    entries.push({
      projectCode: code,
      hours: getRandomInt(1, 8),
    });
  }
  return entries;
}

const mockTimesheets: CalendarDay[] = [];

for (let year = 2023; year <= 2025; year++) {
  for (let month = 0; month < 12; month++) {
    // Ensure at least 10 entries per month
    for (let i = 0; i < 10; i++) {
      // Pick a random day in the month (1-28 to avoid invalid dates)
      const day = getRandomInt(1, 28);
      mockTimesheets.push({
        date: new Date(year, month, day),
        entries: getRandomEntries(),
      });
    }
  }
}

export { mockTimesheets };