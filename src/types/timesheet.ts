export interface TimesheetEntry {
  projectCode: string;
  hours: number;
}

export interface CalendarDay {
  date: Date;
  entries: TimesheetEntry[];
}