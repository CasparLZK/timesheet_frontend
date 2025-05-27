import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { CalendarDay } from '../types/timesheet';
import { EventClickArg } from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

interface Props {
  days: CalendarDay[];
  onUpdate: (updatedDay: CalendarDay) => void;
}

const TimesheetCalendar: React.FC<Props> = ({ days, onUpdate }) => {
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [editTask, setEditTask] = useState('');
  const [editHours, setEditHours] = useState<number | ''>('');

  // Convert CalendarDay[] to FullCalendar event format
  const events = days.map((d) => ({
    title: `${d.task} ${d.hours ? `(${d.hours} hrs)` : ''}`,
    date: d.date.toLocaleDateString('en-CA'), // 'YYYY-MM-DD' in local time
    extendedProps: d,
  }));

  const handleDateClick = (arg: DateClickArg) => {
    console.log('Date clicked:');
  const date = arg.date;
  const day = days.find((d) => d.date.toDateString() === date.toDateString()) || { date, hours: 0, task: '' };
  setSelectedDay(day);
  setEditTask(day.task || '');
  setEditHours(day.hours ?? 0);
};

  const handleEventClick = (arg: EventClickArg) => {
    const d = arg.event.extendedProps as CalendarDay;
    setSelectedDay(d);
    setEditTask(d.task || '');
    setEditHours(d.hours ?? 0);
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
        <FullCalendar
          plugins={[interactionPlugin, dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          selectable={true}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
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