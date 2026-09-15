const Assessment = require("../Models/AssessmentModel");


// =====================================================
// CREATE / UPDATE ASSESSMENT
// =====================================================

const createAssessment = async (req, res) => {
  try {
    // JWT payload fallback
    const userId =
      req.user?._id ||
      req.user?.id ||
      req.user?.userId;

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
      career,
      completed,
    } = req.body;


    // ================================================
    // BASIC VALIDATION
    // ================================================

    if (!education?.degree) {
      return res.status(400).json({
        success: false,
        message: "Degree is required",
      });
    }

    if (!education?.field) {
      return res.status(400).json({
        success: false,
        message: "Field of study is required",
      });
    }


    // ================================================
    // PREPARE UPDATE
    // ================================================

    const updateData = {
      userId,

      education,

      interests: Array.isArray(interests)
        ? interests
        : [],

      skills: Array.isArray(skills)
        ? skills
        : [],

      experienceLevel:
        experienceLevel || "Beginner",

      preferredWorkStyle:
        preferredWorkStyle || "",

      careerGoals:
        careerGoals || "",

      career:
        career || "",

      completed:
        completed === true,

      completedAt:
        completed === true
          ? new Date()
          : null,
    };


    // ================================================
    // CREATE OR UPDATE
    // ================================================

    const assessment =
      await Assessment.findOneAndUpdate(
        { userId },

        updateData,

        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );


    return res.status(200).json({
      success: true,

      message:
        "Assessment saved successfully",

      data: assessment,
    });

  } catch (error) {

    console.error(
      "Assessment Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to save assessment",

      error: error.message,
    });
  }
};


// =====================================================
// GET MY ASSESSMENT
// =====================================================

const getMyAssessment = async (req, res) => {
  try {

    const userId =
      req.user?._id ||
      req.user?.id ||
      req.user?.userId;


    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User context missing from token",
      });
    }


    const assessment =
      await Assessment.findOne({
        userId,
      });


    if (!assessment) {
      return res.status(404).json({
        success: false,
        message:
          "Assessment not found",
      });
    }


    return res.status(200).json({
      success: true,
      data: assessment,
    });

  } catch (error) {

    console.error(
      "Get Assessment Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch assessment",

      error: error.message,
    });
  }
};


// =====================================================
// GET MY CAREER
// =====================================================

const getMyCareer = async (req, res) => {
  try {

    const userId =
      req.user?._id ||
      req.user?.id ||
      req.user?.userId;


    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User context missing from token",
      });
    }


    const assessment =
      await Assessment.findOne({
        userId,
      }).select(
        "career completed"
      );


    if (!assessment) {
      return res.status(404).json({
        success: false,
        message:
          "Assessment not found",
      });
    }


    if (!assessment.career) {
      return res.status(404).json({
        success: false,
        message:
          "No career selected",
      });
    }


    return res.status(200).json({
      success: true,

      data: {
        career: assessment.career,
        completed: assessment.completed,
      },
    });

  } catch (error) {

    console.error(
      "Get Career Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch career",

      error: error.message,
    });
  }
};


module.exports = {
  createAssessment,
  getMyAssessment,
  getMyCareer,
};