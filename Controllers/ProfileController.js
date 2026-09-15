const User = require("../Models/UserModel");

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,

      profile: {
        name: user.name || "",
        email: user.email || "",

        education: user.education || "",

        experienceLevel:
          user.experienceLevel ||
          user.experience ||
          "",

        skills: user.skills || [],

        careerGoal: user.careerGoal || "",

        careerReadiness:
          user.careerReadiness || 0,

        assessmentScore:
          user.assessmentScore || 0,

        questions:
          user.questions || 0,

        assessmentCompleted:
          user.assessmentCompleted || false,

        updatedAt:
          user.updatedAt || null,

        verified:
          user.verified || false,
      },
    });

  } catch (error) {
    console.error(
      "GET PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to load profile",
    });
  }
};

module.exports = {
  getMyProfile,
};