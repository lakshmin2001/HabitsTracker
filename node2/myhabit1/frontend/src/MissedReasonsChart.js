import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const MissedReasonsChart = ({ habits }) => {
  const reasonsMap = {};

  // Collect reasons for all missed habits
  habits.forEach((habit) => {
    habit.days.forEach((day) => {
      if (day?.status === 'missed' && day.comment) {
        reasonsMap[day.comment] = (reasonsMap[day.comment] || 0) + 1;
      }
    });
  });

  const reasonsData = Object.entries(reasonsMap).map(([reason, count]) => ({ reason, count }));

  return (
    <div>
      <h2>Missed Habit Reasons</h2>
      <BarChart width={400} height={260} data={reasonsData}>
        <XAxis dataKey="reason" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Bar dataKey="count" fill="#f44336" />
      </BarChart>
    </div>
  );
};

export default MissedReasonsChart;
