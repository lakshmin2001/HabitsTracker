import React from 'react';

const JuneHabitTracker = ({ habits, handleSingleClick, handleDoubleClick, handleDeleteHabit }) => {
  const startDay = 150; // June starts from the 151st day (0-indexed)
  const endDay = 180;

  // Filter the habits for June
  const juneHabits = habits.map((habit) => ({
    ...habit,
    days: habit.days.slice(startDay, endDay),
  }));

  return (
    <div>
      <h2>Habit Tracker - June</h2>
      <table>
        <thead>
          <tr>
            <th>Habit</th>
            {Array.from({ length: 30 }, (_, i) => (
              <th key={i}>{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {juneHabits.map((habit) => (
            <tr key={habit.id}>
              <td
                className="habit-name"
                onClick={() => handleDeleteHabit(habit.id)}
              >
                {habit.name}
              </td>
              {habit.days.map((day, dayIndex) => (
                <td key={dayIndex}>
                  <div
                    className={`day-box ${
                      day?.status === 'completed' ? 'completed' : day?.status === 'missed' ? 'missed' : ''
                    }`}
                    onClick={() => handleSingleClick(habit.id, dayIndex)}
                    onDoubleClick={() => handleDoubleClick(habit.id, dayIndex)}
                  >
                    {day?.status === 'completed' ? '✓' : day?.status === 'missed' ? 'X' : ''}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JuneHabitTracker;
