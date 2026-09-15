const Progress = require("../Models/ProgressModel");

// ======================================================
// CREATE / UPDATE PROGRESS
// ======================================================

const updateProgress = async (req, res) => {
    try {

        const userId =
            req.user?._id ||
            req.user?.id ||
            req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User context missing",
            });
        }

        const {
            career,
            course,
            skill,
            overallProgress,
            completedModules,
            totalModules,
            skills,
            completedItems,
            learningHours,
        } = req.body;

        if (!career) {
            return res.status(400).json({
                success: false,
                message: "Career is required",
            });
        }

        let progress =
            await Progress.findOne({
                userId,
                career,
                course,
            });

        if (progress) {

            progress.overallProgress =
                overallProgress ??
                progress.overallProgress;

            progress.completedModules =
                completedModules ??
                progress.completedModules;

            progress.totalModules =
                totalModules ??
                progress.totalModules;

            progress.skills =
                skills ??
                progress.skills;

            progress.completedItems =
                completedItems ??
                progress.completedItems;

            progress.learningHours =
                learningHours ??
                progress.learningHours;

            progress.skill =
                skill ??
                progress.skill;

            progress.lastActivity =
                new Date();

            await progress.save();

        } else {

            progress =
                await Progress.create({

                    userId,

                    career,

                    course: course || "",

                    skill: skill || "",

                    overallProgress:
                        overallProgress ?? 0,

                    completedModules:
                        completedModules ?? 0,

                    totalModules:
                        totalModules ?? 0,

                    skills:
                        skills ?? [],

                    completedItems:
                        completedItems ?? [],

                    learningHours:
                        learningHours ?? 0,

                    lastActivity:
                        new Date(),
                });
        }

        return res.status(200).json({
            success: true,
            message:
                "Progress updated successfully",
            data: progress,
        });

    } catch (error) {

        console.error(
            "Progress Update Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to update progress",
            error: error.message,
        });
    }
};


// ======================================================
// GET ALL USER PROGRESS
// ======================================================

const getMyProgress = async (req, res) => {
    try {
        const progress = await Progress.find({
            userId: req.user.id,
        }).sort({
            updatedAt: -1,
        });

        return res.status(200).json({
            success: true,
            count: progress.length,
            data: progress,
        });

    } catch (error) {
        console.error("Get Progress Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch progress",
            error: error.message,
        });
    }
};


// ======================================================
// GET CAREER PROGRESS
// ======================================================

const getCareerProgress = async (req, res) => {
    try {
        const { career } = req.params;

        if (!career) {
            return res.status(400).json({
                success: false,
                message: "Career is required",
            });
        }

        const progress = await Progress.findOne({
            userId: req.user.id,
            career,
        });

        if (!progress) {
            return res.status(200).json({
                success: true,
                message: "No progress found",
                data: null,
            });
        }

        return res.status(200).json({
            success: true,
            data: progress,
        });

    } catch (error) {
        console.error("Get Career Progress Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch career progress",
            error: error.message,
        });
    }
};


// ======================================================
// DELETE CAREER PROGRESS
// ======================================================

const deleteProgress = async (req, res) => {
    try {
        const { career } = req.params;

        const progress = await Progress.findOneAndDelete({
            userId: req.user.id,
            career,
        });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: "Progress not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Progress deleted successfully",
        });

    } catch (error) {
        console.error("Delete Progress Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete progress",
            error: error.message,
        });
    }
};


module.exports = {
    updateProgress,
    getMyProgress,
    getCareerProgress,
    deleteProgress,
};