const express = require("express");

const {
    updateProgress,
    getMyProgress,
    getCareerProgress,
    deleteProgress,
} = require("../Controllers/ProgressController");

const authMiddleware = require("../Middleware/AuthMiddleWare");

const router = express.Router();


// Create / Update Progress
router.post(
    "/progress",
    authMiddleware,
    updateProgress
);


// Get logged-in user's all progress
router.get(
    "/progress",
    authMiddleware,
    getMyProgress
);


// Get progress for specific career
router.get(
    "/progress/:career",
    authMiddleware,
    getCareerProgress
);


// Delete career progress
router.delete(
    "/progress/:career",
    authMiddleware,
    deleteProgress
);


module.exports = router;