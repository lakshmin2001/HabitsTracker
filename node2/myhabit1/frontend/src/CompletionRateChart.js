// CompletionRateChart.js
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CompletionRateChart = ({ habits }) => {
  // Calculate completion data
  const completionData = useMemo(() => {
    let completed = 0;
    let missed = 0;
    let notAttempted = 0;

    habits.forEach((habit) => {
      habit.days.forEach((day) => {
        if (day?.status === 'completed') completed++;
        else if (day?.status === 'missed') missed++;
        else notAttempted++;
      });
    });

    return [
      { name: 'Completed', value: completed },
      { name: 'Missed', value: missed },
      { name: 'Not Attempted', value: notAttempted },
    ];
  }, [habits]);

  const COLORS = ['#4caf50', '#f44336', '#ccc']; // Colors for completed, missed, not attempted

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Overall Completion Rate</h2>
      <PieChart width={500} height={300}>
        <Pie
          data={completionData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {completionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CompletionRateChart;
