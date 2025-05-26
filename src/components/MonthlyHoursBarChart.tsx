import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  month: string;
  hours: number;
}

interface Props {
  data: ChartData[];
}

const MonthlyHoursBarChart: React.FC<Props> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="hours" fill="#007bff" />
    </BarChart>
  </ResponsiveContainer>
);

export default MonthlyHoursBarChart;