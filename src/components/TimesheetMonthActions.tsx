import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack } from '@mui/material';
import { CalendarDay } from '../types/timesheet';

interface Props {
    days: CalendarDay[];
    setDays: React.Dispatch<React.SetStateAction<CalendarDay[]>>;
    months: Number;
    years: Number;
}

const TimesheetMonthActions: React.FC<Props> = ({ days, setDays, months, years }) => {
  const [open, setOpen] = useState(false);
  const [projectCode, setProjectCode] = useState('');
  const [hours, setHours] = useState(8);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePopulate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    setDays(prevDays => {
      const filtered = prevDays.filter(
        d =>
          !(new Date(d.date).getFullYear() === year &&
            new Date(d.date).getMonth() === month)
      );
      const populated = Array.from({ length: daysInMonth }, (_, i) => ({
        date: new Date(year, month, i + 1),
        entries: [{ projectCode, hours }],
      }));
      return [...filtered, ...populated];
    });
    setOpen(false);
  };

  const handleClear = () => {
    setDays(prevDays =>
      prevDays.filter(
        d =>
          !(new Date(d.date).getFullYear() === years &&
            new Date(d.date).getMonth() === months)
      )
    );
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Auto Populate Month
      </Button>
      <Button variant="outlined" color="error" onClick={handleClear}>
        Clear Month
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Auto Populate Month</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Project Code"
              value={projectCode}
              onChange={e => setProjectCode(e.target.value)}
              fullWidth
            />
            <TextField
              label="Hours per Day"
              type="number"
              value={hours}
              onChange={e => setHours(Number(e.target.value))}
              inputProps={{ min: 1, max: 24 }}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handlePopulate}
            variant="contained"
            disabled={!projectCode || hours <= 0}
          >
            Populate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimesheetMonthActions;