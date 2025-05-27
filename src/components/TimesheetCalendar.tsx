import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton, Stack } from '@mui/material';
import { CalendarDay, TimesheetEntry } from '../types/timesheet';
import { EventClickArg } from '@fullcalendar/core';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import DeleteIcon from '@mui/icons-material/Delete';
import { setMonth } from 'date-fns';

interface Props {
  days: CalendarDay[];
  onUpdate: (updatedDay: CalendarDay) => void;
  onSetMonths: (months: number) => void;
  onSetYears: (years: number) => void;
}

const TimesheetCalendar: React.FC<Props> = ({ days, onUpdate, onSetMonths, onSetYears }) => {
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [editEntries, setEditEntries] = useState<TimesheetEntry[]>([]);

  // Flatten all entries for FullCalendar events
  const events = days.flatMap((d) =>
    d.entries.map((entry, idx) => ({
      title: `${entry.projectCode} (${entry.hours} hrs)`,
      date: d.date.toLocaleDateString('en-CA'),
      extendedProps: { ...entry, date: d.date, entryIndex: idx },
    }))
  );

  const handleDateClick = (arg: DateClickArg) => {
    const date = arg.date;
    const day = days.find((d) => d.date.toDateString() === date.toDateString());
    setSelectedDay(day ? { ...day } : { date, entries: [] });
    setEditEntries(day ? [...day.entries] : []);
  };

  const handleEventClick = (arg: EventClickArg) => {
    const date = new Date(arg.event.start!);
    const day = days.find((d) => d.date.toDateString() === date.toDateString());
    setSelectedDay(day ? { ...day } : { date, entries: [] });
    setEditEntries(day ? [...day.entries] : []);
  };

  const closeDialog = () => setSelectedDay(null);

  const handleEntryChange = (idx: number, field: keyof TimesheetEntry, value: string | number) => {
    setEditEntries((prev) =>
      prev.map((entry, i) =>
        i === idx ? { ...entry, [field]: field === 'hours' ? Number(value) : value } : entry
      )
    );
  };

  const handleAddEntry = () => {
    setEditEntries((prev) => [...prev, { projectCode: '', hours: 0 }]);
  };

  const handleRemoveEntry = (idx: number) => {
    setEditEntries((prev) => prev.filter((_, i) => i !== idx));
  };

  const saveChanges = () => {
    if (!selectedDay) return;
    onUpdate({
      ...selectedDay,
      entries: editEntries.filter(e => e.projectCode.trim() !== '' && e.hours > 0),
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
          dayMaxEventRows={3} // <-- Add this line (or adjust the number as needed)
          fixedWeekCount={true}
          datesSet={arg => {
            // This is the actual month being displayed in the calendar header
            const displayedMonth = arg.view.currentStart.getMonth(); // 0 = Jan, 3 = April
            const displayedYear = arg.view.currentStart.getFullYear();
            console.log('Displayed month:', displayedMonth + 1, 'Year:', displayedYear);
            onSetMonths(displayedMonth);
            onSetYears(displayedYear);
          }}
        />
      </Box>

      <Dialog open={!!selectedDay} onClose={closeDialog} maxWidth="xs" fullWidth>
        <DialogTitle>
          Edit Timesheet{selectedDay ? ` - ${selectedDay.date.toDateString()}` : ''}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {editEntries.map((entry, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TextField
                  label="projectCode"
                  value={entry.projectCode}
                  onChange={e => handleEntryChange(idx, 'projectCode', e.target.value)}
                  sx={{ flex: 2, marginTop: 2 }}
                  size="small"
                />
                <TextField
                  label="Hours"
                  type="number"
                  value={entry.hours}
                  onChange={e => handleEntryChange(idx, 'hours', e.target.value === '' ? 0 : Number(e.target.value))}
                  sx={{ width: 90, marginTop: 2 }}
                  size="small"
                />
                <IconButton onClick={() => handleRemoveEntry(idx)} color="error" size="small">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={handleAddEntry} variant="outlined" sx={{ mt: 1 }}>
              Add Entry
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button
            onClick={saveChanges}
            variant="contained"
            disabled={editEntries.length === 0 || editEntries.some(e => e.projectCode.trim() === '' || e.hours <= 0)}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TimesheetCalendar;