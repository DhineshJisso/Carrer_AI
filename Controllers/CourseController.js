const Assessment = require("../Models/AssessmentModel");
const CourseRecommendation = require("../Models/CourseModel");

const courseDatabase = [
  {
    title: "JavaScript Complete Guide",
    platform: "Udemy",
    skill: "JavaScript",
    level: "Beginner",
    duration: "25 Hours",
    rating: 4.7,
    url: "https://www.udemy.com/",
  },
  {
    title: "React - The Complete Guide",
    platform: "Udemy",
    skill: "React.js",
    level: "Intermediate",
    duration: "40 Hours",
    rating: 4.8,
    url: "https://www.udemy.com/",
  },
  {
    title: "Node.js Developer Course",
    platform: "Udemy",
    skill: "Node.js",
    level: "Intermediate",
    duration: "35 Hours",
    rating: 4.7,
    url: "https://www.udemy.com/",
  },
  {
    title: "Express.js Fundamentals",
    platform: "Udemy",
    skill: "Express.js",
    level: "Intermediate",
    duration: "12 Hours",
    rating: 4.6,
    url: "https://www.udemy.com/",
  },
  {
    title: "MongoDB Developer Path",
    platform: "MongoDB University",
    skill: "MongoDB",
    level: "Beginner",
    duration: "15 Hours",
    rating: 4.8,
    url: "https://learn.mongodb.com/",
  },
  {
    title: "Python for Data Science",
    platform: "Coursera",
    skill: "Python",
    level: "Beginner",
    duration: "30 Hours",
    rating: 4.8,
    url: "https://www.coursera.org/",
  },
  {
    title: "Machine Learning Specialization",
    platform: "Coursera",
    skill: "Machine Learning",
    level: "Intermediate",
    duration: "60 Hours",
    rating: 4.9,
    url: "https://www.coursera.org/",
  },
  {
    title: "SQL for Data Analysis",
    platform: "Coursera",
    skill: "SQL",
    level: "Beginner",
    duration: "20 Hours",
    rating: 4.7,
    url: "https://www.coursera.org/",
  },
  {
    title: "Data Analysis with Python",
    platform: "freeCodeCamp",
    skill: "Data Analysis",
    level: "Intermediate",
    duration: "25 Hours",
    rating: 4.7,
    url: "https://www.freecodecamp.org/",
  },
  {
    title: "UI/UX Design Fundamentals",
    platform: "Coursera",
    skill: "UI/UX Design",
    level: "Beginner",
    duration: "18 Hours",
    rating: 4.8,
    url: "https://www.coursera.org/",
  },
];


// ========================================
// GENERATE COURSE RECOMMENDATIONS
// POST /api/courses/recommend
// ========================================

const generateCourseRecommendations = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { career } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed",
      });
    }

    if (!career) {
      return res.status(400).json({
        success: false,
        message: "Career is required",
      });
    }

    // Find user assessment
    const assessment = await Assessment.findOne({
      userId,
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Please complete assessment first",
      });
    }

    const userSkills = assessment.skills || [];

    // Career required skills
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

    const requiredSkills = careerSkills[career] || [];

    // Find missing skills
    const missingSkills = requiredSkills.filter(
      (requiredSkill) =>
        !userSkills.some(
          (userSkill) =>
            userSkill.toLowerCase() ===
            requiredSkill.toLowerCase()
        )
    );

    // Find recommended courses
    const recommendedCourses = courseDatabase.filter(
      (course) =>
        missingSkills.some(
          (missingSkill) =>
            missingSkill.toLowerCase() ===
            course.skill.toLowerCase()
        )
    );

    // Save recommendation
    const savedRecommendation =
      await CourseRecommendation.create({
        userId,
        career,
        courses: recommendedCourses,
      });

    return res.status(201).json({
      success: true,
      message: "Courses recommended successfully",
      data: savedRecommendation,
    });

  } catch (error) {
    console.error(
      "COURSE RECOMMENDATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to recommend courses",
      error: error.message,
    });
  }
};


// ========================================
// GET MY COURSES
// GET /api/courses/my-courses
// ========================================

const getMyCourses = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed",
      });
    }

    const recommendations =
      await CourseRecommendation.find({
        userId,
      })
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      data: recommendations,
    });

  } catch (error) {
    console.error(
      "GET COURSES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};


module.exports = {
  generateCourseRecommendations,
  getMyCourses,
};