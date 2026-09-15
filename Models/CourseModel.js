const mongoose = require("mongoose");

const courseRecommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    career: {
      type: String,
      required: true,
    },

    courses: [
      {
        title: {
          type: String,
          required: true,
        },

        platform: {
          type: String,
          required: true,
        },

        skill: {
          type: String,
          required: true,
        },

        level: {
          type: String,
          default: "Beginner",
        },

        duration: {
          type: String,
        },

        rating: {
          type: Number,
        },

        url: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CourseRecommendation",
  courseRecommendationSchema
);