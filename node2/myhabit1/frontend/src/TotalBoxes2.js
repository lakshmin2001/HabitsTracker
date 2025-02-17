import React from 'react';
import PropTypes from 'prop-types'; // For prop type validation
import './TotalBoxes2.css'; // Import CSS for styling

const TotalBoxes2 = ({ habits = [], handleSingleClick, handleDoubleClick, handleDeleteHabit }) => {
  return (
    <div className="grid-container">
      {habits.length === 0 ? (
        <p className="no-habits-message">No habits to display</p> // Handle the case when habits is empty
      ) : (
        <table className="habits-table">
          <thead>
            <tr>
              <th className="habit-header">Habit</th>
              {Array.from({ length: 31 }, (_, i) => (
                <th key={i} className="day-header">
                  {i + 1}
                </th> // Display days 1-31 for the month
              ))}
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id} className="habit-row">
                <td
                  className="habit-name"
                  onClick={() => handleDeleteHabit(habit.id)}
                  title="Click to delete this habit"
                  aria-label={`Delete habit: ${habit.name}`}
                >
                  {habit.name}
                </td>
                {habit.days && habit.days.length > 0 ? (
                  habit.days.map((day, dayIndex) => (
                    <td key={dayIndex} className="day-cell">
                      <div
                        className={`day-box ${
                          day?.status === 'completed'
                            ? 'completed'
                            : day?.status === 'missed'
                            ? 'missed'
                            : ''
                        }`}
                        onClick={() => handleSingleClick(habit.id, dayIndex)}
                        onDoubleClick={() => handleDoubleClick(habit.id, dayIndex)}
                        title={day?.comment || ''}
                        aria-label={`Day ${dayIndex + 1}: ${day?.status || 'Not marked'}`}
                      >
                        {day?.status === 'completed' ? '✓' : day?.status === 'missed' ? 'X' : ''}
                      </div>
                    </td>
                  ))
                ) : (
                  // Fallback when `days` is undefined or empty
                  Array.from({ length: 31 }, (_, dayIndex) => (
                    <td key={dayIndex} className="day-cell">
                      <div
                        className="day-box"
                        onClick={() => handleSingleClick(habit.id, dayIndex)}
                        onDoubleClick={() => handleDoubleClick(habit.id, dayIndex)}
                        aria-label={`Day ${dayIndex + 1}: Not marked`}
                      ></div>
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Prop type validation
TotalBoxes2.propTypes = {
  habits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      days: PropTypes.arrayOf(
        PropTypes.shape({
          status: PropTypes.oneOf(['completed', 'missed']),
          comment: PropTypes.string,
        })
      ),
    })
  ),
  handleSingleClick: PropTypes.func.isRequired,
  handleDoubleClick: PropTypes.func.isRequired,
  handleDeleteHabit: PropTypes.func.isRequired,
};

// Default props
TotalBoxes2.defaultProps = {
  habits: [],
};

export default TotalBoxes2;