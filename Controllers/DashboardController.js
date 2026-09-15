const User = require("../Models/UserModel");
const Assessment = require("../Models/AssessmentModel");
const CareerRecommendation = require("../Models/CareerModels");
const SkillGap = require("../Models/SkillGapModel");
const CourseRecommendation = require("../Models/CourseModel");
const CareerRoadmap = require("../Models/RoadMapModel");
const Job = require("../Models/JobModel");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.userId || req.user?.id;
    
    console.log("🔍 === DASHBOARD REQUEST ===");
    console.log("👤 User ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed",
      });
    }

    // ==========================================
    // FETCH ALL USER DATA
    // ==========================================
    
    const [
      user,
      assessment,
      careerRecommendation,
      skillGap,
      courseRecommendation,
      roadmap,
      jobs,
    ] = await Promise.all([
      User.findById(userId).select("name email profileImage createdAt"),
      Assessment.findOne({ userId }).sort({ createdAt: -1 }),
      CareerRecommendation.findOne({ userId }).sort({ createdAt: -1 }),
      SkillGap.findOne({ userId }).sort({ createdAt: -1 }),
      CourseRecommendation.findOne({ userId }).sort({ createdAt: -1 }),
      CareerRoadmap.findOne({ userId }).sort({ createdAt: -1 }),
      Job.find({}),
    ]);

    console.log("📊 DATA FOUND:");
    console.log("  - User:", user ? "✅" : "❌");
    console.log("  - Assessment:", assessment ? "✅" : "❌");
    console.log("  - Jobs in DB:", jobs.length);

    // ==========================================
    // TOP CAREER
    // ==========================================
    
    const topCareer = careerRecommendation?.recommendations?.[0] || null;

    // ==========================================
    // COURSE COUNT
    // ==========================================
    
    const totalCourses = courseRecommendation?.courses?.length || 0;

    // ==========================================
    // ROADMAP PROGRESS
    // ==========================================
    
    const roadmapSteps = roadmap?.roadmap || [];
    const totalRoadmapSteps = roadmapSteps.length;
    const completedRoadmapSteps = roadmapSteps.filter(
      (step) => step.status?.toLowerCase() === "completed"
    ).length;
    const roadmapProgress = totalRoadmapSteps > 0
      ? Math.round((completedRoadmapSteps / totalRoadmapSteps) * 100)
      : 0;

    // ==========================================
    // SKILL GAP PROGRESS
    // ==========================================
    
    const matchedSkills = skillGap?.matchedSkills || [];
    const missingSkills = skillGap?.missingSkills || [];
    const totalSkillCount = matchedSkills.length + missingSkills.length;
    const skillProgress = totalSkillCount > 0
      ? Math.round((matchedSkills.length / totalSkillCount) * 100)
      : 0;

    // ==========================================
    // JOB MATCHING SYSTEM - IMPROVED
    // ==========================================
    
    const userSkills = (assessment?.skills || [])
      .filter(Boolean)
      .map((skill) => skill.toLowerCase().trim());

    console.log("  - User Skills:", userSkills);

    // ==========================================
    // MATCH EVERY JOB
    // ==========================================
    
    let matchedJobs = [];

    if (jobs.length > 0 && userSkills.length > 0) {
      matchedJobs = jobs.map((job) => {
        const requiredSkills = job.requiredSkills || [];
        const normalizedJobSkills = requiredSkills
          .filter(Boolean)
          .map((skill) => skill.toLowerCase().trim());

        // MATCHED SKILLS
        const acquiredSkills = requiredSkills.filter((skill) =>
          userSkills.includes(skill.toLowerCase().trim())
        );

        // MISSING SKILLS
        const missingJobSkills = requiredSkills.filter(
          (skill) => !userSkills.includes(skill.toLowerCase().trim())
        );

        // MATCH PERCENTAGE
        let matchPercentage = 0;
        if (normalizedJobSkills.length > 0) {
          matchPercentage = Math.round(
            (acquiredSkills.length / normalizedJobSkills.length) * 100
          );
        }

        // CAREER MATCH
        const userCareer = topCareer?.career || skillGap?.career || assessment?.careerGoals || "";
        const normalizedUserCareer = userCareer.toLowerCase().trim();
        const normalizedJobCareer = job.career?.toLowerCase().trim() || "";
        
        let careerMatched = false;
        if (normalizedUserCareer && normalizedJobCareer) {
          careerMatched = normalizedUserCareer.includes(normalizedJobCareer) ||
            normalizedJobCareer.includes(normalizedUserCareer);
        }

        return {
          _id: job._id,
          title: job.title,
          company: job.company,
          location: job.location,
          career: job.career,
          experienceLevel: job.experienceLevel,
          salaryRange: job.salaryRange,
          applyUrl: job.applyUrl,
          requiredSkills,
          acquiredSkills,
          missingSkills: missingJobSkills,
          matchPercentage,
          careerMatched,
        };
      });

      // SORT BEST MATCH FIRST
      matchedJobs.sort((a, b) => {
        if (a.careerMatched && !b.careerMatched) return -1;
        if (!a.careerMatched && b.careerMatched) return 1;
        return b.matchPercentage - a.matchPercentage;
      });

      console.log("  - Matched Jobs:", matchedJobs.length);
    } else {
      console.log("  - No jobs or no user skills for matching");
    }

    // FILTER RELEVANT JOBS
    const relevantJobs = matchedJobs.filter(
      (job) => job.acquiredSkills.length > 0 || job.careerMatched
    );

    // TOP 6 JOBS FOR DASHBOARD
    const topJobs = relevantJobs.slice(0, 6);

    // JOB STATISTICS
    const highMatchJobs = relevantJobs.filter((job) => job.matchPercentage >= 70);
    const mediumMatchJobs = relevantJobs.filter(
      (job) => job.matchPercentage >= 40 && job.matchPercentage < 70
    );
    const skillGapJobs = relevantJobs.filter(
      (job) => job.matchPercentage > 0 && job.matchPercentage < 40
    );

    console.log("📊 JOB STATS:");
    console.log("  - Relevant Jobs:", relevantJobs.length);
    console.log("  - High Match (>70%):", highMatchJobs.length);
    console.log("  - Medium Match (40-70%):", mediumMatchJobs.length);
    console.log("  - Top 6 Jobs:", topJobs.length);

    // ==========================================
    // FINAL RESPONSE
    // ==========================================
    
    return res.status(200).json({
      success: true,
      data: {
        user: user ? {
          name: user.name || "User",
          email: user.email || "",
          profileImage: user.profileImage || null,
          joinedAt: user.createdAt || null,
        } : null,

        assessment: assessment ? {
          completed: true,
          interests: assessment.interests || [],
          skills: assessment.skills || [],
          experienceLevel: assessment.experienceLevel || "Not specified",
        } : {
          completed: false,
          interests: [],
          skills: [],
          experienceLevel: "Not specified",
        },

        career: topCareer ? {
          name: topCareer.career || "Career recommendation",
          matchPercentage: topCareer.matchPercentage || 0,
          reason: topCareer.reason || "",
        } : null,

        skillGap: skillGap ? {
          career: skillGap.career || null,
          skillMatchPercentage: skillGap.skillMatchPercentage || 0,
          skillGapPercentage: skillGap.skillGapPercentage || 0,
          matchedSkills,
          missingSkills,
          progress: skillProgress,
        } : null,

        courses: {
          total: totalCourses,
          data: courseRecommendation?.courses || [],
        },

        roadmap: {
          career: roadmap?.career || null,
          totalSteps: totalRoadmapSteps,
          completedSteps: completedRoadmapSteps,
          progress: roadmapProgress,
          data: roadmapSteps,
        },

        // ======================================
        // JOB OPPORTUNITIES
        // ======================================
        jobs: {
          totalJobs: jobs.length,
          relevantJobs: relevantJobs.length,
          highMatch: highMatchJobs.length,
          mediumMatch: mediumMatchJobs.length,
          skillGapOpportunities: skillGapJobs.length,
          userSkills: assessment?.skills || [],
          data: topJobs,
        },
      },
    });

  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
};

module.exports = { getDashboard };


// const User = require("../Models/UserModel");

// const Assessment = require(
//   "../Models/AssessmentModel"
// );

// const CareerRecommendation = require(
//   "../Models/CareerModels"
// );

// const SkillGap = require(
//   "../Models/SkillGapModel"
// );

// const CourseRecommendation = require(
//   "../Models/CourseModel"
// );

// const CareerRoadmap = require(
//   "../Models/RoadMapModel"
// );

// const Job = require(
//   "../Models/JobModel"
// );


// const getDashboard = async (req, res) => {
//   try {
//     // ==========================================
//     // GET USER ID FROM JWT
//     // ==========================================

//     const userId =
//       req.user?._id ||
//       req.user?.userId ||
//       req.user?.id;

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "User authentication failed",
//       });
//     }


//     // ==========================================
//     // FETCH ALL USER DATA
//     // ==========================================

//     const [
//       user,
//       assessment,
//       careerRecommendation,
//       skillGap,
//       courseRecommendation,
//       roadmap,
//       jobs,
//     ] = await Promise.all([

//       User.findById(userId).select(
//         "name email profileImage createdAt"
//       ),

//       Assessment.findOne({ userId }).sort({
//         createdAt: -1,
//       }),

//       CareerRecommendation.findOne({
//         userId,
//       }).sort({
//         createdAt: -1,
//       }),

//       SkillGap.findOne({
//         userId,
//       }).sort({
//         createdAt: -1,
//       }),

//       CourseRecommendation.findOne({
//         userId,
//       }).sort({
//         createdAt: -1,
//       }),

//       CareerRoadmap.findOne({
//         userId,
//       }).sort({
//         createdAt: -1,
//       }),

//       // GET ALL JOBS
//       Job.find({}),
//     ]);


//     // ==========================================
//     // TOP CAREER
//     // ==========================================

//     const topCareer =
//       careerRecommendation?.recommendations?.[0] ||
//       null;


//     // ==========================================
//     // COURSE COUNT
//     // ==========================================

//     const totalCourses =
//       courseRecommendation?.courses?.length || 0;


//     // ==========================================
//     // ROADMAP PROGRESS
//     // ==========================================

//     const roadmapSteps =
//       roadmap?.roadmap || [];

//     const totalRoadmapSteps =
//       roadmapSteps.length;

//     const completedRoadmapSteps =
//       roadmapSteps.filter(
//         (step) =>
//           step.status?.toLowerCase() ===
//           "completed"
//       ).length;

//     const roadmapProgress =
//       totalRoadmapSteps > 0
//         ? Math.round(
//             (
//               completedRoadmapSteps /
//               totalRoadmapSteps
//             ) * 100
//           )
//         : 0;


//     // ==========================================
//     // SKILL GAP PROGRESS
//     // ==========================================

//     const matchedSkills =
//       skillGap?.matchedSkills || [];

//     const missingSkills =
//       skillGap?.missingSkills || [];

//     const totalSkillCount =
//       matchedSkills.length +
//       missingSkills.length;

//     const skillProgress =
//       totalSkillCount > 0
//         ? Math.round(
//             (
//               matchedSkills.length /
//               totalSkillCount
//             ) * 100
//           )
//         : 0;


//     // ==========================================
//     // JOB MATCHING SYSTEM
//     // ==========================================

//     /*
//       User current skills edukkrom

//       Example:

//       User Skills:
//       ["React", "JavaScript", "HTML"]

//       Job Skills:
//       ["React", "JavaScript", "Node.js"]

//       Matched:
//       ["React", "JavaScript"]

//       Missing:
//       ["Node.js"]

//       Match:
//       66%
//     */

//     const userSkills =
//       (assessment?.skills || [])
//         .filter(Boolean)
//         .map((skill) =>
//           skill
//             .toLowerCase()
//             .trim()
//         );


//     // ==========================================
//     // MATCH EVERY JOB
//     // ==========================================

//     const matchedJobs = jobs.map((job) => {

//       const requiredSkills =
//         job.requiredSkills || [];


//       // Normalized skills for comparison

//       const normalizedJobSkills =
//         requiredSkills
//           .filter(Boolean)
//           .map((skill) =>
//             skill
//               .toLowerCase()
//               .trim()
//           );


//       // ========================================
//       // MATCHED SKILLS
//       // ========================================

//       const acquiredSkills =
//         requiredSkills.filter((skill) =>
//           userSkills.includes(
//             skill
//               .toLowerCase()
//               .trim()
//           )
//         );


//       // ========================================
//       // MISSING SKILLS
//       // ========================================

//       const missingJobSkills =
//         requiredSkills.filter(
//           (skill) =>
//             !userSkills.includes(
//               skill
//                 .toLowerCase()
//                 .trim()
//             )
//         );


//       // ========================================
//       // MATCH PERCENTAGE
//       // ========================================

//       let matchPercentage = 0;

//       if (
//         normalizedJobSkills.length > 0
//       ) {
//         matchPercentage = Math.round(
//           (
//             acquiredSkills.length /
//             normalizedJobSkills.length
//           ) * 100
//         );
//       }


//       // ========================================
//       // CAREER MATCH
//       // ========================================

//       const userCareer =
//         topCareer?.career ||
//         skillGap?.career ||
//         assessment?.careerGoals ||
//         "";

//       const normalizedUserCareer =
//         userCareer
//           .toLowerCase()
//           .trim();

//       const normalizedJobCareer =
//         job.career
//           ?.toLowerCase()
//           .trim() || "";

//       let careerMatched = false;

//       if (
//         normalizedUserCareer &&
//         normalizedJobCareer
//       ) {
//         careerMatched =
//           normalizedUserCareer.includes(
//             normalizedJobCareer
//           ) ||
//           normalizedJobCareer.includes(
//             normalizedUserCareer
//           );
//       }


//       // ========================================
//       // RETURN JOB WITH MATCH DETAILS
//       // ========================================

//       return {
//         _id: job._id,

//         title: job.title,

//         company: job.company,

//         location: job.location,

//         career: job.career,

//         experienceLevel:
//           job.experienceLevel,

//         salaryRange:
//           job.salaryRange,

//         applyUrl:
//           job.applyUrl,

//         requiredSkills,

//         acquiredSkills,

//         missingSkills:
//           missingJobSkills,

//         matchPercentage,

//         careerMatched,
//       };
//     });


//     // ==========================================
//     // SORT BEST MATCH FIRST
//     // ==========================================

//     matchedJobs.sort((a, b) => {

//       // Career matched jobs first

//       if (
//         a.careerMatched &&
//         !b.careerMatched
//       ) {
//         return -1;
//       }

//       if (
//         !a.careerMatched &&
//         b.careerMatched
//       ) {
//         return 1;
//       }


//       // Then skill percentage

//       return (
//         b.matchPercentage -
//         a.matchPercentage
//       );
//     });


//     // ==========================================
//     // FILTER RELEVANT JOBS
//     // ==========================================

//     /*
//       1 or more skills match aana
//       relevant job-ah consider pannuvom
//     */

//     const relevantJobs =
//       matchedJobs.filter(
//         (job) =>
//           job.acquiredSkills.length > 0 ||
//           job.careerMatched
//       );


//     // ==========================================
//     // TOP 6 JOBS FOR DASHBOARD
//     // ==========================================

//     const topJobs =
//       relevantJobs.slice(0, 6);


//     // ==========================================
//     // JOB STATISTICS
//     // ==========================================

//     const highMatchJobs =
//       relevantJobs.filter(
//         (job) =>
//           job.matchPercentage >= 70
//       );

//     const mediumMatchJobs =
//       relevantJobs.filter(
//         (job) =>
//           job.matchPercentage >= 40 &&
//           job.matchPercentage < 70
//       );

//     const skillGapJobs =
//       relevantJobs.filter(
//         (job) =>
//           job.matchPercentage > 0 &&
//           job.matchPercentage < 40
//       );


//     // ==========================================
//     // FINAL RESPONSE
//     // ==========================================

//     return res.status(200).json({
//       success: true,

//       data: {

//         // ======================================
//         // USER
//         // ======================================

//         user: user
//           ? {
//               name:
//                 user.name || "User",

//               email:
//                 user.email || "",

//               profileImage:
//                 user.profileImage || null,

//               joinedAt:
//                 user.createdAt || null,
//             }
//           : null,


//         // ======================================
//         // ASSESSMENT
//         // ======================================

//         assessment: assessment
//           ? {
//               completed: true,

//               interests:
//                 assessment.interests || [],

//               skills:
//                 assessment.skills || [],

//               experienceLevel:
//                 assessment.experienceLevel ||
//                 "Not specified",
//             }
//           : {
//               completed: false,

//               interests: [],

//               skills: [],

//               experienceLevel:
//                 "Not specified",
//             },


//         // ======================================
//         // CAREER
//         // ======================================

//         career: topCareer
//           ? {
//               name:
//                 topCareer.career ||
//                 "Career recommendation",

//               matchPercentage:
//                 topCareer.matchPercentage || 0,

//               reason:
//                 topCareer.reason || "",
//             }
//           : null,


//         // ======================================
//         // SKILL GAP
//         // ======================================

//         skillGap: skillGap
//           ? {
//               career:
//                 skillGap.career || null,

//               skillMatchPercentage:
//                 skillGap.skillMatchPercentage || 0,

//               skillGapPercentage:
//                 skillGap.skillGapPercentage || 0,

//               matchedSkills,

//               missingSkills,

//               progress:
//                 skillProgress,
//             }
//           : null,


//         // ======================================
//         // COURSES
//         // ======================================

//         courses: {
//           total:
//             totalCourses,

//           data:
//             courseRecommendation?.courses || [],
//         },


//         // ======================================
//         // ROADMAP
//         // ======================================

//         roadmap: {

//           career:
//             roadmap?.career || null,

//           totalSteps:
//             totalRoadmapSteps,

//           completedSteps:
//             completedRoadmapSteps,

//           progress:
//             roadmapProgress,

//           data:
//             roadmapSteps,
//         },


//         // ======================================
//         // JOB OPPORTUNITIES ⭐ NEW
//         // ======================================

//         jobs: {

//           // Total jobs in database
//           totalJobs:
//             jobs.length,


//           // Jobs relevant to user
//           relevantJobs:
//             relevantJobs.length,


//           // High match jobs
//           highMatch:
//             highMatchJobs.length,


//           // Medium match jobs
//           mediumMatch:
//             mediumMatchJobs.length,


//           // Low match / skill development jobs
//           skillGapOpportunities:
//             skillGapJobs.length,


//           // Current user skills
//           userSkills:
//             assessment?.skills || [],


//           // Top jobs for dashboard
//           data:
//             topJobs,
//         },
//       },
//     });

//   } catch (error) {

//     console.error(
//       "DASHBOARD ERROR:",
//       error
//     );

//     return res.status(500).json({
//       success: false,

//       message:
//         "Failed to load dashboard",

//       error:
//         error.message,
//     });
//   }
// };


// module.exports = {
//   getDashboard,
// };

