// ES Module Mock Backend (works with "type": "module")

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const makeId = () =>
  Date.now().toString(36) + Math.floor(Math.random() * 10000).toString(36);

const readUser = (req) => ({
  id: req.header("x-user-id") || "demo-student",
  role: req.header("x-user-role") || "student",
});

// =====================
// MOCK DATA
// =====================

let events = [
  {
    _id: makeId(),
    title: "Welcome Fest",
    description: "Semester opening celebration with music & food.",
    date: new Date().toISOString(),
    time: "18:00",
    location: "Main Auditorium",
    registeredCount: 5,
    max: 100,
    registerBy: new Date().toISOString(),
    club: "Student Affairs",
    type: "Cultural",
    status: "upcoming",
  },
];

let academics = {
  gpa: 8.45,
  attendance: 82,
  courses: [
    {
      code: "CS101",
      name: "Data Structures",
      professor: "Dr. Anjali Verma",
      credits: 4,
      attendance: 85,
      grade: "A",
    },
  ],
};

let internships = [];

let registrations = {};

// =====================
// EVENTS
// =====================

app.get("/api/events", (req, res) => {
  res.json(events);
});

app.post("/api/events/:id/register", (req, res) => {
  const id = req.params.id;
  const user = readUser(req);

  const event = events.find((e) => e._id === id);
  if (!event) return res.status(404).json({ error: "Event not found" });

  registrations[id] = registrations[id] || new Set();
  registrations[id].add(user.id);
  event.registeredCount = registrations[id].size;

  res.json({ success: true, event });
});

// =====================
// ACADEMICS
// =====================

app.get("/api/academics", (req, res) => {
  res.json(academics);
});

// =====================
// INTERNSHIPS
// =====================

app.get("/api/internships", (req, res) => {
  res.json(internships);
});

// =====================
// HEALTH
// =====================

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock backend running on http://localhost:${PORT}`);
});
