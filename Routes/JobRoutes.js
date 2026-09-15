const express = require("express");

const {
  getMatchingJobs,
} = require("../Controllers/JobController");

const authMiddleware = require(
  "../Middleware/AuthMiddleWare"
);

const router = express.Router();

router.get(
  "/jobs/matching",
  authMiddleware,
  getMatchingJobs
);

module.exports = router;