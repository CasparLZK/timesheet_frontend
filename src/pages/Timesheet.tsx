import React, { useState, useEffect } from 'react';
import TimesheetCalendar from '../components/TimesheetCalendar';
import { CalendarDay } from '../types/timesheet';
import { mockTimesheets } from '../mocks/timesheets';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Typography } from '@mui/material';

// Helper: generate mock data for 1 month (e.g. May 2025)
const generateMockMonthDays = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    date: new Date(year, month, i + 1),
    hours: Math.floor(Math.random() * 8),
    task: i % 3 === 0 ? 'Feature dev' : i % 3 === 1 ? 'Bug fix' : 'Code review',
  }));
};

const TimesheetPage = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(4); // 0-based: 4 = May
  const [days, setDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    setDays(
      mockTimesheets.filter(
        (day) =>
          day.date.getFullYear() === year &&
          day.date.getMonth() === month
      )
    );
  }, [year, month]);

  const handleUpdate = (updatedDay: CalendarDay) => {
  setDays(prevDays => {
    const exists = prevDays.some(
      day => day.date.toDateString() === updatedDay.date.toDateString()
    );
    if (exists) {
      // Update existing day
      return prevDays.map(day =>
        day.date.toDateString() === updatedDay.date.toDateString()
          ? { ...day, ...updatedDay }
          : day
      );
    } else {
      // Add new day
      return [...prevDays, updatedDay];
    }
  });
};

  const handlePrev = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  
  return (
    <div style={{ maxWidth: '100%', margin: '2rem auto' }}>
    <Typography variant="h4" gutterBottom>
      Timesheet Entry
    </Typography>
    <TimesheetCalendar days={days} onUpdate={handleUpdate} />
    <Button
      variant="contained"
      color="primary"
      sx={{
        // position: 'absolute',
        left: '45%',
        width: 100,
      }}
    >
      Submit
    </Button>
    </div>
  );
};

export default TimesheetPage;