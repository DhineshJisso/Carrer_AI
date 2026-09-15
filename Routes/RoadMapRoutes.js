const express = require("express");

const {
  generateRoadmap,
  getMyRoadmap,
  updateRoadmapStep,
} = require("../Controllers/RoadMapController");

const authMiddleware = require(
  "../Middleware/AuthMiddleWare"
);

const router = express.Router();


// ==========================================
// GENERATE ROADMAP
// Top #1 career automatically selected
// ==========================================

router.post(
  "/roadmap",
  authMiddleware,
  generateRoadmap
);


// ==========================================
// GET MY ROADMAP
// ==========================================

router.get(
  "/roadmap",
  authMiddleware,
  getMyRoadmap
);


// ==========================================
// UPDATE ROADMAP STEP
// ==========================================

router.patch(
  "/roadmap/:roadmapId/step/:step",
  authMiddleware,
  updateRoadmapStep
);


module.exports = router;