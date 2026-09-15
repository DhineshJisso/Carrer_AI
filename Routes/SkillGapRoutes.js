const express = require("express");

const {
  generateSkillGap,
  getMySkillGap,
} = require("../Controllers/SkillGapController");

const authMiddleware = require("../Middleware/AuthMiddleWare");

const router = express.Router();

router.post(
  "/skill-gap",
  authMiddleware,
  generateSkillGap
);

router.get(
  "/skill-gap",
  authMiddleware,
  getMySkillGap
);

module.exports = router;