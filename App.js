const express = require("express");
const cors = require("cors");

const app = express();

// ===============================
// CORS
// ===============================

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ===============================
// BODY PARSER
// ===============================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ===============================
// IMPORT ROUTES
// ===============================

const authRoutes = require("./Routes/AuthRoutes");
const profileRoutes = require ("./Routes/ProfileRoutes");


const assessmentRoutes = require(
  "./Routes/AssessementRoutes"
);

const careerRoutes = require(
  "./Routes/CareerRoutes"
);

const skillGapRoutes = require(
  "./Routes/SkillGapRoutes"
);

const courseRoutes = require(
  "./Routes/CourseRoutes"
);

const dashboardRoutes = require(
  "./Routes/DashboardRoutes"
);

const progressRoutes = require("./Routes/ProgressRoutes");

const roadmapRoutes = require(
  "./Routes/RoadMapRoutes"
);

const jobRoutes = require("./Routes/JobRoutes");

// ===============================
// ROUTES
// ===============================

// Authentication
app.use("/api/auth", authRoutes);

// Assessment
app.use("/api", assessmentRoutes);

// Career
app.use("/api", careerRoutes);

// Skill Gap
app.use("/api", skillGapRoutes);

// Courses
app.use("/api", courseRoutes);

app.use("/api", progressRoutes);

// Dashboard
app.use("/api", dashboardRoutes);

app.use("/api", jobRoutes);


// app.use(
//   "/api/jobs",
//   jobRoutes
// );

// Roadmap
app.use("/api", roadmapRoutes);

app.use("/api/profile", profileRoutes);

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerAI Backend is running 🚀",
  });
});

// ===============================
// 404 ROUTE
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;