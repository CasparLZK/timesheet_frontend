import React, { useMemo } from 'react';
import { useTimesheets } from '../hooks/useTimesheets';
import { format } from 'date-fns';
import MonthlyHoursBarChart from '../components/MonthlyHoursBarChart';
import { Box, Typography, Button } from '@mui/material';

const Dashboard: React.FC = () => {
  const { data, isLoading, isError, error, refetch, isFetching } = useTimesheets();

  const chartData = useMemo(
  () =>
    Object.entries(
      data?.reduce<Record<string, number>>((acc, entry) => {
        // entry.date is already a Date object
        const month = format(entry.date, 'yyyy-MM');
        acc[month] = (acc[month] || 0) + entry.hours;
        return acc;
      }, {}) || {}
    ).map(([month, hours]) => ({ month, hours })),
  [data]
);

  if (isLoading) return <Typography>Loading timesheets...</Typography>;
  if (isError) return <Typography color="error">Error: {(error as Error).message}</Typography>;

  return (
    <Box maxWidth={800} mx="auto" my={4} px={2}>
      <Typography variant="h4" gutterBottom>
        Timesheet Dashboard
      </Typography>
      <Button
        variant="contained"
        onClick={() => refetch()}
        disabled={isFetching}
        sx={{ mb: 2 }}
        aria-label="Refresh timesheets"
      >
        {isFetching ? 'Refreshing...' : 'Refresh'}
      </Button>
      {chartData.length === 0 ? (
        <Typography>No timesheets found.</Typography>
      ) : (
        <MonthlyHoursBarChart data={chartData} />
      )}
    </Box>
  );
};

export default Dashboard;