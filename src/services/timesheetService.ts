import api from './api';
import { CalendarDay } from '../types/timesheet';

export const getTimesheets = async (): Promise<CalendarDay[]> => {
  const response = await api.get('/timesheets');
  return response.data;
};
