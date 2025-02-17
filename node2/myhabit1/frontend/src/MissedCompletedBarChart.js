// MissedCompletedBarChart.js
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MissedCompletedBarChart = ({ habits }) => {
  // Prepare the data for the chart
  const chartData = useMemo(() => {
    return habits.map((habit) => {
      let completed = 0;
      let missed = 0;

      habit.days.forEach((day) => {
        if (day?.status === 'completed') completed++;
        if (day?.status === 'missed') missed++;
      });

      return {
        name: habit.name,
        Completed: completed,
        Missed: missed,
      };
    });
  }, [habits]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Missed vs. Completed Days</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Completed" stackId="a" fill="#4caf50" />
          <Bar dataKey="Missed" stackId="a" fill="#f44336" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MissedCompletedBarChart;
