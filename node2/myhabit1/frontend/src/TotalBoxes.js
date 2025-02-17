import React from 'react';

const TotalBoxes = ({ habits = [], handleSingleClick, handleDoubleClick, handleDeleteHabit }) => {
  return (
    <div className="grid-container">
      {habits.length === 0 ? (
        <p>No habits to display</p> // Handle the case when habits is empty
      ) : (
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
            {habits.map((habit) => (
              <tr key={habit.id}>
                <td
                  className="habit-name"
                  onClick={() => handleDeleteHabit(habit.id)}
                  title="Click to delete this habit"
                >
                  {habit.name}
                </td>
                {habit.days && habit.days.length > 0 ? (
                  habit.days.map((day, dayIndex) => (
                    <td key={dayIndex}>
                      <div
                        className={`day-box ${
                          day?.status === 'completed' ? 'completed' : day?.status === 'missed' ? 'missed' : ''
                        }`}
                        onClick={() => handleSingleClick(habit.id, dayIndex)}
                        onDoubleClick={() => handleDoubleClick(habit.id, dayIndex)}
                        title={day?.comment || ''}
                      >
                        {day?.status === 'completed' ? '✓' : day?.status === 'missed' ? 'X' : ''}
                      </div>
                    </td>
                  ))
                ) : (
                  // Fallback when `days` is undefined or empty
                  Array.from({ length: 30 }, (_, dayIndex) => <td key={dayIndex}></td>)
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TotalBoxes;
