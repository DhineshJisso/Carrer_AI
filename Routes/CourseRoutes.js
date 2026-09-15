const express = require("express");

const router = express.Router();

const {
  generateCourseRecommendations,
  getMyCourses,
} = require("../Controllers/CourseController");

const authMiddleware = require("../Middleware/AuthMiddleWare");

// ==========================================
// GENERATE COURSE RECOMMENDATIONS
// POST /api/courses/recommend
// ==========================================

router.post(
  "/courses/recommend",
  authMiddleware,
  generateCourseRecommendations
);


// ==========================================
// GET MY COURSE RECOMMENDATIONS
// GET /api/courses/my-courses
// ==========================================

router.get(
  "/courses/my-courses",
  authMiddleware,
  getMyCourses
);

module.exports = router;