import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Add.css';
import CompletionRateChart from './CompletionRateChart';
import MissedCompletedBarChart from './MissedCompletedBarChart';
import DailyTrendsLineChart from './DailyTrendsLineChart';
import MissedReasonsChart from './MissedReasonsChart';
import SideNavbar from './SideNavbar';
import TotalBoxes2 from './TotalBoxes2';
import AddHabitInput2 from './AddHabitInput2';

const February = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [aprilComponent, setAprilComponent] = useState(null); // State for the April component

  useEffect(() => {
    axios.get('http://localhost:5000/api/habits')
      .then((response) => setHabits(response.data))
      .catch((error) => console.error('Error fetching habits:', error));
  }, []);

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      axios.post('http://localhost:5000/api/habits', { name: newHabit })
        .then((response) => {
          setHabits([...habits, response.data]);
          setNewHabit('');
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
      setAprilComponent(<AprilHabitTracker />); // Set the component when April is clicked
    } else {
      setAprilComponent(null); // Clear the component for other months
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
    <div className="App">

<SideNavbar onMonthClick={handleMonthClick} /><p>February</p>
<h1>Habit Tracker</h1>




      {/* Display the April component if set */}
      {aprilComponent}

      <AddHabitInput2
  newHabit={newHabit}
  setNewHabit={setNewHabit} // Ensure this line is present
  handleAddHabit={handleAddHabit}
/>

      <TotalBoxes2
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

export default February;
