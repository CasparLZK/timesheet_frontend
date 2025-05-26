import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { CalendarDay } from '../types/timesheet';

interface Props {
  days: CalendarDay[];
  onUpdate: (updatedDay: CalendarDay) => void;
}

const TimesheetCalendar: React.FC<Props> = ({ days, onUpdate }) => {
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [editTask, setEditTask] = useState('');
  const [editHours, setEditHours] = useState<number | ''>('');

  const findDay = (date: Date) =>
    days.find((d) => d.date.toDateString() === date.toDateString());

  const openEditDialog = (date: Date) => {
    const day = findDay(date) || { date, hours: 0, task: '' };
    setSelectedDay(day);
    setEditTask(day.task || '');
    setEditHours(day.hours ?? 0);
  };

  const closeDialog = () => setSelectedDay(null);

  const saveChanges = () => {
    if (!selectedDay) return;
    onUpdate({
      ...selectedDay,
      task: editTask.trim(),
      hours: editHours === '' ? 0 : Number(editHours),
    });
    closeDialog();
  };

  return (
    <>
      <Box sx={{ width: '100%', mx: 'auto', my: 3 }}>
        <Calendar
          tileContent={({ date, view }) => {
            if (view !== 'month') return null;
            const day = findDay(date);
            return (
              <Box sx={{ minHeight: 40 }}>
                <Typography variant="caption" color="textSecondary">
                  {day?.task || ''}
                </Typography>
                <div></div>
                <Typography variant="caption" color="textSecondary">
                  {day?.hours !== undefined ? `${day.hours} hrs` : ''}
                </Typography>
              </Box>
            );
          }}
          onClickDay={openEditDialog}
        />
      </Box>

      <Dialog open={!!selectedDay} onClose={closeDialog} maxWidth="xs" fullWidth>
        <DialogTitle>
          Edit Timesheet{selectedDay ? ` - ${selectedDay.date.toDateString()}` : ''}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Task"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            fullWidth
            margin="dense"
            autoFocus
          />
          <TextField
            label="Hours"
            type="number"
            inputProps={{ min: 0, max: 24, step: 0.5 }}
            value={editHours}
            onChange={(e) => setEditHours(e.target.value === '' ? '' : Number(e.target.value))}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button
            onClick={saveChanges}
            variant="contained"
            disabled={editTask.trim() === '' || editHours === ''}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TimesheetCalendar;