const CareerRoadmap = require("../Models/RoadMapModel");
const User = require("../Models/UserModel");

const roadmapDatabase = {
  "Full Stack Developer": [
    {
      step: 1,
      title: "Web Development Fundamentals",
      description: "Learn the core concepts required to build modern websites.",
      skills: ["HTML/CSS", "JavaScript", "Git"],
      projects: ["Personal Portfolio Website"],
      duration: "2 Weeks",
    },
    {
      step: 2,
      title: "Frontend Development",
      description: "Build interactive user interfaces using React.",
      skills: ["React.js", "Components", "Hooks", "State Management"],
      projects: ["Task Management App", "Weather Dashboard"],
      duration: "3 Weeks",
    },
    {
      step: 3,
      title: "Backend Development",
      description: "Learn how to build scalable REST APIs.",
      skills: ["Node.js", "Express.js", "REST API", "Authentication"],
      projects: ["Authentication API", "Blog API"],
      duration: "3 Weeks",
    },
    {
      step: 4,
      title: "Database Development",
      description: "Learn database design and data management.",
      skills: ["MongoDB", "Mongoose", "Database Design"],
      projects: ["E-commerce Database", "Student Management System"],
      duration: "2 Weeks",
    },
    {
      step: 5,
      title: "Full Stack Projects",
      description: "Combine frontend, backend and database skills.",
      skills: ["React.js", "Node.js", "Express.js", "MongoDB"],
      projects: [
        "Full Stack E-commerce Application",
        "AI Career Guidance System",
      ],
      duration: "4 Weeks",
    },
    {
      step: 6,
      title: "Job Ready Preparation",
      description: "Prepare for real-world development jobs and start applying.",
      skills: [
        "GitHub",
        "Deployment",
        "Problem Solving",
        "Interview Preparation",
        "Resume Building",
      ],
      projects: [
        "Deploy Full Stack Project",
        "Build Developer Portfolio",
      ],
      duration: "2 Weeks",
    },
  ],

  "Data Scientist": [
    {
      step: 1,
      title: "Python Fundamentals",
      description: "Learn Python programming fundamentals.",
      skills: ["Python", "Functions", "OOP"],
      projects: ["Python Mini Projects"],
      duration: "2 Weeks",
    },
    {
      step: 2,
      title: "Data Analysis",
      description: "Learn how to analyze and visualize data.",
      skills: ["Pandas", "NumPy", "Data Analysis"],
      projects: ["Sales Data Analysis"],
      duration: "3 Weeks",
    },
    {
      step: 3,
      title: "Machine Learning",
      description: "Learn machine learning algorithms.",
      skills: ["Machine Learning", "Scikit-learn", "Model Evaluation"],
      projects: [
        "House Price Prediction",
        "Customer Churn Prediction",
      ],
      duration: "4 Weeks",
    },
    {
      step: 4,
      title: "Advanced Data Science",
      description: "Work with advanced machine learning techniques.",
      skills: [
        "Feature Engineering",
        "Model Optimization",
        "Deep Learning",
      ],
      projects: ["End-to-End ML Project"],
      duration: "4 Weeks",
    },
    {
      step: 5,
      title: "Job Ready Preparation",
      description: "Prepare your portfolio, resume and interview skills.",
      skills: [
        "GitHub",
        "Portfolio",
        "Resume Building",
        "Interview Preparation",
      ],
      projects: ["Data Science Portfolio"],
      duration: "2 Weeks",
    },
  ],

  "AI / ML Engineer": [
    {
      step: 1,
      title: "Python & Mathematics",
      description: "Build the mathematical and programming foundation.",
      skills: ["Python", "Statistics", "Linear Algebra"],
      projects: ["Python AI Mini Projects"],
      duration: "3 Weeks",
    },
    {
      step: 2,
      title: "Machine Learning",
      description: "Learn supervised and unsupervised learning.",
      skills: ["Machine Learning", "Scikit-learn", "Model Evaluation"],
      projects: ["Prediction System"],
      duration: "4 Weeks",
    },
    {
      step: 3,
      title: "Deep Learning",
      description: "Learn neural networks and deep learning.",
      skills: ["Neural Networks", "TensorFlow", "PyTorch"],
      projects: ["Image Classification"],
      duration: "5 Weeks",
    },
    {
      step: 4,
      title: "AI Application Development",
      description: "Build production-ready AI applications.",
      skills: ["Generative AI", "APIs", "Model Integration"],
      projects: [
        "AI Career Assistant",
        "AI Recommendation System",
      ],
      duration: "4 Weeks",
    },
    {
      step: 5,
      title: "Job Ready Preparation",
      description: "Prepare your AI portfolio and start applying for jobs.",
      skills: [
        "GitHub",
        "Deployment",
        "MLOps Basics",
        "Interview Preparation",
      ],
      projects: ["Production AI Portfolio"],
      duration: "2 Weeks",
    },
  ],
};

// ==========================================
// HELPER
// ==========================================

const getUserId = (req) => {
  return req.user?._id || req.user?.id || req.userId;
};

const calculateStats = (roadmap) => {
  const totalSteps = roadmap.roadmap.length;

  const completedSteps = roadmap.roadmap.filter(
    (item) => item.status === "Completed"
  ).length;

  const inProgressSteps = roadmap.roadmap.filter(
    (item) => item.status === "In Progress"
  ).length;

  const progress =
    totalSteps > 0
      ? Math.round((completedSteps / totalSteps) * 100)
      : 0;

  return {
    totalSteps,
    completedSteps,
    inProgressSteps,
    progress,
  };
};

// ==========================================
// GENERATE ROADMAP
// ==========================================

const generateRoadmap = async (req, res) => {
  try {
    const { career } = req.body;

    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID missing in token payload",
      });
    }

    if (!career) {
      return res.status(400).json({
        success: false,
        message: "Career is required",
      });
    }

    const roadmapTemplate = roadmapDatabase[career];

    if (!roadmapTemplate) {
      return res.status(404).json({
        success: false,
        message: `Roadmap not available for ${career}`,
      });
    }

    // Existing roadmap remove
    await CareerRoadmap.deleteMany({ userId });

    // New roadmap
    const savedRoadmap = await CareerRoadmap.create({
      userId,
      career,
      roadmap: roadmapTemplate.map((item, index) => ({
        ...item,

        // First step active
        status:
          index === 0
            ? "In Progress"
            : "Not Started",
      })),
    });

    return res.status(201).json({
      success: true,
      message: "Career roadmap generated successfully",
      data: {
        _id: savedRoadmap._id,
        career: savedRoadmap.career,
        roadmap: savedRoadmap.roadmap,
        stats: calculateStats(savedRoadmap),
      },
    });

  } catch (error) {
    console.error("Roadmap Generate Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate career roadmap",
      error: error.message,
    });
  }
};

// ==========================================
// GET MY ROADMAP
// ==========================================

const getMyRoadmap = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID missing",
      });
    }

    // 1. Get the existing roadmap
    const roadmap = await CareerRoadmap.findOne({
      userId,
    }).sort({
      createdAt: -1,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    // 2. Fetch the user details to get their current goal
    const user = await User.findById(userId);

    // 3. Compare the roadmap career with the user's current goal
    // IMPORTANT: Make sure your User model field is actually called 'currentGoal'.
    // If it is called something else (like 'career'), change 'user.currentGoal' below!
    if (user && roadmap.career !== user.currentGoal) {
        console.log("🔄 Career mismatch detected on backend!");
        return res.status(409).json({
            success: false,
            careerChanged: true,
            message: "User changed career goal. Need new roadmap.",
            data: {
                oldCareer: roadmap.career,
                currentCareer: user.currentGoal
            }
        });
    }

    // 4. If goals match, return the normal roadmap
    return res.status(200).json({
      success: true,
      data: {
        _id: roadmap._id,
        career: roadmap.career,
        roadmap: roadmap.roadmap,
        stats: calculateStats(roadmap),
      },
    });

  } catch (error) {
    console.error("Fetch Roadmap Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch roadmap",
      error: error.message,
    });
  }
};

// ==========================================
// UPDATE ROADMAP STEP
// ==========================================

const updateRoadmapStep = async (req, res) => {
  try {
    const { roadmapId, step } = req.params;
    const { status } = req.body;

    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID missing",
      });
    }

    const validStatuses = [
      "Not Started",
      "In Progress",
      "Completed",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid roadmap status",
      });
    }

    const roadmap = await CareerRoadmap.findOne({
      _id: roadmapId,
      userId,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    const currentStepNumber = Number(step);

    const currentIndex = roadmap.roadmap.findIndex(
      (item) => item.step === currentStepNumber
    );

    if (currentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Roadmap step not found",
      });
    }

    const roadmapStep =
      roadmap.roadmap[currentIndex];

    // Update selected step
    roadmapStep.status = status;

    // ==========================================
    // WHEN COMPLETED → NEXT STEP AUTO START
    // ==========================================

    if (status === "Completed") {
      const nextStep =
        roadmap.roadmap[currentIndex + 1];

      if (
        nextStep &&
        nextStep.status !== "Completed"
      ) {
        nextStep.status = "In Progress";
      }
    }

    // ==========================================
    // IF USER PUTS A STEP IN PROGRESS
    // OTHER NON-COMPLETED STEPS RESET
    // ==========================================

    if (status === "In Progress") {
      roadmap.roadmap.forEach((item, index) => {
        if (
          index !== currentIndex &&
          item.status !== "Completed"
        ) {
          item.status = "Not Started";
        }
      });
    }

    await roadmap.save();

    const stats = calculateStats(roadmap);

    const isJobReady =
      stats.progress === 100;

    // ==========================================
    // UPDATE USER PROGRESS FOR DASHBOARD
    // ==========================================

    await User.findByIdAndUpdate(
      userId,
      {
        roadmapProgress: stats.progress,
        roadmapCompletedSteps:
          stats.completedSteps,
        roadmapTotalSteps:
          stats.totalSteps,
        jobReady: isJobReady,
        lastRoadmapUpdate: new Date(),
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        isJobReady
          ? "Congratulations! You are now job ready."
          : "Roadmap progress updated successfully",

      data: {
        _id: roadmap._id,
        career: roadmap.career,
        roadmap: roadmap.roadmap,
        stats,
        isJobReady,
      },
    });

  } catch (error) {
    console.error("Update Roadmap Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update roadmap",
      error: error.message,
    });
  }
};

module.exports = {
  generateRoadmap,
  getMyRoadmap,
  updateRoadmapStep,
};