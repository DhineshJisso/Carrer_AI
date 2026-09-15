const Assessment = require("../Models/AssessmentModel");
const SkillGap = require("../Models/SkillGapModel");

const careerSkills = {
  "Full Stack Developer": [
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "HTML/CSS",
    "SQL",
  ],

  "Backend Developer": [
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQL",
    "Java",
    "Python",
  ],

  "Data Scientist": [
    "Python",
    "SQL",
    "Data Analysis",
    "Machine Learning",
  ],

  "AI / ML Engineer": [
    "Python",
    "Machine Learning",
    "Data Analysis",
    "SQL",
  ],

  "UI/UX Designer": [
    "UI/UX Design",
    "Communication",
  ],
};

const normalizeSkill = (skill) => {
  if (!skill) return "";

  return skill
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
};

const generateSkillGap = async (req, res) => {
  try {
    const { career } = req.body;

    if (!career || !career.trim()) {
      return res.status(400).json({
        success: false,
        message: "Career is required",
      });
    }

    const cleanCareer = career.trim();

    const assessment = await Assessment.findOne({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Please complete assessment first",
      });
    }

    const requiredSkills = careerSkills[cleanCareer];

    if (!requiredSkills) {
      return res.status(404).json({
        success: false,
        message: "Career skill data not found",
        availableCareers: Object.keys(careerSkills),
      });
    }

    const userSkills = Array.isArray(assessment.skills)
      ? assessment.skills.filter(Boolean)
      : [];

    const normalizedUserSkills = userSkills.map(normalizeSkill);

    const matchedSkills = requiredSkills.filter((requiredSkill) =>
      normalizedUserSkills.includes(normalizeSkill(requiredSkill))
    );

    const missingSkills = requiredSkills.filter(
      (requiredSkill) =>
        !normalizedUserSkills.includes(normalizeSkill(requiredSkill))
    );

    const skillMatchPercentage =
      requiredSkills.length > 0
        ? Math.round(
          (matchedSkills.length / requiredSkills.length) * 100
        )
        : 0;

    const skillGapPercentage =
      requiredSkills.length > 0
        ? Math.round(
          (missingSkills.length / requiredSkills.length) * 100
        )
        : 0;

    const skillDetails = requiredSkills.map((skill) => {
      const isMatched = normalizedUserSkills.includes(
        normalizeSkill(skill)
      );

      return {
        name: skill,
        current: isMatched ? 100 : 0,
        required: 100,
        status: isMatched ? "strong" : "gap",
      };
    });

    const strongSkills = skillDetails.filter(
      (skill) => skill.status === "strong"
    ).length;

    const skillsToImprove = skillDetails.filter(
      (skill) => skill.status === "gap"
    ).length;

    const skillGap = await SkillGap.create({
      userId: req.user.id,
      career: cleanCareer,
      userSkills,
      requiredSkills,
      matchedSkills,
      missingSkills,
      skillGapPercentage,
      skillMatchPercentage,
    });

    return res.status(201).json({
      success: true,
      message: "Skill gap generated successfully",

      data: {
        id: skillGap._id,
        career: cleanCareer,

        userSkills,
        requiredSkills,
        matchedSkills,
        missingSkills,

        skillMatchPercentage,
        skillGapPercentage,

        strongSkills,
        skillsToImprove,

        totalSkills: requiredSkills.length,

        skillDetails,
      },
    });
  } catch (error) {
    console.error("Skill Gap Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate skill gap",
      error: error.message,
    });
  }
};

const getMySkillGap = async (req, res) => {
  try {
    const skillGaps = await SkillGap.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: skillGaps,
    });
  } catch (error) {
    console.error("Get Skill Gap Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch skill gap",
      error: error.message,
    });
  }
};

module.exports = {
  generateSkillGap,
  getMySkillGap,
};