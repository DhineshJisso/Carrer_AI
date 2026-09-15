const Job = require("../Models/JobModel");
const Assessment = require("../Models/AssessmentModel");

const getMatchingJobs = async (req, res) => {
  try {
    const userId =
      req.user?._id ||
      req.user?.id ||
      req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed",
      });
    }

    console.log("CURRENT USER ID:", userId);

    const userAssessment =
      await Assessment.findOne({ userId });

    if (!userAssessment) {
      return res.status(400).json({
        success: false,
        message:
          "Please complete your assessment first",
      });
    }

    const userSkills = (
      userAssessment.skills || []
    )
      .filter(Boolean)
      .map((skill) =>
        skill.toLowerCase().trim()
      );

    console.log("USER SKILLS:", userSkills);

    const jobs = await Job.find({});

    console.log("TOTAL JOBS FROM DB:", jobs.length);

    const matchedJobs = jobs.map((job) => {
      const requiredSkills =
        job.requiredSkills || [];

      const acquiredSkills = [];
      const missingSkills = [];

      requiredSkills.forEach((skill) => {
        if (!skill) return;

        const cleanSkill =
          skill.toLowerCase().trim();

        if (userSkills.includes(cleanSkill)) {
          acquiredSkills.push(skill);
        } else {
          missingSkills.push(skill);
        }
      });

      const matchPercentage =
        requiredSkills.length > 0
          ? Math.round(
              (acquiredSkills.length /
                requiredSkills.length) *
                100
            )
          : 0;

      return {
        _id: job._id,

        title: job.title,
        company: job.company,
        location: job.location,
        career: job.career,
        experienceLevel:
          job.experienceLevel,
        salaryRange: job.salaryRange,
        applyUrl: job.applyUrl,

        requiredSkills,
        acquiredSkills,
        missingSkills,

        matchPercentage,
      };
    });

    matchedJobs.sort(
      (a, b) =>
        b.matchPercentage -
        a.matchPercentage
    );

    return res.status(200).json({
      success: true,

      totalJobs: matchedJobs.length,

      userSkills:
        userAssessment.skills || [],

      data: matchedJobs,
    });
  } catch (error) {
    console.error(
      "GET MATCHING JOBS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch job opportunities",
      error: error.message,
    });
  }
};

module.exports = {
  getMatchingJobs,
};