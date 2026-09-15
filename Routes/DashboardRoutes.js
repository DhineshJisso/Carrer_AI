const express = require("express");

const {
  getDashboard,
} = require("../Controllers/DashboardController");

const authMiddleware = require(
  "../Middleware/AuthMiddleWare"
);

const router = express.Router();

router.get(
  "/dashboard",
  authMiddleware,
  getDashboard
);

module.exports = router;