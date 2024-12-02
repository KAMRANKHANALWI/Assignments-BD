const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let tasks = [
  { taskId: 1, text: "Fix bug #101", priority: 2 },
  { taskId: 2, text: "Implement feature #202", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
];

const PORT = 3000;

// Endpoint 1: Add a Task to the Task List
app.get("/tasks/add", (req, res) => {
  const { taskId, text, priority } = req.query;
  tasks.push({
    taskId: parseInt(taskId),
    text: text,
    priority: parseInt(priority),
  });
  res.json({ tasks });
});

// Endpoint 2: Read All Tasks in the Task List
app.get("/tasks", (req, res) => {
  res.json({ tasks });
});

// Endpoint 3: Sort Tasks by Priority
app.get("/tasks/sort-by-priority", (req, res) => {
  const sortedTasks = [...tasks].sort((a, b) => a.priority - b.priority);
  res.json({ tasks: sortedTasks });
});

// Endpoint 4: Edit Task Priority
app.get("/tasks/edit-priority", (req, res) => {
  const { taskId, priority } = req.query;
  tasks = tasks.map((task) =>
    task.taskId === parseInt(taskId)
      ? { ...task, priority: parseInt(priority) }
      : task,
  );
  res.json({ tasks });
});

// Endpoint 5: Edit/Update Task Text
app.get("/tasks/edit-text", (req, res) => {
  const { taskId, text } = req.query;
  tasks = tasks.map((task) =>
    task.taskId === parseInt(taskId) ? { ...task, text: text } : task,
  );
  res.json({ tasks });
});

// Endpoint 6: Delete a Task from the Task List
app.get("/tasks/delete", (req, res) => {
  const { taskId } = req.query;
  tasks = tasks.filter((task) => task.taskId !== parseInt(taskId));
  res.json({ tasks });
});

// Endpoint 7: Filter Tasks by Priority
app.get("/tasks/filter-by-priority", (req, res) => {
  const { priority } = req.query;
  const filteredTasks = tasks.filter(
    (task) => task.priority === parseInt(priority),
  );
  res.json({ tasks: filteredTasks });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
