import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const DailyTrendsLineChart = ({ habits }) => {
  // Aggregate data for each day across all habits
  const trends = Array(30).fill(0).map((_, day) => ({
    day: `Day ${day + 1}`,
    completed: habits.reduce((total, habit) => total + (habit.days[day]?.status === 'completed' ? 1 : 0), 0),
  }));

  return (
    <div>
      <h2>Daily Habit Trends</h2>
      <LineChart width={500} height={250} data={trends}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#ccc" />
        <Line type="monotone" dataKey="completed" stroke="#1a73e8" />
      </LineChart>
    </div>
  );
};

export default DailyTrendsLineChart;
