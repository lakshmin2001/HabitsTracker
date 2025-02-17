import React from 'react';

const AddHabitInput2 = ({ newHabit, setNewHabit, handleAddHabit }) => {
  const handleChange = (e) => {
    setNewHabit(e.target.value);
  };

  const handleAddClick = () => {
    if (newHabit.trim()) {
      handleAddHabit(); // Call the parent function to add the habit
      setNewHabit(''); // Clear the input after adding
    } else {
      alert("Please enter a valid habit.");
    }
  };

  return (
    <div className="add-habit-container">
      <input
        type="text"
        aria-label="New Habit"
        value={newHabit}
        onChange={handleChange}
        placeholder="Enter new habit"
      />
      <button onClick={handleAddClick}>Add</button>
    </div>
  );
};

export default AddHabitInput2;