import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompletionRateChart from './CompletionRateChart';
import MissedCompletedBarChart from './MissedCompletedBarChart';
import DailyTrendsLineChart from './DailyTrendsLineChart';
import MissedReasonsChart from './MissedReasonsChart';
import SideNavbar from './SideNavbar';
import TotalBoxes from './TotalBoxes';
import AddHabitInput from './AddHabitInput';

const HabitTrackerContainer = () => {
  const [habits, setHabits] = useState([]);
  const [aprilComponent, setAprilComponent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/habits')
      .then((response) => setHabits(response.data))
      .catch((error) => console.error('Error fetching habits:', error));
  }, []);

  const handleAddHabit = (newHabitName) => {
    if (newHabitName.trim()) {
      axios.post('http://localhost:5000/api/habits', { name: newHabitName })
        .then((response) => {
          setHabits([...habits, response.data]);
        })
        .catch((error) => console.error('Error adding habit:', error));
    }
  };

  const handleDeleteHabit = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this habit?');
    if (confirmed) {
      axios.delete(`http://localhost:5000/api/habits/${id}`)
        .then(() => setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id)))
        .catch((error) => console.error('Error deleting habit:', error));
    }
  };

  const handleMonthClick = async (month) => {
    if (month === 'April') {
      const { default: AprilHabitTracker } = await import('./AprilHabitTracker'); // Dynamic import
      setAprilComponent(<AprilHabitTracker />);
    } else {
      setAprilComponent(null);
    }
  };

  const handleSingleClick = (id, dayIndex) => {
    const habit = habits.find((h) => h.id === id);
    const status = habit.days[dayIndex]?.status === 'completed' ? null : 'completed';
    axios.put(`http://localhost:5000/api/habits/${id}`, { dayIndex, status })
      .then((response) => setHabits(habits.map((habit) => habit.id === id ? response.data : habit)))
      .catch((error) => console.error('Error updating habit:', error));
  };

  const handleDoubleClick = async (id, dayIndex) => {
    const comment = window.prompt('Why did you miss this habit?');
    const status = 'missed';
    axios.put(`http://localhost:5000/api/habits/${id}`, { dayIndex, status, comment })
      .then((response) => setHabits(habits.map((habit) => habit.id === id ? response.data : habit)))
      .catch((error) => console.error('Error updating habit:', error));
  };

  const handleExportToCSV = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/convert-to-csv', { habits }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'habits.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      alert('Failed to export data to CSV.');
    }
  };

  return (
    <div>
      <SideNavbar onMonthClick={handleMonthClick} />
      <h1>Habit Tracker</h1>

      {aprilComponent}

      <AddHabitInput handleAddHabit={handleAddHabit} />

      <TotalBoxes
        habits={habits}
        handleSingleClick={handleSingleClick}
        handleDoubleClick={handleDoubleClick}
        handleDeleteHabit={handleDeleteHabit}
      />

      <button className="save-button" onClick={handleExportToCSV}>Export to CSV</button>
      <div className="chart-section">
        <CompletionRateChart habits={habits} />
        <MissedCompletedBarChart habits={habits} />
      </div>
      <div className="chart-section2">
        <DailyTrendsLineChart habits={habits} />
        <MissedReasonsChart habits={habits} />
      </div>
    </div>
  );
};

export default HabitTrackerContainer;
