const Assessment = require("../Models/AssessmentModel");

const createAssessment = async (req, res) => {
  try {
    // JWT Payload fallback key check
    const userId = req.user?._id || req.user?.id || req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User context missing from token",
      });
    }

    const {
      education,
      interests,
      skills,
      experienceLevel,
      preferredWorkStyle,
      careerGoals,
    } = req.body;

    // Use updateOne with upsert to prevent multiple records for the same user
    const assessment = await Assessment.findOneAndUpdate(
      { userId },
      {
        userId,
        education,
        interests,
        skills,
        experienceLevel,
        preferredWorkStyle,
        careerGoals,
      },
      { new: true, upsert: true }
    );

    return res.status(201).json({
      success: true,
      message: "Assessment saved successfully",
      data: assessment,
    });
  } catch (error) {
    console.error("Assessment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save assessment",
      error: error.message,
    });
  }
};

const getMyAssessment = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.user?.userId;

    const assessment = await Assessment.findOne({ userId });

    return res.status(200).json({
      success: true,
      data: assessment,
    });
  } catch (error) {
    console.error("Get Assessment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch assessment",
      error: error.message,
    });
  }
};

module.exports = {
  createAssessment,
  getMyAssessment,
};