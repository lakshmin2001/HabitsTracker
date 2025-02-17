import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Add.css';
import SideNavbar from './SideNavbar';
import TotalBoxes from './TotalBoxes';
import AddHabitInput from './AddHabitInput';

const Add = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('january'); // Default to January

  // Fetch habits for the selected month
  useEffect(() => {
    axios.get(`http://localhost:5000/api/habits?month=${selectedMonth}`)
      .then((response) => setHabits(response.data))
      .catch((error) => console.error('Error fetching habits:', error));
  }, [selectedMonth]);

  // Add a new habit for the selected month
  const handleAddHabit = () => {
    if (newHabit.trim()) {
      axios.post('http://localhost:5000/api/habits', { name: newHabit, month: selectedMonth })
        .then((response) => {
          setHabits([...habits, response.data]);
          setNewHabit('');
        })
        .catch((error) => console.error('Error adding habit:', error));
    }
  };

  // Handle single click (mark as completed)
  const handleSingleClick = (id, dayIndex) => {
    const habit = habits.find((h) => h.id === id);
    const status = habit.days[dayIndex]?.status === 'completed' ? null : 'completed';
    axios.put(`http://localhost:5000/api/habits/${id}`, { dayIndex, status, month: selectedMonth })
      .then((response) => setHabits(habits.map((habit) => habit.id === id ? response.data : habit)))
      .catch((error) => console.error('Error updating habit:', error));
  };

  // Handle double click (mark as missed with a comment)
  const handleDoubleClick = async (id, dayIndex) => {
    const comment = window.prompt('Why did you miss this habit?');
    const status = 'missed';
    axios.put(`http://localhost:5000/api/habits/${id}`, { dayIndex, status, comment, month: selectedMonth })
      .then((response) => setHabits(habits.map((habit) => habit.id === id ? response.data : habit)))
      .catch((error) => console.error('Error updating habit:', error));
  };

  // Delete a habit for the selected month
  const handleDeleteHabit = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this habit?');
    if (confirmed) {
      axios.delete(`http://localhost:5000/api/habits/${id}?month=${selectedMonth}`)
        .then(() => setHabits(habits.filter((habit) => habit.id !== id)))
        .catch((error) => console.error('Error deleting habit:', error));
    }
  };

  // Export habits to CSV for the selected month
  const handleExportToCSV = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/convert-to-csv',
        { habits, month: selectedMonth },
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `habits_${selectedMonth}.csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      alert('Failed to export data to CSV.');
    }
  };

  // Handle month selection from SideNavbar
  const handleMonthClick = (month) => {
    setSelectedMonth(month.toLowerCase());
  };

  return (
    <div className="App">
      <SideNavbar onMonthClick={handleMonthClick} />
      <h1>Habit Tracker - {selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}</h1>

      <AddHabitInput
        newHabit={newHabit}
        setNewHabit={setNewHabit}
        handleAddHabit={handleAddHabit}
      />

      <TotalBoxes
        habits={habits}
        handleSingleClick={handleSingleClick}
        handleDoubleClick={handleDoubleClick}
        handleDeleteHabit={handleDeleteHabit}
      />

      <button className="save-button" onClick={handleExportToCSV}>
        Export to CSV
      </button>
    </div>
  );
};

export default Add;