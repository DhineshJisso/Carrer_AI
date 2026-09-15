const mongoose = require("mongoose");

const assessmentResultSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        course: {
            type: String,
            required: true,
        },

        skill: {
            type: String,
            required: true,
        },

        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        correctAnswers: {
            type: Number,
            default: 0,
        },

        totalQuestions: {
            type: Number,
            default: 0,
        },

        passed: {
            type: Boolean,
            default: false,
        },

        answers: [
            {
                questionId: mongoose.Schema.Types.ObjectId,
                selectedAnswer: String,
                correct: Boolean,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "AssessmentResult",
    assessmentResultSchema
);