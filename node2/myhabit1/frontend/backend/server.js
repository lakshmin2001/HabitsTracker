const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data for habits (30 days)
let habits = [
  { id: 1, name: 'Exercise', days: Array(30).fill(null) },
  { id: 2, name: 'Read Book', days: Array(30).fill(null) },
  { id: 3, name: 'Meditation', days: Array(30).fill(null) },
  { id: 4, name: 'Drink Water', days: Array(30).fill(null) },
];

// Get all habits
app.get('/api/habits', (req, res) => {
  res.json(habits);
});

// Add a new habit
app.post('/api/habits', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Habit name is required' });
  }

  const newHabit = {
    id: habits.length + 1,
    name,
    days: Array(30).fill(null), // Initialize days to 30 null values
  };

  habits.push(newHabit);
  res.status(201).json(newHabit);
});

// Update a habit (mark as completed/missed with a comment)
app.put('/api/habits/:id', (req, res) => {
  const { id } = req.params;
  const { dayIndex, status, comment } = req.body;

  const habit = habits.find((h) => h.id === parseInt(id));
  if (habit) {
    habit.days[dayIndex] = { status, comment };
    res.json(habit);
  } else {
    res.status(404).json({ message: 'Habit not found' });
  }
});

// Delete a habit
app.delete('/api/habits/:id', (req, res) => {
  const { id } = req.params;
  const index = habits.findIndex((h) => h.id === parseInt(id));
  if (index !== -1) {
    habits.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Habit not found' });
  }
});

// Export habits to CSV
app.post('/api/convert-to-csv', (req, res) => {
  const { habits } = req.body;

  let csvContent = 'Habit Name';
  for (let i = 1; i <= 30; i++) {
    csvContent += `,Day ${i},Comment ${i}`; // Add comment column for each day
  }
  csvContent += '\n';

  habits.forEach((habit) => {
    let row = [habit.name]; // Start with habit name
    habit.days.forEach((day) => {
      row.push(day?.status || ''); // Add status
      row.push(day?.comment || ''); // Add comment (if available)
    });
    csvContent += `${row.join(',')}\n`; // Join row with commas
  });

  const filePath = path.join(__dirname, 'habits.csv');
  fs.writeFileSync(filePath, csvContent);
  res.download(filePath, 'habits.csv', (err) => {
    if (err) {
      res.status(500).json({ message: 'Failed to download the CSV file.' });
    }
  });
  });

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
