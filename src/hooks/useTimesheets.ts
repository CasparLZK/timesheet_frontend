import { useQuery } from '@tanstack/react-query';
// import { getTimesheets } from '../services/timesheetService';
// import { Timesheet } from '../types/timesheet';
import { mockTimesheets } from '../mocks/timesheets';

// export const useTimesheets = () => {
//   return useQuery<Timesheet[], Error>({
//     queryKey: ['timesheets'],
//     queryFn: getTimesheets,
//   });
// };

// Mock implementation for demonstration purposes
export const useTimesheets = () => {
  return useQuery({
  queryKey: ['timesheets'],
  queryFn: () => Promise.resolve(mockTimesheets), // or your axios fetch call
  });
};
