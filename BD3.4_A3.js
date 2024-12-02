const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

let activities = [
  { activityId: 1, type: "Running", duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: "Swimming", duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: "Cycling", duration: 60, caloriesBurned: 500 },
];

const PORT = 3000;

// Endpoint 1: Add an Activity
app.get("/activities/add", (req, res) => {
  const { activityId, type, duration, caloriesBurned } = req.query;
  activities.push({
    activityId: parseInt(activityId),
    type,
    duration: parseInt(duration),
    caloriesBurned: parseInt(caloriesBurned),
  });
  res.json({ activities });
});

// Endpoint 2: Sort Activities by Duration
app.get("/activities/sort-by-duration", (req, res) => {
  const sortedActivities = [...activities].sort(
    (a, b) => a.duration - b.duration,
  );
  res.json({ activities: sortedActivities });
});

// Endpoint 3: Filter Activities by Type
app.get("/activities/filter-by-type", (req, res) => {
  const { type } = req.query;
  const filteredActivities = activities.filter(
    (activity) => activity.type === type,
  );
  res.json({ activities: filteredActivities });
});

// Endpoint 4: Calculate Total Calories Burned
app.get("/activities/total-calories", (req, res) => {
  const totalCaloriesBurned = activities.reduce(
    (sum, activity) => sum + activity.caloriesBurned,
    0,
  );
  res.json({ totalCaloriesBurned });
});

// Endpoint 5: Update Activity Duration by ID
app.get("/activities/update-duration", (req, res) => {
  const { activityId, duration } = req.query;
  activities = activities.map((activity) =>
    activity.activityId === parseInt(activityId)
      ? { ...activity, duration: parseInt(duration) }
      : activity,
  );
  res.json({ activities });
});

// Endpoint 6: Delete Activity by ID
app.get("/activities/delete", (req, res) => {
  const { activityId } = req.query;
  activities = activities.filter(
    (activity) => activity.activityId !== parseInt(activityId),
  );
  res.json({ activities });
});

// Endpoint 7: Delete Activities by Type
app.get("/activities/delete-by-type", (req, res) => {
  const { type } = req.query;
  activities = activities.filter((activity) => activity.type !== type);
  res.json({ activities });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
