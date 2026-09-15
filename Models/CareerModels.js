const mongoose = require("mongoose");

const careerRecommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assessmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },

    recommendations: [
      {
        career: {
          type: String,
          required: true,
        },

        category: {
          type: String,
          default: "Career",
        },

        description: {
          type: String,
          default: "",
        },

        matchPercentage: {
          type: Number,
          required: true,
        },

        reason: {
          type: String,
        },

        requiredSkills: {
          type: [String],
          default: [],
        },

        missingSkills: {
          type: [String],
          default: [],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CareerRecommendation",
  careerRecommendationSchema
);