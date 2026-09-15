const express = require("express");

const {
  createAssessment,
  getMyAssessment,
} = require("../Controllers/AssessmentController");

const authMiddleware = require("../Middleware/AuthMiddleWare");

const router = express.Router();

router.post("/assessment", authMiddleware, createAssessment);

router.get("/assessment", authMiddleware, getMyAssessment);

module.exports = router;