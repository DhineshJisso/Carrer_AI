const express = require("express");

const {
  getMyProfile,
} = require("../Controllers/ProfileController");

const authMiddleware = require("../Middleware/AuthMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);

module.exports = router;