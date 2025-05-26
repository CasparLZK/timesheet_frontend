import React from 'react';
import {
  Table, TableHead, TableBody, TableRow, TableCell, Paper, TableContainer,
} from '@mui/material';

interface Entry {
  id: number;
  date: string;
  task: string;
  hours: number;
}

const RecentEntriesTable: React.FC<{ data: Entry[] }> = ({ data }) => (
  <TableContainer component={Paper} elevation={2}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Task</TableCell>
          <TableCell>Hours</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ id, date, task, hours }) => (
          <TableRow key={id}>
            <TableCell>{date}</TableCell>
            <TableCell>{task}</TableCell>
            <TableCell>{hours}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default RecentEntriesTable;
