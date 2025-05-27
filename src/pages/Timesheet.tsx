import React, { useState, useEffect } from 'react';
import TimesheetCalendar from '../components/TimesheetCalendar';
import { CalendarDay } from '../types/timesheet';
import { mockTimesheets } from '../mocks/timesheets';
import { Button, Typography, Paper, Box } from '@mui/material';

const TimesheetPage = () => {
  const [days, setDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    setDays(mockTimesheets);
  }, []);

  const handleUpdate = (updatedDay: CalendarDay) => {
    setDays(prevDays => {
      const updatedDateStr = new Date(updatedDay.date).toDateString();
      const filtered = prevDays.filter(
        day => new Date(day.date).toDateString() !== updatedDateStr
      );
      return [...filtered, { ...updatedDay, date: new Date(updatedDay.date) }];
    });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: '100%',
        maxWidth: 900,
        mt: 4,
        p: { xs: 2, sm: 4 },
        borderRadius: 4,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        background: 'rgba(255,255,255,0.95)',
      }}
    >
      <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700 }}>
        Timesheet Entry
      </Typography>
      <Box sx={{ mb: 3 }}>
        <TimesheetCalendar days={days} onUpdate={handleUpdate} />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          sx={{ width: 120 }}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default TimesheetPage;