const Assessment = require("../Models/AssessmentModel");
const CareerRecommendation = require("../Models/CareerModels");

const careerDatabase = [
  {
    career: "Full Stack Developer",
    category: "Software Development",
    skills: ["JavaScript", "React.js", "Node.js", "Express.js", "MongoDB", "HTML/CSS"],
    interests: ["Software Development", "Web Development", "Programming"],
    description: "Build complete web applications using frontend, backend, APIs, and databases.",
    reason: "Your skills and interests strongly match modern web application development.",
  },
  {
    career: "Data Scientist",
    category: "Data & AI",
    skills: ["Python", "SQL", "Data Analysis", "Machine Learning"],
    interests: ["Data Science", "Artificial Intelligence", "Data Analysis"],
    description: "Analyze data, build predictive models, and solve problems using data.",
    reason: "Your interest in data and analytical technologies makes Data Science a strong career option.",
  },
  {
    career: "AI / ML Engineer",
    category: "Data & AI",
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL"],
    interests: ["Artificial Intelligence", "Machine Learning", "Data Science"],
    description: "Develop intelligent applications and machine learning systems.",
    reason: "Your interest in AI and technical skills align well with AI and Machine Learning careers.",
  },
  {
    career: "UI/UX Designer",
    category: "Design",
    skills: ["UI/UX Design", "Communication"],
    interests: ["Design & Creativity", "Design", "Creativity"],
    description: "Design intuitive, attractive, and user-friendly digital experiences.",
    reason: "Your design interests and creative skills are suitable for UI/UX design.",
  },
  {
    career: "Backend Developer",
    category: "Software Development",
    skills: ["Node.js", "Express.js", "MongoDB", "SQL", "Java", "Python"],
    interests: ["Software Development", "Backend Development", "Programming"],
    description: "Build server-side applications, APIs, databases, and scalable backend systems.",
    reason: "Your backend technologies and programming interests strongly match backend development.",
  },
];

const generateRecommendations = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.user?.userId;

    const assessment = await Assessment.findOne({ userId }).sort({ createdAt: -1 });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Please complete the assessment first.",
      });
    }

    const userSkills = assessment.skills || [];
    const userInterests = assessment.interests || [];

    const recommendations = careerDatabase.map((career) => {
      const matchingSkills = career.skills.filter((skill) =>
        userSkills.some((userSkill) => userSkill.toLowerCase() === skill.toLowerCase())
      );

      const matchingInterests = career.interests.filter((interest) =>
        userInterests.some((userInterest) => userInterest.toLowerCase() === interest.toLowerCase())
      );

      const skillScore = career.skills.length > 0 ? (matchingSkills.length / career.skills.length) * 60 : 0;
      const interestScore = career.interests.length > 0 ? (matchingInterests.length / career.interests.length) * 40 : 0;

      const matchPercentage = Math.min(100, Math.round(skillScore + interestScore));

      const missingSkills = career.skills.filter(
        (skill) => !userSkills.some((userSkill) => userSkill.toLowerCase() === skill.toLowerCase())
      );

      return {
        career: career.career,
        category: career.category || "Career",
        description: career.description,
        matchPercentage,
        reason: career.reason,
        requiredSkills: career.skills,
        missingSkills,
      };
    });

    recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
    const topRecommendations = recommendations.slice(0, 3);

    // Replace create with findOneAndUpdate to maintain single recommendation record per user
    const savedRecommendation = await CareerRecommendation.findOneAndUpdate(
      { userId },
      {
        userId,
        assessmentId: assessment._id,
        recommendations: topRecommendations,
      },
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Career recommendations generated successfully",
      data: savedRecommendation,
    });
  } catch (error) {
    console.error("Career Recommendation Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate career recommendations",
    });
  }
};

const getMyRecommendations = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id || req.user?.userId;

    const recommendation = await CareerRecommendation.findOne({ userId })
      .sort({ createdAt: -1 })
      .populate("assessmentId");

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: "No career recommendations found",
      });
    }

    return res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    console.error("Get Recommendation Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch recommendations",
    });
  }
};

module.exports = {
  generateRecommendations,
  getMyRecommendations,
};