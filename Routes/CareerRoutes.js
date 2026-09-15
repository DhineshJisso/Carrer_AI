const express = require("express");

const {
  generateRecommendations,
  getMyRecommendations,
} = require("../Controllers/CareerController.js");

const authMiddleware = require(
  "../Middleware/AuthMiddleWare.js"
);

const router = express.Router();

router.post(
  "/career/recommend",
  authMiddleware,
  generateRecommendations
);

router.get(
  "/career/recommendations",
  authMiddleware,
  getMyRecommendations
);

module.exports = router;