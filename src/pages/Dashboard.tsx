import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Stack,
  Divider,
} from '@mui/material';
import MonthlyHoursBarChart from '../components/MonthlyHoursBarChart';
import { CalendarDay } from '../types/timesheet';
import { mockTimesheets } from '../mocks/timesheets';

// --- MOCK DATA PROCESSING ---
const getMonthlyChartData = (days: CalendarDay[]) => {
  const grouped: { [month: string]: number } = {};
  days.forEach(d => {
    const date = new Date(d.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    grouped[key] = (grouped[key] || 0) + d.hours;
  });
  return Object.entries(grouped).map(([month, hours]) => ({
    month,
    hours,
  }));
};

const getSummary = (days: CalendarDay[]) => {
  const totalHours = days.reduce((sum, d) => sum + d.hours, 0);
  const daysWithEntries = days.length;
  const avgHours = daysWithEntries ? (totalHours / daysWithEntries) : 0;
  const overtime = days.filter(d => d.hours > 8).reduce((sum, d) => sum + (d.hours - 8), 0);
  return { totalHours, avgHours, overtime };
};

const Dashboard: React.FC = () => {
  const chartData = getMonthlyChartData(mockTimesheets);
  const recentEntries = [...mockTimesheets]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  const { totalHours, avgHours, overtime } = getSummary(mockTimesheets);

  return (
    <Box
      sx={{
        width: '100%',
        mx: 'auto',
        mt: 4,
        mb: 1,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          background: 'rgba(255,255,255,0.95)',
        }}
      >
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700 }}>
          Dashboard Overview
        </Typography>

        {/* Summary Cards */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }} justifyContent="center">
          <Card sx={{ flex: 1, bgcolor: '#1976d2', color: '#fff', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle1">Total Hours</Typography>
              <Typography variant="h4" fontWeight={700}>{totalHours}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, bgcolor: '#43a047', color: '#fff', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle1">Average Daily Hours</Typography>
              <Typography variant="h4" fontWeight={700}>{avgHours.toFixed(2)}</Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1, bgcolor: '#fbc02d', color: '#fff', borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle1">Overtime Hours</Typography>
              <Typography variant="h4" fontWeight={700}>{overtime}</Typography>
            </CardContent>
          </Card>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        {/* Monthly Hours Bar Chart */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Monthly Hours Overview
          </Typography>
          <MonthlyHoursBarChart data={chartData} />
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Recent Entries Table */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Recent Timesheet Entries
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentEntries.map((entry, idx) => (
                <TableRow key={idx}>
                  <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                  <TableCell>{entry.task}</TableCell>
                  <TableCell>{entry.hours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;