const express = require("express");
const {
  createAssessment,
  getMyAssessment,
  getMyCareer,
  saveProgress,
  getCourseAssessment, // NEW: Add this controller export
} = require("../Controllers/AssessmentController");

const authMiddleware = require("../Middleware/AuthMiddleWare");

const router = express.Router();

// CREATE / UPDATE ASSESSMENT
router.post("/assessment", authMiddleware, createAssessment);

// GET MY ASSESSMENT
router.get("/assessment", authMiddleware, getMyAssessment);

// GET MY CAREER
router.get("/assessment/career", authMiddleware, getMyCareer);

// SAVE PROGRESS
router.post("/progress", authMiddleware, saveProgress);

// NEW: GET COURSE ASSESSMENT DATA (Prevents 404 API crashes)
router.get("/course-assessment", authMiddleware, getCourseAssessment);

module.exports = router;